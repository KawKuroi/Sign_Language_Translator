import { http, HttpResponse } from 'msw';

const BASE = 'http://localhost:8080';

const FAKE_JWT_PAYLOAD = btoa(
  JSON.stringify({ sub: 'demo@signa.dev', email: 'demo@signa.dev', exp: Date.now() / 1000 + 3600 }),
)
  .replace(/=+$/, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');
export const FAKE_JWT = `header.${FAKE_JWT_PAYLOAD}.signature`;

export const handlers = [
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.email === 'fail@signa.dev' || body.password === 'wrong') {
      return HttpResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }
    return HttpResponse.json({ token: FAKE_JWT, email: body.email });
  }),

  http.post(`${BASE}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.email === 'taken@signa.dev') {
      return HttpResponse.json({ message: 'Correo en uso' }, { status: 409 });
    }
    return HttpResponse.json({ token: FAKE_JWT, email: body.email }, { status: 201 });
  }),

  http.post(`${BASE}/translate`, async ({ request }) => {
    const body = (await request.json()) as { image?: string };
    if (!body.image) {
      return HttpResponse.json({ message: 'image requerido' }, { status: 400 });
    }
    return HttpResponse.json({
      handFound: true,
      letter: 'A',
      confidence: 0.92,
      top: [
        { letter: 'A', confidence: 0.92 },
        { letter: 'E', confidence: 0.04 },
      ],
    });
  }),

  http.get(`${BASE}/history`, ({ request }) => {
    if (!request.headers.get('authorization')?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'unauthorized' }, { status: 401 });
    }
    return HttpResponse.json([
      { id: 1, text: 'HOLA', savedAt: '2025-01-15T10:00:00Z' },
      { id: 2, text: 'MUNDO', savedAt: '2025-01-15T10:05:00Z' },
    ]);
  }),

  http.post(`${BASE}/history`, async ({ request }) => {
    if (!request.headers.get('authorization')?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'unauthorized' }, { status: 401 });
    }
    const body = (await request.json()) as { text: string };
    return HttpResponse.json(
      { id: 99, text: body.text, savedAt: new Date().toISOString() },
      { status: 201 },
    );
  }),
];
