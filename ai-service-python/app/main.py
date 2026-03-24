from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Sign Language Translation AI Service")

# Configuración de CORS para permitir solicitudes del Frontend y Backend en local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Modificar si se quiere restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    # Este esquema se adaptará luego a la información recibida (landmarks, imágenes, etc.)
    data: dict | str | None = None

@app.post("/predict")
async def predict(request: PredictRequest):
    logger.info("Received prediction request")
    # Devuelve un texto estático por ahora
    return {"prediction": "Hola Mock desde AI Service"}
