# Sign Language Translation - AI Microservice

Este es el motor de inferencia e Inteligencia Artificial del sistema. Desarrollado en Python sobre FastAPI, está diseñado para procesar los *landmarks* y coordenadas corporales/manuales (usualmente extraídos con MediaPipe) y predecir la seña ejecutada usando redes neuronales.

## Stack Tecnológico
- **Python 3.10+**
- **FastAPI & Uvicorn:** Framework asíncrono y servidor ASGI para respuestas veloces.
- **Pydantic:** Validación estricta de datos de entrada corporales.
- *(Preparado para integraciones con TensorFlow, PyTorch y MediaPipe)*.

## Endpoints y Documentación Autogenerada
- **`POST /predict`**: Endpoint principal de inferencia. Recibe un payload JSON y retorna la cadena de texto con la predicción inferida.

FastAPI genera documentación automática interactiva de la API. Al correr el servidor localmente, puedes acceder a:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

## Desarrollo Local (Independiente)
1. Crear un entorno virtual (altamente recomendado):
   ```bash
   python -m venv venv
   ```
2. Activar el entorno virtual:
   - **Windows**: `venv\Scripts\activate`
   - **Linux/Mac**: `source venv/bin/activate`
3. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Levantar servidor con autorecarga (Hot-reload para desarrollo):
   ```bash
   uvicorn app.main:app --reload
   ```

## Dockerización
Para construir el entorno inmutable de Inteligencia artificial:
```bash
docker build -t signlang-ai .
docker run -p 8000:8000 signlang-ai
```
