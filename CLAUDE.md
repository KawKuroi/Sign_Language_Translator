# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A three-tier microservices app for real-time ASL (American Sign Language) alphabet translation using a webcam. The pipeline captures frames in the browser, sends them through a Spring Boot gateway, runs MediaPipe hand landmark extraction + TensorFlow classification in a Python AI service, and returns the predicted ASL letter (A–Y; J and Z are excluded because they require motion).

**Current state**: MVP scaffold — the AI model and UI are in place, but the backend still returns a hardcoded mock string and the actual image/landmark data pipeline is not yet wired up.

---

## Running the Stack

### All services (Docker — recommended)
```bash
docker-compose up --build   # builds and starts frontend :3000, backend :8080, AI service :8000
docker-compose down
```

### Frontend (React + Vite)
```bash
cd frontend-react
npm install
npm run dev        # dev server on :3000
npm run build      # production build
```

### Backend (Spring Boot + Maven)
```bash
cd backend-springboot
./mvnw spring-boot:run     # dev server on :8080
./mvnw clean package       # build JAR
```

### AI Service (Python + FastAPI)
```bash
cd ai-service-python
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload   # dev server on :8000; Swagger at /docs
```

---

## Architecture

```
Browser (webcam)
  └─ POST /translate ──► Spring Boot (port 8080)
                              └─ HTTP ──► FastAPI AI Service (port 8000)
                                              ├─ MediaPipe → 21 hand landmarks (63 floats)
                                              ├─ Normalize relative to wrist, scale to [-1, 1]
                                              └─ Dense NN (256→128→64→24) → ASL letter + confidence
```

- **Frontend** ([frontend-react/src/App.tsx](frontend-react/src/App.tsx)): polls backend every 2 000 ms, renders the webcam stream via `react-webcam`, and displays results in `TranslationBox`.
- **Backend** ([backend-springboot/src/main/java/com/tuempresa/signlang/controller/TranslationController.java](backend-springboot/src/main/java/com/tuempresa/signlang/controller/TranslationController.java)): single `POST /translate` endpoint; currently returns `"Hola Mock"` — needs to forward image/landmark data to the AI service.
- **AI Service** ([ai-service-python/app/routes.py](ai-service-python/app/routes.py)): `POST /predict` receives landmark data, runs the Keras model, and returns predicted letter + confidence. Model file: [ai-service-python/app/model/asl_model.keras](ai-service-python/app/model/asl_model.keras); labels and normalization params: [ai-service-python/app/model/asl_metadata.json](ai-service-python/app/model/asl_metadata.json).

### Environment variables
| Variable | Used by | Default |
|---|---|---|
| `AI_SERVICE_URL` | Backend | `http://localhost:8000` |
| `REACT_APP_API_URL` | Frontend | `http://localhost:8080` |

---

## Key Gaps to Complete

1. **Backend → AI Service integration**: `TranslationController` must forward image bytes (or pre-extracted landmarks) to `AI_SERVICE_URL/predict` instead of returning the mock string.
2. **Frontend payload**: `App.tsx` must capture a frame from the webcam and include it in the `POST /translate` body.
3. **Firebase auth**: SDK is installed on both frontend and backend but not yet initialised or used.

Full inference pipeline details are documented in [ai-service-python/app/model/ASL_MODEL_CONTEXT.md](ai-service-python/app/model/ASL_MODEL_CONTEXT.md).
