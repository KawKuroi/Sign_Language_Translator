# Sistema de Traducción de Lenguaje de Señas (Multi-Repositorio / Monorepo)

Este es el proyecto matriz (monorepo en un único repositorio de GitHub) para la arquitectura orientada a microservicios del traductor de lenguaje de señas en tiempo real. 

## Arquitectura

El sistema está orquestado a través de sub-directorios que emulan módulos y microservicios paralelos:

1. **Gestión de API (No incluida dentro de este árbol per se)**: En producción se utiliza Apigee (Capa Google Cloud) para seguridad, ruteo y Rate Limiting.
2. **`frontend-react/`**: Interfaz de usuario que consume la cámara y expone las respuestas de traducción. Desarrollada de manera profesional usando React, TypeScript, Axios y WebCams.
3. **`backend-springboot/`**: Sistema central de orquestación, conexión a base de datos PostgreSQL y gestión principal de negocio, escrito en Java, basándose en la robustez empresarial de Spring Boot.
4. **`ai-service-python/`**: El verdadero motor de la traducción, desacoplado como un microservicio en FastAPI y Python, optimizado para cargar MediaPipe y TensorFlow bajo demanda.

## Metodología y Buenas Prácticas
  - **Dockerización**: Cada componente incluye su propio `Dockerfile` listo para compilar contenedores inmutables listos para producción.
  - **Desacople en capas**: Separación nítida de responsabilidades; el frontend no compila inteligencia artificial, el backend no procesa imágenes, la IA solo ejecuta matrices numéricas.
  - **Organización ágil**: Usos sugeridos de GitFlow para el versionamiento seguro e integración continua con GitHub Actions.

## Instrucciones y Setup General
Todos los detalles individuales para trabajar localmente con el frontend, backend o inteligencia artificial se encuentran explicados claramente en cada subcarpeta o módulo.

* Revisa `frontend-react/README.md`
* Revisa `backend-springboot/README.md`
* Revisa `ai-service-python/README.md`
