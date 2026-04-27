# ASL Sign Language Model — Contexto para el Backend

## ¿Qué hace este modelo?

Clasifica imágenes de manos haciendo señas del alfabeto ASL (American Sign Language)
y devuelve la letra correspondiente (A–Y, excluyendo J y Z).

---

## Pipeline de inferencia

```
Imagen (cualquier resolución) → MediaPipe Hands → 21 landmarks (x,y,z) → Normalización → Dense NN → Letra
```

El modelo **no clasifica píxeles**. Primero extrae 21 puntos clave de la mano
con MediaPipe, los normaliza, y esa representación de 63 valores es la que
entra al modelo. Esto lo hace robusto a cambios de iluminación, fondo y tamaño de mano.

---

## Archivos exportados (`asl_export.zip`)

| Archivo | Descripción |
|---|---|
| `asl_model.keras` | Modelo entrenado en formato Keras nativo |
| `asl_metadata.json` | Labels, número de clases y parámetros de normalización |

### Contenido de `asl_metadata.json`
```json
{
  "labels": ["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y"],
  "num_classes": 24,
  "n_features": 63,
  "n_landmarks": 21,
  "normalization": "wrist_relative_max_scale"
}
```

---

## Cómo hacer inferencia

### Dependencias
```
mediapipe
opencv-python
tensorflow
numpy
```

### Código de inferencia

```python
import cv2
import numpy as np
import json
import mediapipe as mp
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision as mp_vision
import tensorflow as tf

# --- Cargar modelo y metadatos ---
model    = tf.keras.models.load_model('asl_model.keras')
metadata = json.load(open('asl_metadata.json'))
LABELS   = metadata['labels']  # 24 letras

# --- Configurar MediaPipe ---
base_options   = mp_python.BaseOptions(model_asset_path='hand_landmarker.task')
options        = mp_vision.HandLandmarkerOptions(
    base_options=base_options,
    num_hands=1,
    min_hand_detection_confidence=0.3,
    min_hand_presence_confidence=0.3,
    min_tracking_confidence=0.3
)
hands_detector = mp_vision.HandLandmarker.create_from_options(options)

# --- Extracción de landmarks (misma normalización que en entrenamiento) ---
def extraer_landmarks(imagen_bgr):
    rgb       = cv2.cvtColor(imagen_bgr, cv2.COLOR_BGR2RGB)
    mp_image  = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
    resultado = hands_detector.detect(mp_image)
    if not resultado.hand_landmarks:
        return None
    pts    = resultado.hand_landmarks[0]
    coords = np.array([[p.x, p.y, p.z] for p in pts], dtype='float32')
    coords -= coords[0]                          # relativo a la muñeca
    coords /= (np.max(np.abs(coords)) + 1e-8)   # escala [-1, 1]
    return coords.flatten()                      # (63,)

# --- Predicción ---
def predecir(imagen_bgr, top_n=3):
    lm = extraer_landmarks(imagen_bgr)
    if lm is None:
        return {'hand_found': False, 'letter': None, 'confidence': 0.0, 'top': []}

    probs   = model.predict(lm.reshape(1, -1), verbose=0)[0]
    idx     = int(np.argmax(probs))
    top_idx = np.argsort(probs)[::-1][:top_n]

    return {
        'hand_found' : True,
        'letter'     : LABELS[idx],
        'confidence' : float(probs[idx]),
        'top'        : [{'letter': LABELS[i], 'confidence': float(probs[i])} for i in top_idx]
    }
```

### Formatos de entrada soportados

```python
# Desde ruta de archivo
img = cv2.imread('seña.jpg')
resultado = predecir(img)

# Desde bytes (request de API)
arr = np.frombuffer(img_bytes, dtype=np.uint8)
img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
resultado = predecir(img)

# Desde base64 (frontend web)
from base64 import b64decode
raw = b64decode(b64_string.split(',')[-1])
arr = np.frombuffer(raw, dtype=np.uint8)
img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
resultado = predecir(img)
```

### Formato de respuesta

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

Si MediaPipe no detecta mano en la imagen:
```json
{
  "hand_found": false,
  "letter": null,
  "confidence": 0.0,
  "top": []
}
```

---

## Detalles del entrenamiento

| Parámetro | Valor |
|---|---|
| Dataset | ASL Alphabet (Kaggle: `grassknoted/asl-alphabet`) |
| Imágenes | Fotos reales de manos, 200×200px |
| Muestras por clase | Hasta 2.000 |
| Split | 85% train / 15% test (estratificado) |
| Arquitectura | Dense NN (256 → 128 → 64 → 24) |
| Regularización | L2 (1e-3) + Dropout (0.5 / 0.4 / 0.3) |
| Optimizador | Adam lr=1e-3 con ReduceLROnPlateau |
| Entrada del modelo | 63 valores float32 (landmarks normalizados) |
| Salida | Softmax sobre 24 clases |

### Clases soportadas
```
A B C D E F G H I K L M N O P Q R S T U V W X Y
```
> J y Z están excluidas porque requieren movimiento de mano, no son señas estáticas.

---

## Consideraciones para el backend

- **MediaPipe necesita el archivo `hand_landmarker.task`** junto al modelo.
  Se descarga de:
  `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task`

- **Inicializar el detector una sola vez** al arrancar el servidor, no por request.
  La instanciación de MediaPipe es costosa (~1s), la inferencia es rápida (~20ms).

- **La imagen puede llegar en cualquier resolución**, no hace falta redimensionar.
  MediaPipe normaliza internamente las coordenadas a [0,1].

- **No hay estado entre requests**: cada llamada es independiente.
