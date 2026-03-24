# Sistema de Traducción de Lenguaje de Señas en Tiempo Real

Este es el repositorio principal del **Traductor de Lenguaje de Señas**, una aplicación orientada a microservicios diseñada para interpretar el lenguaje de señas en tiempo real a través de la cámara del usuario usando Inteligencia Artificial.

## 🏗 Arquitectura del Sistema

El proyecto está diseñado usando una arquitectura de microservicios, lo que permite un desarrollo, escalabilidad y despliegue independientes. Consta de tres componentes principales:

1. **Frontend (`frontend-react/`)**: Interfaz de usuario intuitiva que accede a la cámara web del dispositivo y muestra las traducciones. Construido con React y TypeScript.
2. **Backend (`backend-springboot/`)**: Orquestador principal y gestor de reglas de negocio. Escrito en Java utilizando Spring Boot. Sirve como puente entre el cliente y el motor de IA.
3. **AI Service (`ai-service-python/`)**: El núcleo de procesamiento de IA. Microservicio desarrollado en Python usando FastAPI. Aquí es donde los modelos de *Computer Vision* (como MediaPipe/TensorFlow) procesan los *landmarks* y generan las predicciones de las señas.

---

## 🚀 Inicio Rápido con Docker

La forma más sencilla y recomendada de ejecutar todo el ecosistema es utilizando **Docker Compose**. Esto levantará los tres servicios automáticamente y los conectará en una misma red interna.

### Requisitos Previos
- Instalar [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/).

### Ejecución paso a paso

1. Clona el repositorio y posiciónate en la raíz del proyecto:
   ```bash
   git clone <url-del-repositorio>
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

## 📡 Endpoints de las APIs

El sistema expone una serie de endpoints para procesar las traducciones.

### Backend (Spring Boot - `:8080`)
Este servicio actúa como gateway principal para las consultas de la aplicación.
- **`POST /translate`**: Endpoint principal de traducción. Recibe la petición del frontend y coordina la lógica con el servicio de Inteligencia Artificial. Retorna `Hola Mock` (actualmente en fase de prueba).

### AI Service (Python/FastAPI - `:8000`)
Este microservicio es responsable exclusivo de inferir predicciones a partir de los datos.
- **`POST /predict`**:
  - **Body esperado**: Objeto JSON con la información de los nodos espaciales de la mano (`data`).
  - **Descripción**: Procesa la entrada y devuelve la predicción textual de la seña ejecutada.
  - **Respuesta (Mocking actual)**: `{"prediction": "Hola Mock desde AI Service"}`

> **Nota para Desarrolladores:** Puedes acceder a la interfaz interactiva Swagger generada automáticamente por FastAPI yendo a `http://localhost:8000/docs` cuando corras el servicio.

---

## 🧠 Entrenamiento de Inteligencia Artificial

El proceso de recolección de datos y entrenamiento del modelo de predicción del lenguaje de señas se realizó en un entorno interactivo de Google Colab. 
Allí se encuentra el flujo completo para extraer *landmarks* (puntos clave de la mano) usando MediaPipe y entrenar la red neuronal que luego se consume en nuestro microservicio de Python.

🔗 **[Ver Notebook de Entrenamiento en Google Colab](https://colab.research.google.com/drive/1BFoFFgJX0FTVEcPoMJkZ_aEfE5e9tLO5)**

---

## 🛠 Tecnologías Utilizadas

- **Frontend**: React, TypeScript, Axios, CSS/HTML5.
- **Backend**: Java 17+, Spring Boot, Maven.
- **AI Service**: Python 3+, FastAPI, Uvicorn, Pydantic (Preparado para TensorFlow / MediaPipe).
- **Despliegue/Infraestructura**: Docker, Docker Compose.

---

## 📖 Instrucciones de Desarrollo Local Independiente
Si necesitas trabajar en un solo microservicio sin levantar todo el proyecto con Docker, por favor revisa el `README.md` específico dentro de cada carpeta:

* 📄 `frontend-react/README.md`
* 📄 `backend-springboot/README.md`
* 📄 `ai-service-python/README.md`
