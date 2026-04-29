import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AUTH_EXPIRED_EVENT, authApi, clearToken, readToken, writeToken } from './api';

export interface AuthUser {
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string, persistent?: boolean) => Promise<void>;
  register: (email: string, password: string, persistent?: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function decodeEmailFromJwt(token: string): string | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const padded = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), '='));
    const data = JSON.parse(json) as { sub?: string; email?: string; exp?: number };
    if (data.exp && data.exp * 1000 < Date.now()) return null;
    return data.email ?? data.sub ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const t = readToken();
    if (!t) return null;
    const email = decodeEmailFromJwt(t);
    return email ? { email } : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onExpired = () => setUser(null);
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired);
  }, []);

  const login = useCallback(async (email: string, password: string, persistent = false) => {
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      writeToken(res.token, persistent);
      setUser({ email: res.email });
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, persistent = false) => {
    setLoading(true);
    try {
      const res = await authApi.register(email, password);
      writeToken(res.token, persistent);
      setUser({ email: res.email });
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
