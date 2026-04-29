from base64 import b64decode

import cv2
import numpy as np
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.model import inference

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok"}


class PredictRequest(BaseModel):
    image: str  # base64 data URL ("data:image/jpeg;base64,...") or raw base64 string


class TopPrediction(BaseModel):
    letter: str
    confidence: float


class PredictResponse(BaseModel):
    hand_found: bool
    letter: str | None
    confidence: float
    top: list[TopPrediction]


@router.post("/predict", response_model=PredictResponse)
async def predict(body: PredictRequest):
    raw_b64 = body.image
    if "," in raw_b64:
        raw_b64 = raw_b64.split(",", 1)[1]

    try:
        img_bytes = b64decode(raw_b64)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid base64 payload.")

    arr = np.frombuffer(img_bytes, dtype=np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="Could not decode image from base64 payload.")

    return inference.predict(image_bgr=img)
