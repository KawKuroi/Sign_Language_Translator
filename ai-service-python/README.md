# Sign Language Translation — AI Service

Motor de inferencia ASL. Recibe una imagen de la mano, extrae 21 landmarks con MediaPipe y clasifica la seña con una red neuronal densa (97 % de accuracy). El runtime no requiere TensorFlow — usa `ai-edge-litert`, el intérprete TFLite oficial de Google (~50 MB vs ~1.5 GB de TF).

## Stack

| Librería | Rol |
|---|---|
| **FastAPI + Uvicorn** | Framework asíncrono y servidor ASGI |
| **MediaPipe** | Detección de 21 landmarks de la mano |
| **ai-edge-litert** | Runtime TFLite para inferencia (sin TensorFlow) |
| **OpenCV** | Decodificación de imágenes (provisto por MediaPipe) |
| **NumPy** | Normalización de landmarks |
| **Pydantic** | Validación del payload de entrada |

---

## Endpoint `POST /predict`

### Request

```json
{ "image": "data:image/jpeg;base64,/9j/4AAQ..." }
```

| Campo | Tipo | Descripción |
|---|---|---|
| `image` | `string` | Imagen en base64. Acepta data-URL (`data:image/jpeg;base64,...`) o base64 puro. |

### Respuesta — mano detectada

```json
{
  "hand_found": true,
  "letter": "A",
  "confidence": 0.97,
  "top": [
    { "letter": "A", "confidence": 0.97 },
    { "letter": "S", "confidence": 0.02 },
    { "letter": "E", "confidence": 0.01 }
  ]
}
```

### Respuesta — sin mano

```json
{ "hand_found": false, "letter": null, "confidence": 0.0, "top": [] }
```

### Errores

| Código | Causa |
|---|---|
| `400` | Payload base64 inválido o imagen corrupta |
| `422` | Falta el campo `image` en el body |

### Letras soportadas

```
A B C D E F G H I K L M N O P Q R S T U V W X Y
```

> J y Z están excluidas porque requieren movimiento (señas dinámicas, no estáticas).

Documentación interactiva: **http://localhost:8000/docs**

---

## Desarrollo Local

Requiere Python 3.10+.

```bash
cd ai-service-python
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload     # http://localhost:8000
```

El archivo `hand_landmarker.task` ya está incluido en `app/model/`. Si no existe, se descarga automáticamente de Google CDN en el primer arranque.

---

## Tests

Instala las dependencias de test (solo necesario en desarrollo local):

```bash
pip install pytest pytest-asyncio httpx
pytest tests/ -v
```

| Test | Qué verifica |
|---|---|
| `test_predict_no_hand` | Frame blanco → `hand_found: false` |
| `test_predict_invalid_base64` | Base64 malformado → HTTP 400 |
| `test_predict_missing_image_field` | Body sin campo `image` → HTTP 422 |
| `test_predict_response_schema` | Respuesta tiene todos los campos con tipos correctos |
| `test_predict_raw_base64_accepted` | Base64 puro (sin prefijo `data:...`) aceptado |

Los tests usan `ASGITransport` de httpx — no levantan servidor, cargan el modelo real en memoria una vez por sesión (`scope="session"`).

---

## Dockerización

El `Dockerfile` usa un build **multi-stage**:

1. **Stage `converter`** (`python:3.10-slim` + TensorFlow): convierte `asl_model.keras` → `asl_model.tflite`.
2. **Stage runtime** (`python:3.10-slim` sin TensorFlow): instala `ai-edge-litert` + MediaPipe y copia el `.tflite` del stage anterior.

TensorFlow solo existe durante el build y no llega a la imagen final, reduciendo el tamaño ~1.5 GB.

```bash
docker build -t signlang-ai .
docker run -p 8000:8000 signlang-ai
```

> Se usa `--workers 1` porque el intérprete TFLite se guarda como singleton de módulo y no es fork-safe. Para escalar horizontalmente, usa réplicas de contenedor.
