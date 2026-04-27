import io
import json
import logging
import tempfile
import zipfile
from pathlib import Path

import cv2
import mediapipe as mp
import numpy as np
import tensorflow as tf
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision as mp_vision

logger = logging.getLogger(__name__)

_MODEL_DIR = Path(__file__).parent
_KERAS_PATH = _MODEL_DIR / "asl_model.keras"
_META_PATH = _MODEL_DIR / "asl_metadata.json"
_TASK_PATH = _MODEL_DIR / "hand_landmarker.task"

_TASK_URL = (
    "https://storage.googleapis.com/mediapipe-models/"
    "hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task"
)

# Module-level singletons — loaded once at startup, reused across all requests.
_model = None
_labels: list[str] = []
_detector = None


def _ensure_task_file() -> None:
    if _TASK_PATH.exists():
        return
    import urllib.request
    logger.info("hand_landmarker.task not found — downloading from Google CDN...")
    _TASK_PATH.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(_TASK_URL, _TASK_PATH)
    logger.info("hand_landmarker.task downloaded.")


def _strip_quantization_config(obj) -> None:
    """Recursively remove quantization_config keys added by Keras 3.1+."""
    if isinstance(obj, dict):
        obj.pop("quantization_config", None)
        for v in obj.values():
            _strip_quantization_config(v)
    elif isinstance(obj, list):
        for item in obj:
            _strip_quantization_config(item)


def _load_model_compat(keras_path: Path):
    """Load a .keras model, patching out quantization_config for Keras < 3.1 compat.

    The .keras format is a ZIP. We rewrite config.json in memory, write to a
    temp file (load_model requires a path), load it, then delete the temp file.
    """
    buf = io.BytesIO()
    with zipfile.ZipFile(str(keras_path), "r") as src:
        with zipfile.ZipFile(buf, "w") as dst:
            for info in src.infolist():
                data = src.read(info.filename)
                if info.filename == "config.json":
                    cfg = json.loads(data)
                    _strip_quantization_config(cfg)
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


def load_resources() -> None:
    global _model, _labels, _detector

    _ensure_task_file()

    logger.info("Loading Keras model...")
    try:
        _model = tf.keras.models.load_model(str(_KERAS_PATH))
    except (TypeError, ValueError):
        logger.info("Applying quantization_config compatibility patch...")
        _model = _load_model_compat(_KERAS_PATH)
    logger.info("Keras model loaded.")

    meta = json.loads(_META_PATH.read_text())
    _labels = meta["labels"]

    base_options = mp_python.BaseOptions(model_asset_path=str(_TASK_PATH))
    options = mp_vision.HandLandmarkerOptions(
        base_options=base_options,
        num_hands=1,
        min_hand_detection_confidence=0.3,
        min_hand_presence_confidence=0.3,
        min_tracking_confidence=0.3,
    )
    _detector = mp_vision.HandLandmarker.create_from_options(options)
    logger.info("MediaPipe HandLandmarker ready.")


def _extract_landmarks(image_bgr: np.ndarray) -> np.ndarray | None:
    rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
    result = _detector.detect(mp_image)
    if not result.hand_landmarks:
        return None
    pts = result.hand_landmarks[0]
    coords = np.array([[p.x, p.y, p.z] for p in pts], dtype="float32")
    coords -= coords[0]
    coords /= np.max(np.abs(coords)) + 1e-8
    return coords.flatten()


def predict(image_bgr: np.ndarray, top_n: int = 3) -> dict:
    lm = _extract_landmarks(image_bgr)
    if lm is None:
        return {"hand_found": False, "letter": None, "confidence": 0.0, "top": []}

    probs = _model.predict(lm.reshape(1, -1), verbose=0)[0]
    idx = int(np.argmax(probs))
    top_idx = np.argsort(probs)[::-1][:top_n]

    return {
        "hand_found": True,
        "letter": _labels[idx],
        "confidence": float(probs[idx]),
        "top": [{"letter": _labels[i], "confidence": float(probs[i])} for i in top_idx],
    }
