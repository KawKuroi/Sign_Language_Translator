# Sign Language Translation - Frontend UI

Este es el módulo de interfaz de usuario, desarrollado en React.js con TypeScript, responsable de interactuar con la cámara del usuario en el navegador y mostrar las traducciones del lenguaje de señas en tiempo real o a demanda.

## Stack Tecnológico
- **React.js & TypeScript:** Para la estructura de la aplicación y componentes orientados al tipado fuerte.
- **react-webcam:** Para captura de video.
- **axios:** Para comunicarse a través del API Gateway.
- **socket.io-client / WebSockets:** (Opcional) para streaming en tiempo real.

## Uso

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar entorno de desarrollo local:
   ```bash
   npm start
   ```

## Dockerización
Puedes compilar y ejecutar el frontend a través de Docker de forma sencilla:
```bash
docker build -t signlang-frontend .
docker run -p 3000:80 signlang-frontend
```
