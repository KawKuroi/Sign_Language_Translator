# Sign Language Translation — Frontend

Interfaz de usuario del traductor ASL. Accede a la webcam del navegador, captura frames cada 2 s y muestra la letra detectada con su porcentaje de confianza.

## Stack

- **React 18 + TypeScript** — componentes tipados.
- **Vite** — bundler y servidor de desarrollo.
- **react-webcam** — captura de video desde el navegador.
- **nginx:alpine** — sirve el build estático en producción (Docker).

---

## Variables de Entorno

La URL del backend se inyecta **en tiempo de build** mediante Vite:

| Variable | Descripción | Default |
|---|---|---|
| `VITE_API_URL` | URL base del backend | `http://localhost:8080` |

En desarrollo local, crea un archivo `.env.local` en `frontend-react/`:

```env
VITE_API_URL=http://localhost:8080
```

> En Docker la variable se pasa como `build arg` en `docker-compose.yml` y queda embebida en el bundle estático. No es una variable de entorno en runtime.

---

## Flujo de datos

```
Webcam (frame cada 2 000 ms)
  └─ base64 JPEG
       └─ POST /translate → Backend :8080
                                └─ { handFound, letter, confidence, top }
                                         └─ TranslationBox (UI)
```

---

## Desarrollo Local

Requiere Node.js 18+.

```bash
cd frontend-react
npm install
npm run dev        # servidor en http://localhost:5173
npm run build      # build de producción en dist/
```

---

## Dockerización

El Dockerfile usa un build multi-stage:
1. **Stage builder** (`node:18-alpine`): instala dependencias y ejecuta `npm run build`.
2. **Stage serve** (`nginx:1.27-alpine`): sirve el contenido de `dist/` con SPA fallback.

```bash
# Build y run standalone
docker build \
  --build-arg VITE_API_URL=http://localhost:8080 \
  -t signlang-frontend .

docker run -p 80:80 signlang-frontend
```

La UI queda disponible en **http://localhost** (puerto 80).

### nginx — SPA fallback

Todas las rutas desconocidas redirigen a `index.html` para que React Router funcione correctamente. Los assets estáticos (JS, CSS, imágenes) se sirven con caché de 1 año (`Cache-Control: public, immutable`).
