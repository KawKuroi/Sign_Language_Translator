from fastapi import FastAPI
from app.api.routes import router as api_router

app = FastAPI(title="Sign Language AI Service", version="1.0.0")

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "AI Service running"}
