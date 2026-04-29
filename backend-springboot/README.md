# Sign Language Translation — Backend

API Gateway del sistema. Recibe frames del frontend, los reenvía al AI Service y devuelve la predicción. También gestiona autenticación JWT y el historial de traducciones por usuario.

## Stack

| Tecnología | Rol |
|---|---|
| **Java 17 + Spring Boot 3.1** | Estructura REST y controladores |
| **Spring Security 6** | Autenticación stateless con JWT + BCrypt |
| **Spring Data JPA + H2** | Persistencia embebida, sin base de datos externa |
| **jjwt 0.11.5** | Generación y validación de tokens (HS256) |
| **Maven** | Gestor de dependencias y empaquetado |
| **Lombok** | Reducción de boilerplate |

---

## Arquitectura de Paquetes

```
com.tuempresa.signlang/
  config/       AppConfig (beans), SecurityConfig (filtro JWT)
  controller/   AuthController, TranslationController, HistoryController
  dto/          RegisterRequest, LoginRequest, LoginResponse,
                TranslationRequest, TranslationResponse,
                SaveHistoryRequest, HistoryItemResponse
  entity/       User, TranslationHistory
  repository/   UserRepository, TranslationHistoryRepository
  security/     JwtTokenProvider, JwtAuthenticationFilter
  service/      AuthService, AiServiceClient, TranslationHistoryService
```

---

## Variables de Entorno

| Variable | Descripción | Default |
|---|---|---|
| `AI_SERVICE_URL` | URL del AI Service Python | `http://localhost:8000` |
| `JWT_SECRET` | Clave de firma JWT (mínimo 32 caracteres) | valor local por defecto |
| `JWT_EXPIRATION_MS` | Duración del token en milisegundos | `86400000` (24 h) |

---

## Base de Datos (H2 embebida)

Spring crea automáticamente `data/signlangdb.mv.db` con las tablas `USERS` y `TRANSLATION_HISTORY`. Los datos persisten entre reinicios.

Consola web: **http://localhost:8080/h2-console**
- **JDBC URL**: `jdbc:h2:file:./data/signlangdb`
- **User**: `sa` | **Password**: *(vacío)*

---

## Endpoints

### Autenticación (pública)

**`POST /auth/register`**
```json
// Body
{ "email": "user@example.com", "password": "miPassword123" }
// Respuesta 201
{ "token": "<jwt>", "email": "user@example.com" }
```

**`POST /auth/login`**
```json
// Body
{ "email": "user@example.com", "password": "miPassword123" }
// Respuesta 200
{ "token": "<jwt>", "email": "user@example.com" }
```

### Traducción (pública, sin autenticación)

**`GET /translate`** — Health check → `200 OK`

**`POST /translate`** — Envía el frame al AI Service y devuelve la predicción ASL
```json
// Body
{ "image": "data:image/jpeg;base64,..." }
// Respuesta 200
{ "handFound": true, "letter": "A", "confidence": 0.97, "top": [...] }
```

### Historial (requiere `Authorization: Bearer <token>`)

**`POST /history`**
```json
// Body
{ "text": "HELLO WORLD" }
// Respuesta 201
{ "id": 1, "text": "HELLO WORLD", "savedAt": "2026-04-27T10:30:00" }
```

**`GET /history`** — Historial del usuario autenticado (más reciente primero)
```json
// Respuesta 200
[
  { "id": 2, "text": "GOOD MORNING", "savedAt": "2026-04-27T09:00:00" },
  { "id": 1, "text": "HELLO WORLD",  "savedAt": "2026-04-26T18:00:00" }
]
```

---

## Desarrollo Local

Requiere Java 17+.

```bash
cd backend-springboot
./mvnw spring-boot:run   # http://localhost:8080
```

---

## Integración con Frontend

El frontend React envía los frames al endpoint `/translate`:

```
Browser (React) 
  POST /translate { image: "data:image/jpeg;base64,..." }
    ↓
  Backend Spring Boot
    └─ Valida JWT si es necesario (solo para /history)
    └─ Reenvía a AI Service
    └─ Devuelve { handFound, letter, confidence, top[] }
```

El backend también gestiona sesiones de usuario y guarda el historial de traducciones (`/history` POST/GET).

---

## Tests

```bash
./mvnw test
```

**25/25 tests pasando:**

| Suite | Tests | Qué verifica |
|---|---|---|
| `JwtTokenProviderTest` | 5 | Generación, validación y expiración de tokens |
| `AuthServiceTest` | 4 | Registro, login, email duplicado, credenciales incorrectas |
| `AiServiceClientTest` | 2 | Llamada al AI Service y manejo de errores de conexión |
| `TranslationHistoryServiceTest` | 3 | Guardar y recuperar historial, usuario no encontrado |
| `AuthControllerTest` | 4 | Endpoints `/auth/**` con MockMvc |
| `TranslationControllerTest` | 3 | `POST /translate` público (sin JWT) con MockMvc |
| `HistoryControllerTest` | 4 | Endpoints `/history` con y sin autenticación |

---

## Dockerización

El `Dockerfile` usa un build multi-stage:
1. **Stage `builder`** (`maven:3.9-eclipse-temurin-17-alpine`): descarga dependencias y compila el JAR.
2. **Stage runtime** (`eclipse-temurin:17-jre-alpine`): solo el JRE + el JAR, sin Maven ni fuentes.

```bash
docker build -t signlang-backend .
docker run -p 8080:8080 \
  -e AI_SERVICE_URL=http://host.docker.internal:8000 \
  -e JWT_SECRET=clave-de-produccion-minimo-32-chars!! \
  signlang-backend
```
