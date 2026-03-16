from fastapi import APIRouter

router = APIRouter()

@router.post("/predict")
async def predict_sign_language(data: dict):
    # TODO: Pass data through model and mediapipe
    return {"prediction": "Hello World", "confidence": 0.95}
