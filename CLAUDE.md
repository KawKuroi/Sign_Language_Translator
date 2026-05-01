# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A three-tier microservices app for real-time ASL (American Sign Language) alphabet translation using a webcam. The pipeline captures frames in the browser, sends them to a Spring Boot gateway, and the Python AI service extracts MediaPipe landmarks and classifies the letter with a dense neural network (97 % accuracy, A–Y; J and Z excluded as they require motion).

**Current state**: Fully functional end-to-end pipeline. Frontend (React + Tailwind, design system "Signa"), backend (Spring Boot JWT auth + history), and AI service (FastAPI + MediaPipe + TFLite) are all wired up and tested.

---

## Running the Stack

### All services (Docker — recommended)
```bash
docker-compose up --build   # frontend :3000, backend :8080, AI service :8000
docker-compose down
```

### Frontend (React + Vite)
```bash
cd frontend-react
npm install
npm run dev        # dev server on :3000
npm run build      # production build
npm run test       # vitest run
```

### Backend (Spring Boot + Maven)
```bash
cd backend-springboot
./mvnw spring-boot:run     # dev server on :8080
./mvnw test
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

- **Frontend** ([frontend-react/src/](frontend-react/src/)): React 18 + TypeScript + Tailwind CSS. Design system "Signa" (Geist + Instrument Serif + Geist Mono, monochromatic palette). Routes: Landing, Traductor (webcam), Historial, About, Login/Register. Webcam captures frames every 2 s and posts them to `/translate`. Auth via JWT.
- **Backend** ([backend-springboot/src/](backend-springboot/src/)): `POST /translate` forwards image bytes to AI service. `POST|GET /history` (JWT-protected). `POST /auth/register|login` (public). H2 embedded DB.
- **AI Service** ([ai-service-python/app/](ai-service-python/app/)): `POST /predict` runs MediaPipe → TFLite and returns `{ hand_found, letter, confidence, top[] }`. Model `asl_model.keras` is converted to `.tflite` at Docker build time.

### Environment variables

| Variable | Used by | Default |
|---|---|---|
| `AI_SERVICE_URL` | Backend | `http://localhost:8000` |
| `VITE_API_URL` | Frontend | `http://localhost:8080` |
| `JWT_SECRET` | Backend | dev default (min 32 chars in prod) |

---

## Key Files

| File | Purpose |
|---|---|
| [frontend-react/src/hooks/use-translator.ts](frontend-react/src/hooks/use-translator.ts) | Webcam capture + polling + letter accumulation |
| [frontend-react/src/lib/api.ts](frontend-react/src/lib/api.ts) | Axios client with JWT interceptor |
| [frontend-react/src/pages/landing.tsx](frontend-react/src/pages/landing.tsx) | Landing page (desktop layout) |
| [backend-springboot/.../TranslationController.java](backend-springboot/src/main/java/com/tuempresa/signlang/controller/TranslationController.java) | POST /translate → AI Service proxy |
| [backend-springboot/.../SecurityConfig.java](backend-springboot/src/main/java/com/tuempresa/signlang/config/SecurityConfig.java) | JWT filter chain, public routes |
| [ai-service-python/app/routes.py](ai-service-python/app/routes.py) | POST /predict handler |
| [ai-service-python/app/model/ASL_MODEL_CONTEXT.md](ai-service-python/app/model/ASL_MODEL_CONTEXT.md) | Model architecture + training details |

---

## Test Counts

| Service | Framework | Passing |
|---|---|---|
| Frontend | Vitest + Testing Library + MSW | 50 / 50 |
| Backend | JUnit + MockMvc | 25 / 25 |
| AI Service | pytest + httpx | 5 / 5 |

Run all tests via Docker (no local deps required):
```bash
# Frontend
docker run --rm -v "$(pwd)/frontend-react:/app" -w /app node:20-alpine sh -c "npm ci --silent && npm test -- --run"
# Backend
docker run --rm -v "$(pwd)/backend-springboot:/app" -w /app maven:3.9-eclipse-temurin-17-alpine mvn test -q
```
