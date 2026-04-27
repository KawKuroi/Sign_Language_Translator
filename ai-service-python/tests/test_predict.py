"""
Tests for POST /predict

Run with:
    cd ai-service-python
    pytest tests/ -v
"""
import base64
from io import BytesIO

import cv2
import numpy as np
import pytest

# 24 ASL classes supported by the model
ASL_LABELS = set("ABCDEFGHIKLMNOPQRSTUVWXY")

# ── helpers ──────────────────────────────────────────────────────────────────

def _encode_image(img_bgr: np.ndarray) -> str:
    """Encode a BGR numpy array to a base64 data-URL (JPEG)."""
    ok, buf = cv2.imencode(".jpg", img_bgr)
    assert ok, "cv2.imencode failed"
    b64 = base64.b64encode(buf.tobytes()).decode()
    return f"data:image/jpeg;base64,{b64}"


def _blank_frame(width: int = 200, height: int = 200) -> np.ndarray:
    """Solid white image — no hand present."""
    return np.ones((height, width, 3), dtype=np.uint8) * 255


# ── tests ─────────────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_predict_no_hand(client):
    """A blank white frame must return hand_found=False."""
    payload = {"image": _encode_image(_blank_frame())}
    response = await client.post("/predict", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["hand_found"] is False
    assert data["letter"] is None
    assert data["confidence"] == 0.0
    assert data["top"] == []


@pytest.mark.asyncio
async def test_predict_invalid_base64(client):
    """A malformed base64 string must return 400."""
    payload = {"image": "not-valid-base64!!!"}
    response = await client.post("/predict", json=payload)

    assert response.status_code == 400


@pytest.mark.asyncio
async def test_predict_missing_image_field(client):
    """A request body without the 'image' field must return 422 (Pydantic validation)."""
    response = await client.post("/predict", json={"wrong_field": "value"})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_predict_response_schema(client):
    """Any valid image must return a response with the expected keys and types."""
    payload = {"image": _encode_image(_blank_frame())}
    response = await client.post("/predict", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert "hand_found" in data
    assert "letter" in data
    assert "confidence" in data
    assert "top" in data
    assert isinstance(data["hand_found"], bool)
    assert isinstance(data["confidence"], float)
    assert isinstance(data["top"], list)


@pytest.mark.asyncio
async def test_predict_raw_base64_accepted(client):
    """Endpoint must accept raw base64 without the 'data:...' prefix."""
    img = _blank_frame()
    ok, buf = cv2.imencode(".jpg", img)
    raw_b64 = base64.b64encode(buf.tobytes()).decode()

    payload = {"image": raw_b64}
    response = await client.post("/predict", json=payload)
    assert response.status_code == 200
