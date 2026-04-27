# Sign Language Translation - Backend Service

Este módulo expone la API principal del sistema (Java con Spring Boot). Actúa como *API Gateway* interno gestionando la orquestación entre el frontend y el microservicio de IA, además de la gestión completa de usuarios, autenticación JWT y el historial de traducciones.

## Stack Tecnológico

- **Java 17 & Spring Boot 3.1**: Estructura REST robusta y controladores.
- **Spring Security 6**: Autenticación stateless con JWT y encriptación BCrypt.
- **Spring Data JPA + H2**: Persistencia embebida, sin instalar base de datos externa.
- **jjwt 0.11.5**: Generación y validación de tokens JWT (HS256).
- **Maven**: Gestor de dependencias y empaquetado.
- **Lombok**: Reducción de boilerplate.

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

## Variables de Entorno

| Variable | Descripción | Default |
|---|---|---|
| `AI_SERVICE_URL` | URL del AI service Python | `http://localhost:8000` |
| `JWT_SECRET` | Clave de firma de tokens (min. 32 chars) | valor local por defecto |
| `JWT_EXPIRATION_MS` | Duración del token en milisegundos | `86400000` (24 h) |

## Base de Datos (H2 embebida — sin instalación)

Al arrancar, Spring crea automáticamente el fichero `data/signlangdb.mv.db` con las tablas `USERS` y `TRANSLATION_HISTORY`. Los datos persisten entre reinicios.

Consola web disponible en: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:file:./data/signlangdb`
- **User**: `sa` | **Password**: *(vacío)*

## Endpoints

### Autenticación (pública)

**`POST /auth/register`** — Registro de nuevo usuario
```json
// Body
{ "email": "user@example.com", "password": "miPassword123" }
// Respuesta 201
{ "token": "<jwt>", "email": "user@example.com" }
```

**`POST /auth/login`** — Login
```json
// Body
{ "email": "user@example.com", "password": "miPassword123" }
// Respuesta 200
{ "token": "<jwt>", "email": "user@example.com" }
```

### Traducción (pública, sin autenticación)

**`GET /translate`** — Health check → `200 OK`

**`POST /translate`** — Envía un frame al AI service y devuelve la predicción ASL
```json
// Body
{ "image": "data:image/jpeg;base64,..." }
// Respuesta 200
{ "handFound": true, "letter": "A", "confidence": 0.97, "top": [...] }
```

### Historial (requiere `Authorization: Bearer <token>`)

**`POST /history`** — Guarda el texto acumulado de la sesión de señas
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

## Desarrollo Local

Requiere Java 17.

```bash
cd backend-springboot
./mvnw spring-boot:run   # Levanta en http://localhost:8080
```

### Ejecutar Tests

```bash
./mvnw test
```

Cobertura de tests unitarios:

| Clase | Qué testea |
|---|---|
| `JwtTokenProviderTest` | Generación, validación y expiración de tokens |
| `AuthServiceTest` | Registro, login, email duplicado, credenciales incorrectas |
| `AiServiceClientTest` | Llamada al AI service y manejo de errores de conexión |
| `TranslationHistoryServiceTest` | Guardar y recuperar historial, usuario no encontrado |
| `AuthControllerTest` | Endpoints `/auth/**` con MockMvc |
| `TranslationControllerTest` | `POST /translate` público (sin JWT) con MockMvc |
| `HistoryControllerTest` | Endpoints `/history` con `@WithMockUser` y sin autenticación |

## Dockerización

```bash
docker build -t signlang-backend .
docker run -p 8080:8080 \
  -e AI_SERVICE_URL=http://host.docker.internal:8000 \
  -e JWT_SECRET=clave-de-produccion-minimo-32-chars!! \
  signlang-backend
```
