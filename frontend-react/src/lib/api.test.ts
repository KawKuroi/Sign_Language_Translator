import { describe, expect, it, beforeEach, vi } from 'vitest';
import {
  AUTH_EXPIRED_EVENT,
  TOKEN_KEY,
  authApi,
  clearToken,
  historyApi,
  readToken,
  writeToken,
} from './api';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';

describe('api / token storage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('writeToken/readToken/clearToken roundtrip (session)', () => {
    writeToken('abc');
    expect(sessionStorage.getItem(TOKEN_KEY)).toBe('abc');
    expect(readToken()).toBe('abc');
    clearToken();
    expect(readToken()).toBeNull();
  });

  it('persistent flag uses localStorage and clears session', () => {
    sessionStorage.setItem(TOKEN_KEY, 'old');
    writeToken('new', true);
    expect(localStorage.getItem(TOKEN_KEY)).toBe('new');
    expect(sessionStorage.getItem(TOKEN_KEY)).toBeNull();
  });
});

describe('api / interceptors', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('adds Authorization header when a token is present', async () => {
    writeToken('my-jwt');
    let receivedAuth: string | null = null;
    server.use(
      http.get('http://localhost:8080/history', ({ request }) => {
        receivedAuth = request.headers.get('authorization');
        return HttpResponse.json([]);
      }),
    );
    await historyApi.list();
    expect(receivedAuth).toBe('Bearer my-jwt');
  });

  it('clears token and dispatches signa:auth-expired on 401', async () => {
    writeToken('expired');
    const handler = vi.fn();
    window.addEventListener(AUTH_EXPIRED_EVENT, handler);

    server.use(
      http.get('http://localhost:8080/history', () =>
        HttpResponse.json({ message: 'expired' }, { status: 401 }),
      ),
    );

    await expect(historyApi.list()).rejects.toBeDefined();
    expect(readToken()).toBeNull();
    expect(handler).toHaveBeenCalled();
    window.removeEventListener(AUTH_EXPIRED_EVENT, handler);
  });
});

describe('api / authApi', () => {
  it('login returns token + email', async () => {
    const res = await authApi.login('demo@signa.dev', 'whatever');
    expect(res.email).toBe('demo@signa.dev');
    expect(res.token).toMatch(/\./);
  });

  it('login throws on 401', async () => {
    await expect(authApi.login('fail@signa.dev', 'wrong')).rejects.toBeDefined();
  });

  it('register returns token + email', async () => {
    const res = await authApi.register('new@signa.dev', 'Strong1!');
    expect(res.email).toBe('new@signa.dev');
  });
});
