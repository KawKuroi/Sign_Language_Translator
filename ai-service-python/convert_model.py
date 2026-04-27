#!/usr/bin/env python3
"""Docker build step: converts asl_model.keras -> asl_model.tflite in the current directory."""
import io
import json
import tempfile
import zipfile
from pathlib import Path

import tensorflow as tf

keras_path = Path("asl_model.keras")
tflite_path = Path("asl_model.tflite")


def strip_quantization_config(obj) -> None:
    if isinstance(obj, dict):
        obj.pop("quantization_config", None)
        for v in obj.values():
            strip_quantization_config(v)
    elif isinstance(obj, list):
        for item in obj:
            strip_quantization_config(item)


def load_keras_compat(path: Path):
    buf = io.BytesIO()
    with zipfile.ZipFile(str(path), "r") as src:
        with zipfile.ZipFile(buf, "w") as dst:
            for info in src.infolist():
                data = src.read(info.filename)
                if info.filename == "config.json":
                    cfg = json.loads(data)
                    strip_quantization_config(cfg)
                    data = json.dumps(cfg).encode()
                dst.writestr(info, data)
    buf.seek(0)
    with tempfile.NamedTemporaryFile(suffix=".keras", delete=False) as tmp:
        tmp.write(buf.read())
        tmp_path = Path(tmp.name)
    try:
        return tf.keras.models.load_model(str(tmp_path))
    finally:
        tmp_path.unlink(missing_ok=True)


try:
    model = tf.keras.models.load_model(str(keras_path))
except (TypeError, ValueError):
    print("Applying quantization_config compat patch...")
    model = load_keras_compat(keras_path)

converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
tflite_path.write_bytes(tflite_model)
print(f"Converted: {tflite_path} ({len(tflite_model) / 1024:.1f} KB)")
