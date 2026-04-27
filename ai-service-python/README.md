# Sign Language Translation - AI Microservice

Motor de inferencia del sistema. Recibe una imagen de la mano desde el backend, extrae los 21 landmarks con MediaPipe y clasifica la seña ASL con una red neuronal densa entrenada (97.16% de accuracy).

## Stack Tecnológico
- **Python 3.10+**
- **FastAPI & Uvicorn** — framework asíncrono y servidor ASGI.
- **MediaPipe** — detección de landmarks de la mano (21 puntos).
- **TensorFlow / Keras** — modelo de clasificación ASL.
- **OpenCV** — decodificación de imágenes.
- **Pydantic** — validación estricta del payload de entrada.

---

## Endpoint: `POST /predict`

### Request

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQ..."
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `image` | `string` | Imagen codificada en base64. Acepta data-URL (`data:image/jpeg;base64,...`) o base64 puro. Cualquier resolución es válida; MediaPipe normaliza internamente. |

### Response — mano detectada

```json
{
  "hand_found": true,
  "letter": "A",
  "confidence": 0.97,
  "top": [
    {"letter": "A", "confidence": 0.97},
    {"letter": "S", "confidence": 0.02},
    {"letter": "E", "confidence": 0.01}
  ]
}
```

### Response — sin mano en la imagen

```json
{
  "hand_found": false,
  "letter": null,
  "confidence": 0.0,
  "top": []
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `hand_found` | `bool` | `true` si MediaPipe detectó una mano. |
| `letter` | `string \| null` | Letra ASL predicha, o `null` si no se detectó mano. |
| `confidence` | `float` | Probabilidad de la predicción principal (0.0 – 1.0). |
| `top` | `array` | Las 3 predicciones más probables con sus confianzas. |

### Errores

| Código | Causa |
|--------|-------|
| `400` | Payload base64 inválido o imagen corrupta. |
| `422` | Falta el campo `image` en el body. |

### Letras soportadas

```
A B C D E F G H I K L M N O P Q R S T U V W X Y
```

> J y Z están excluidas porque requieren movimiento de mano (no son señas estáticas).

---

## Desarrollo Local

1. Crear y activar un entorno virtual:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```
2. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. Levantar el servidor (el archivo `hand_landmarker.task` se descarga automáticamente en el primer arranque si no existe):
   ```bash
   uvicorn app.main:app --reload
   ```

Documentación interactiva disponible en:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

## Tests

```bash
cd ai-service-python
pytest tests/ -v
```

Los tests cubren:
- Imagen sin mano → `hand_found: false`
- Base64 malformado → HTTP 400
- Body sin campo `image` → HTTP 422
- Esquema completo de la respuesta
- Base64 puro (sin prefijo `data:...`) aceptado correctamente

> Los tests cargan el modelo real una sola vez por sesión gracias al fixture `scope="session"`. El primer run puede tardar ~10 s en cargar TensorFlow y MediaPipe.

---

## Dockerización

El `Dockerfile` descarga `hand_landmarker.task` en tiempo de build, por lo que no se necesita conexión a Internet en runtime.

```bash
docker build -t signlang-ai .
docker run -p 8000:8000 signlang-ai
```
