import json
import logging
from pathlib import Path

import cv2
import mediapipe as mp
import numpy as np
from ai_edge_litert.interpreter import Interpreter
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision as mp_vision

logger = logging.getLogger(__name__)

_MODEL_DIR = Path(__file__).parent
_TFLITE_PATH = _MODEL_DIR / "asl_model.tflite"
_META_PATH = _MODEL_DIR / "asl_metadata.json"
_TASK_PATH = _MODEL_DIR / "hand_landmarker.task"

_TASK_URL = (
    "https://storage.googleapis.com/mediapipe-models/"
    "hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task"
)

_interpreter = None
_labels: list[str] = []
_detector = None
_input_index: int = 0
_output_index: int = 0


def _ensure_task_file() -> None:
    if _TASK_PATH.exists():
        return
    import urllib.request
    logger.info("hand_landmarker.task not found — downloading from Google CDN...")
    _TASK_PATH.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(_TASK_URL, _TASK_PATH)
    logger.info("hand_landmarker.task downloaded.")


def load_resources() -> None:
    global _interpreter, _labels, _detector, _input_index, _output_index

    _ensure_task_file()

    logger.info("Loading TFLite model...")
    interp = Interpreter(model_path=str(_TFLITE_PATH))
    interp.allocate_tensors()
    _input_index = interp.get_input_details()[0]["index"]
    _output_index = interp.get_output_details()[0]["index"]
    _interpreter = interp
    logger.info("TFLite model loaded.")

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

    _interpreter.set_tensor(_input_index, lm.reshape(1, -1))
    _interpreter.invoke()
    probs = _interpreter.get_tensor(_output_index)[0]

    idx = int(np.argmax(probs))
    top_idx = np.argsort(probs)[::-1][:top_n]

    return {
        "hand_found": True,
        "letter": _labels[idx],
        "confidence": float(probs[idx]),
        "top": [{"letter": _labels[i], "confidence": float(probs[i])} for i in top_idx],
    }
