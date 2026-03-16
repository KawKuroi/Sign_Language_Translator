# Sign Language Translation - AI Microservice

Este es el motor de inferencia e Inteligencia Artificial del sistema, desarrollado en Python sobre FastAPI, expuesto de forma independiente como un microservicio.

## Propósito
- **Procesamiento Facial, Manos y Postura:** Uso de MediaPipe para extraer landmarks en frames de video.
- **Inferencia de Redes Neuronales:** Uso de TensorFlow / PyTorch para interpretar las secuencias temporales en texto traducido.

## Stack Tecnológico
- **Python 3.10+**
- **FastAPI & Uvicorn:** Exposición de endpoins ultra-veloces para procesar requests.
- **MediaPipe:** Computación visual y tracking.
- **TensorFlow:** Core del modelo neuronal previamente entrenado.

## Instalación

1. Crear un entorno virtual (recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Linux/Mac
   venv\Scripts\activate     # En Windows
   ```
2. Instalar requerimientos:
   ```bash
   pip install -r requirements.txt
   ```
3. Correr servicio:
   ```bash
   uvicorn app.main:app --reload
   ```

## Dockerización
Listones para ser desplegado en Google Cloud Run u otros servicios CaaS:
```bash
docker build -t signlang-ai .
docker run -p 8000:8000 signlang-ai
```
