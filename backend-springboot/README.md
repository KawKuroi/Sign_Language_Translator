# Sign Language Translation - Backend Service

Este módulo expone la API principal del sistema (Java con Spring Boot). Actúa como un *API Gateway* interno, gestionando la orquestación entre las peticiones del Frontend y la inferencia compleja del microservicio de Inteligencia Artificial (Python).

## Stack Tecnológico
- **Java 17 & Spring Boot 3:** Para la estructura robusta y controladores REST.
- **Maven:** Gestor de dependencias y empaquetado.

## Variables de Entorno Principales
- `AI_SERVICE_URL`: URL del motor de Python (por defecto `http://localhost:8000`).

## Endpoints Disponibles
- **`GET /translate`**: Health check.
- **`POST /translate`**: Recibe el frame del frontend (imagen base64 en el body), lo reenvía a `AI_SERVICE_URL/predict` y devuelve la predicción al cliente.

  **Body esperado:**
  ```json
  { "image": "data:image/jpeg;base64,..." }
  ```

  **Respuesta esperada del AI Service (transparente hacia el frontend):**
  ```json
  { "hand_found": true, "letter": "A", "confidence": 0.97, "top": [...] }
  ```

## Desarrollo Local (Independiente)
Asegúrate de tener Java 17 localmente.
1. Ejecutar de forma rápida con el wrapper de Maven sin necesidad de construir el JAR:
   ```bash
   ./mvnw spring-boot:run
   ```
   *El servidor levantará en el puerto `8080` de manera predeterminada.*

## Dockerización
Para construir y correr este contenedor aislado, referenciando el AI service por fuera si es necesario:
```bash
docker build -t signlang-backend .
docker run -p 8080:8080 -e AI_SERVICE_URL=http://host.docker.internal:8000 signlang-backend
```
