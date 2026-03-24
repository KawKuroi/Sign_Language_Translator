# Sign Language Translation - Frontend UI

Este es el módulo de interfaz de usuario para el Traductor de Lenguaje de Señas. Desarrollado en React.js con TypeScript, es la cara visible de la aplicación, responsable de interactuar con la cámara del usuario en el navegador y mostrar las traducciones en tiempo real o a demanda.

## Stack Tecnológico
- **React.js & TypeScript:** Estructura de componentes tipados y modularidad.
- **react-webcam:** Captura de video eficiente desde el navegador.
- **axios:** Cliente HTTP para la comunicación con el Backend.

## Variables de Entorno
Si corres este proyecto localmente, asegúrate de configurar el endpoint del backend:
- `REACT_APP_API_URL`: URL del Backend (por defecto `http://localhost:8080`).

## Desarrollo Local (Independiente)

Para trabajar únicamente en el entorno visual sin Docker:
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar servidor de desarrollo:
   ```bash
   npm start
   ```

## Dockerización
Si deseas probar la imagen en solitario:
```bash
docker build -t signlang-frontend .
docker run -p 3000:3000 -e REACT_APP_API_URL=http://localhost:8080 signlang-frontend
```
