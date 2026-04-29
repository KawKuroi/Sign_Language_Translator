import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/toast';
import { type ReactNode } from 'react';
import LandingPage from '@/pages/landing';
import NotFoundPage from '@/pages/not-found';
import HistoryPage from '@/pages/history';
import LoginPage from '@/pages/login';

vi.mock('react-webcam', () => ({ default: vi.fn(() => null) }));

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function renderAppAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/history"
              element={
                <RequireAuth>
                  <HistoryPage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('App router', () => {
  it('renders Landing at /', async () => {
    await act(async () => {
      renderAppAt('/');
    });
    expect(await screen.findByRole('heading', { name: /Rompiendo barreras/i })).toBeInTheDocument();
  });

  it('renders 404 for unknown routes', async () => {
    await act(async () => {
      renderAppAt('/foo-bar-baz');
    });
    expect(await screen.findByText(/Página no encontrada/i)).toBeInTheDocument();
  });

  it('redirects /history to /login when unauthenticated', async () => {
    sessionStorage.clear();
    localStorage.clear();
    await act(async () => {
      renderAppAt('/history');
    });
    expect(await screen.findByRole('heading', { name: /bienvenido/i })).toBeInTheDocument();
  });
});
