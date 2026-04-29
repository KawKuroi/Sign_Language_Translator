# Sistema de Traducción de Lenguaje de Señas en Tiempo Real

Traductor de Lenguaje de Señas ASL en tiempo real mediante webcam. El frontend captura frames, los envía al backend Spring Boot, y el servicio de IA extrae landmarks con MediaPipe y clasifica la seña con una red neuronal densa (97 % de accuracy en el set de validación).

## Arquitectura

```
Browser (webcam)
  └─ POST /translate ──► Spring Boot :8080
                              └─ HTTP ──► FastAPI AI Service :8000
                                              ├─ MediaPipe → 21 landmarks (63 floats)
                                              ├─ Normalización relativa a la muñeca
                                              └─ Red densa (256→128→64→24) → letra ASL
```

| Servicio | Carpeta | Puerto |
|---|---|---|
| Frontend (React + Vite → nginx) | `frontend-react/` | 80 |
| Backend (Spring Boot) | `backend-springboot/` | 8080 |
| AI Service (FastAPI) | `ai-service-python/` | 8000 |

---

## Inicio Rápido con Docker

### Requisitos
- [Docker Desktop](https://docs.docker.com/get-docker/) con Docker Compose incluido.

### Levantar el stack completo

```bash
git clone https://github.com/KawKuroi/Sign_Language_Translator.git
cd Sign_Language_Translator
docker compose up --build
```

> El flag `--build` fuerza la compilación de imágenes. En builds posteriores sin cambios puedes omitirlo.

Una vez arriba:

| Servicio | URL |
|---|---|
| Frontend (UI) | http://localhost |
| Backend API | http://localhost:8080 |
| AI Service + Swagger | http://localhost:8000/docs |

```bash
docker compose down   # detiene y elimina los contenedores
```

---

## Endpoints

### Backend `POST /translate` (público)

```json
// Body
{ "image": "data:image/jpeg;base64,..." }

// Respuesta 200
{ "handFound": true, "letter": "A", "confidence": 0.97, "top": [...] }
```

### Backend — Autenticación (pública)

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/auth/register` | Registro. Body: `{ "email", "password" }`. Devuelve `{ "token", "email" }` |
| `POST` | `/auth/login` | Login con los mismos campos. Devuelve JWT. |

### Backend — Historial (requiere `Authorization: Bearer <token>`)

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/history` | Guarda texto de la sesión. Body: `{ "text": "HELLO WORLD" }` |
| `GET` | `/history` | Historial del usuario (más reciente primero) |

### AI Service `POST /predict`

```json
// Body
{ "image": "data:image/jpeg;base64,..." }   // también acepta base64 puro sin prefijo

// Con mano detectada
{ "hand_found": true, "letter": "A", "confidence": 0.97, "top": [...] }

// Sin mano
{ "hand_found": false, "letter": null, "confidence": 0.0, "top": [] }
```

Letras soportadas: **A–Y** (J y Z excluidas por requerir movimiento).

---

## Tecnologías

| Capa | Stack |
|---|---|
| Frontend | React 18, TypeScript, Vite, react-webcam, nginx:alpine |
| Backend | Java 17, Spring Boot 3.1, Spring Security 6, JWT (jjwt), H2, Maven |
| AI Service | Python 3.10, FastAPI, MediaPipe, ai-edge-litert (TFLite runtime), OpenCV, NumPy |
| Infraestructura | Docker, Docker Compose |

### Tamaños de imágenes Docker (aproximados)

| Imagen | Tamaño |
|---|---|
| Frontend | ~25 MB |
| Backend | ~300 MB |
| AI Service | ~1.5–2 GB |

---

## Estado del Proyecto

✅ **Frontend** — Implementación completa del design system Signa con React 18 + Tailwind CSS 3. Incluye rutas (Landing, Traductor, Historial, About, Auth), flujo de cámara en tiempo real, historial persistente con JWT, responsive desktop+mobile, y 50/50 tests pasando (vitest + Testing Library + MSW).

✅ **Backend** — Spring Boot 3.1 con autenticación JWT, endpoints `/auth/**`, `/translate`, `/history`, H2 embebida. 25/25 tests pasando.

✅ **AI Service** — FastAPI + MediaPipe + TFLite. Extracción de 21 landmarks, red neuronal densa (97% accuracy en validación), 5 tests cubriendo inferencia y errores.

---

## Entrenamiento del Modelo

El modelo fue entrenado en Google Colab. El notebook contiene el flujo completo: extracción de landmarks con MediaPipe y entrenamiento de la red densa.

**[Ver Notebook en Google Colab](https://colab.research.google.com/drive/1qajMkPVaFqv2pbhziVAZPs_v8tdftteS)**

El modelo se distribuye como `asl_model.keras` en el repo. Durante el build de Docker se convierte automáticamente a formato TFLite (`asl_model.tflite`) para no requerir TensorFlow en la imagen de producción.

---

## Desarrollo Local por Servicio

Cada carpeta tiene su propio README con instrucciones detalladas:

- [`frontend-react/README.md`](frontend-react/README.md)
- [`backend-springboot/README.md`](backend-springboot/README.md)
- [`ai-service-python/README.md`](ai-service-python/README.md)
