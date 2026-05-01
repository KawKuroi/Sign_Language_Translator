import axios, { type AxiosInstance } from 'axios';

export const TOKEN_KEY = 'signa.jwt';
export const AUTH_EXPIRED_EVENT = 'signa:auth-expired';

const baseURL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8080';

export const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10_000,
});

api.interceptors.request.use((cfg) => {
  const token = readToken();
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearToken();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
      }
    }
    return Promise.reject(err);
  },
);

export function readToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function writeToken(token: string, persistent = false): void {
  try {
    if (persistent) {
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.removeItem(TOKEN_KEY);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    /* storage disabled */
  }
}

export function clearToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage disabled */
  }
}

export interface AuthResponse {
  token: string;
  email: string;
}

export interface TopPrediction {
  letter: string;
  confidence: number;
}

export interface TranslationResponse {
  handFound: boolean;
  letter: string | null;
  confidence: number;
  top: TopPrediction[];
}

export interface HistoryItem {
  id: number;
  text: string;
  savedAt: string;
}

export const authApi = {
  register: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/register', { email, password }).then((r) => r.data),
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }).then((r) => r.data),
  deleteAccount: () => api.delete<void>('/auth/me').then(() => undefined),
};

export const translateApi = {
  translate: (imageDataUrl: string, signal?: AbortSignal) =>
    api
      .post<TranslationResponse>('/translate', { image: imageDataUrl }, { signal })
      .then((r) => r.data),
};

export const historyApi = {
  list: () => api.get<HistoryItem[]>('/history').then((r) => r.data),
  save: (text: string) => api.post<HistoryItem>('/history', { text }).then((r) => r.data),
};
