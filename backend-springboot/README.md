# Sign Language Translation - Backend Service

Este módulo expone la API principal (Java con Spring Boot), encargada de la lógica de negocio, reglas de seguridad y la orquestación, comunicándose con la base de datos PostgreSQL, y fungiendo de cliente hacia el microservicio de IA.

## Stack Tecnológico
- **Java 17 & Spring Boot 3:** Para la estructura robusta y controladores REST.
- **Spring Data JPA & PostgreSQL:** Para gestión y persistencia.
- **Lombok:** Boilerplate reduction.

## Cómo Utilizar Localmente

1. Compilar y empaquetar con Maven (Se requiere Maven 3.x y JDK 17):
   ```bash
   ./mvnw clean package
   ```
2. Ejecutar la aplicación:
   ```bash
   ./mvnw spring-boot:run
   ```

## Dockerización
Puedes ejecutar el backend dentro de un contenedor Docker:
```bash
docker build -t signlang-backend .
docker run -p 8080:8080 signlang-backend
```
