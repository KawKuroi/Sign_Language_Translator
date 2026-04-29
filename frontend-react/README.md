# Signa — Frontend

SPA del traductor ASL en tiempo real. Implementa el design system **Signa** (Geist + Instrument Serif italic + Geist Mono, paleta monocromática negro/blanco), 5 vistas (Landing, Traductor, Historial, Acerca, Login/Register) y soporte responsive con layouts dedicados para desktop y mobile.

## Stack

- **React 18 + TypeScript + Vite 6** — bundler y dev server.
- **Tailwind CSS 3** — tokens del design system extraídos de [signa-tokens.jsx] del bundle de diseño.
- **react-router-dom 6** — routing con `RequireAuth`.
- **react-hook-form + zod** — validación de formularios.
- **axios** — cliente HTTP con interceptor JWT y manejo de 401.
- **react-webcam** — captura de video.
- **Radix UI** — primitivos accesibles (toast, dialog, label).
- **Vitest + Testing Library + MSW** — tests unitarios con backend mockeado.

## Rutas

| Ruta | Pantalla | Auth |
|---|---|---|
| `/` | Landing (desktop + mobile) | público |
| `/app` | Traductor con cámara | público |
| `/history` | Historial de traducciones | requerida |
| `/about` | Acerca del proyecto y equipo | público |
| `/login` | Iniciar sesión | público |
| `/register` | Crear cuenta | público |
| `*` | 404 | público |

## Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `VITE_API_URL` | URL base del backend Spring | `http://localhost:8080` |

Copia [.env.example](.env.example) a `.env.local` para desarrollo:

```bash
cp .env.example .env.local
```

> En Docker la variable se pasa como `build arg` y queda embebida en el bundle.

## Flujo de la cámara

1. Usuario entra a `/app` y hace click en **Habilitar cámara**.
2. Se solicita `navigator.mediaDevices.getUserMedia` (no automático — privacidad).
3. Cada 2 s, `react-webcam.getScreenshot({ width: 640, height: 480, quality: 0.8 })` produce un JPEG base64.
4. `POST /translate { image: dataUrl }` → backend → AI service → `{ handFound, letter, confidence, top[] }`.
5. Si `confidence >= 0.7` y la letra cambia respecto a la anterior, se acumula en `word` (max 64 caracteres).
6. El usuario puede **Copiar** o **Guardar** la palabra. Guardar requiere autenticación → si no hay token, redirige a `/login`.

Un `AbortController` cancela cualquier request en vuelo cuando el componente se desmonta o cuando ya hay otro request pendiente, evitando overlap.

## Auth y seguridad

- **JWT** se almacena en `sessionStorage` por defecto (se limpia al cerrar la pestaña). Marcar **Recordarme** lo mueve a `localStorage`.
- Interceptor de axios agrega `Authorization: Bearer <jwt>` automáticamente.
- En 401, el token se borra y se dispara `signa:auth-expired` → `AuthProvider` resetea `user`.
- Validación de formularios con zod antes de tocar la red.
- Sin `dangerouslySetInnerHTML` en ningún componente.
- Cámara solo se solicita tras gesto explícito del usuario; manejo claro de `NotAllowedError`.

## Scripts

```bash
npm install
npm run dev          # dev server en http://localhost:3000
npm run build        # tsc --noEmit + vite build → dist/
npm run preview      # sirve el build local
npm run test         # vitest run (CI-friendly)
npm run test:watch   # vitest en modo watch
npm run test:ui      # vitest UI en navegador
npm run typecheck    # tsc --noEmit
```

## Estructura

```
src/
├── App.tsx                # router shell + providers
├── main.tsx               # entry
├── index.css              # @tailwind + scrollbar + animaciones
├── lib/
│   ├── api.ts             # axios + interceptors + endpoints tipados
│   ├── auth.tsx           # AuthProvider, useAuth
│   ├── tokens.ts          # mirror del T del design system
│   └── utils.ts           # cn() (clsx + tailwind-merge)
├── components/
│   ├── ui/                # Button, Card, Badge, Input, Label, SectionLabel, Divider, Toast
│   ├── brand/             # SignaLogo (MarkSigna + wordmark) + 27 íconos custom
│   ├── layout/            # NavDesktop, FooterDesktop, AppSidebar, AppHeader,
│   │                      # AppStatusBar, MobileHeader, MobileBottomNav
│   └── translator/        # CameraCard, WebcamView, TranscriptionPanel
├── pages/                 # landing / app-translator / history / about / login / register / not-found
├── hooks/
│   ├── use-translator.ts  # captura + polling + acumulación de letras
│   └── use-media-query.ts # useIsMobile (<=767px)
└── test/
    ├── setup.ts
    └── mocks/             # MSW handlers + server
```

## Docker

Build multi-stage (node + nginx). Sin cambios respecto al build previo:

```bash
docker build \
  --build-arg VITE_API_URL=http://localhost:8080 \
  -t signa-frontend .
docker run -p 3000:80 signa-frontend
```

## Tests

**50/50 tests pasando.** Cobertura completa:

| Suite | Tests | Cobertura |
|---|---|---|
| `api.test.ts` | 7 | Interceptor JWT, 401 handler, endpoints tipados |
| `auth.test.tsx` | 4 | AuthProvider: login/register/logout, token persistence |
| `button.test.tsx` | 5 | Variants (primary/secondary/ghost), states (disabled/loading) |
| `input.test.tsx` | 4 | Input + Label, typing, accessibility |
| `signa-logo.test.tsx` | 3 | Logo sizing, dark/light modes |
| `use-translator.test.tsx` | 6 | Polling, confidence threshold, deduplication, AbortController |
| `transcription-panel.test.tsx` | 5 | Placeholder, copy to clipboard, auth-gated save |
| `app-translator.test.tsx` | 3 | Camera permission flow, error handling |
| `App.test.tsx` | 3 | Router, 404, auth gates |
| `login.test.tsx` | 4 | Zod validation, 401 errors, successful redirect |
| `register.test.tsx` | 4 | Password matching, email validation, autologin |
| `history.test.tsx` | 2 | Auth redirect, MSW list rendering |

Framework: **Vitest 2.1 + Testing Library + MSW v2 + jsdom**

```bash
npm run test          # run once
npm run test:watch   # watch mode
npm run test:ui      # UI dashboard
```
