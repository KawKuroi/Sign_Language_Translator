#!/usr/bin/env python3
"""
Convierte asl_model.keras -> asl_model.tflite.
Ejecutar una sola vez localmente: python scripts/convert_to_tflite.py
Requiere tensorflow instalado (pip install tensorflow).
El archivo .tflite resultante debe commitearse al repo.
"""
import io
import json
import tempfile
import zipfile
from pathlib import Path

import tensorflow as tf

MODEL_DIR = Path(__file__).parent.parent / "ai-service-python" / "app" / "model"


def strip_quantization_config(obj) -> None:
    if isinstance(obj, dict):
        obj.pop("quantization_config", None)
        for v in obj.values():
            strip_quantization_config(v)
    elif isinstance(obj, list):
        for item in obj:
            strip_quantization_config(item)


def load_keras_compat(keras_path: Path):
    buf = io.BytesIO()
    with zipfile.ZipFile(str(keras_path), "r") as src:
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


if __name__ == "__main__":
    keras_path = MODEL_DIR / "asl_model.keras"
    tflite_path = MODEL_DIR / "asl_model.tflite"

    print(f"Cargando {keras_path}...")
    try:
        model = tf.keras.models.load_model(str(keras_path))
    except (TypeError, ValueError):
        print("Aplicando parche de compatibilidad quantization_config...")
        model = load_keras_compat(keras_path)

    print("Convirtiendo a TFLite...")
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    tflite_model = converter.convert()

    tflite_path.write_bytes(tflite_model)
    print(f"Guardado: {tflite_path} ({len(tflite_model) / 1024:.1f} KB)")
    print("Ahora commitea ai-service-python/app/model/asl_model.tflite al repo.")
