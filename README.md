# Sistema de Traducción de Lenguaje de Señas en Tiempo Real

Este es el repositorio principal del **Traductor de Lenguaje de Señas**, una aplicación orientada a microservicios diseñada para interpretar el lenguaje de señas en tiempo real a través de la cámara del usuario usando Inteligencia Artificial.

## Arquitectura del Sistema

El proyecto está diseñado usando una arquitectura de microservicios, lo que permite un desarrollo, escalabilidad y despliegue independientes. Consta de tres componentes principales:

1. **Frontend (`frontend-react/`)**: Interfaz de usuario intuitiva que accede a la cámara web del dispositivo y muestra las traducciones. Construido con React y TypeScript.
2. **Backend (`backend-springboot/`)**: Orquestador principal y gestor de reglas de negocio. Escrito en Java utilizando Spring Boot. Sirve como puente entre el cliente y el motor de IA.
3. **AI Service (`ai-service-python/`)**: El núcleo de procesamiento de IA. Microservicio desarrollado en Python usando FastAPI. Aquí es donde los modelos de *Computer Vision* (como MediaPipe/TensorFlow) procesan los *landmarks* y generan las predicciones de las señas.

---

## Inicio Rápido con Docker

La forma más sencilla y recomendada de ejecutar todo el ecosistema es utilizando **Docker Compose**. Esto levantará los tres servicios automáticamente y los conectará en una misma red interna.

### Requisitos Previos
- Instalar [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/).

### Ejecución paso a paso

1. Clona el repositorio y posiciónate en la raíz del proyecto:
   ```bash
   git clone https://github.com/KawKuroi/Sign_Language_Translator.git
   cd Sign_Language_Translator
   ```

2. Ejecuta el entorno con Docker Compose:
   ```bash
   docker-compose up --build
   ```
   *(El flag `--build` fuerza a Docker a compilar las imágenes en caso de que haya habido cambios recientes).*

3. Una vez que todos los contenedores estén corriendo, los servicios estarán disponibles en los siguientes puertos locales:
   - **Frontend (Interfaz Gráfica)**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:8080](http://localhost:8080)
   - **AI Service API** (y documentación Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)

Para detener los servicios de forma limpia, puedes presionar `Ctrl+C` en la terminal o ejecutar en otra ventana:
```bash
docker-compose down
```

---

## Endpoints de las APIs

El sistema expone una serie de endpoints para procesar las traducciones.

### Backend (Spring Boot - `:8080`)
Este servicio actúa como gateway principal para las consultas de la aplicación.
- **`POST /translate`**: Recibe el frame del frontend (imagen base64) y lo reenvía al AI Service para obtener la predicción.

### AI Service (Python/FastAPI - `:8000`)
Motor de inferencia. Recibe una imagen de la mano, extrae landmarks con MediaPipe y clasifica la seña con la red neuronal.
- **`POST /predict`**:
  - **Body**: `{ "image": "data:image/jpeg;base64,..." }` — data-URL o base64 puro.
  - **Respuesta (mano detectada)**: `{ "hand_found": true, "letter": "A", "confidence": 0.97, "top": [...] }`
  - **Respuesta (sin mano)**: `{ "hand_found": false, "letter": null, "confidence": 0.0, "top": [] }`
  - **Letras soportadas**: A–Y (J y Z excluidas por requerir movimiento).

> Documentación interactiva Swagger disponible en `http://localhost:8000/docs`.

---

## Entrenamiento de Inteligencia Artificial

El proceso de recolección de datos y entrenamiento del modelo de predicción del lenguaje de señas se realizó en un entorno interactivo de Google Colab. 
Allí se encuentra el flujo completo para extraer *landmarks* (puntos clave de la mano) usando MediaPipe y entrenar la red neuronal que luego se consume en nuestro microservicio de Python.

**[Ver Notebook de Entrenamiento en Google Colab](https://colab.research.google.com/drive/1qajMkPVaFqv2pbhziVAZPs_v8tdftteS)**

---

## Tecnologías Utilizadas

- **Frontend**: React, TypeScript, Axios, CSS/HTML5.
- **Backend**: Java 17+, Spring Boot, Maven.
- **AI Service**: Python 3.10+, FastAPI, Uvicorn, Pydantic, TensorFlow 2.16+, MediaPipe, OpenCV.
- **Despliegue/Infraestructura**: Docker, Docker Compose.

---

## Instrucciones de Desarrollo Local Independiente
Si necesitas trabajar en un solo microservicio sin levantar todo el proyecto con Docker, por favor revisa el `README.md` específico dentro de cada carpeta:

* `frontend-react/README.md`
* `backend-springboot/README.md`
* `ai-service-python/README.md`
