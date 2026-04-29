import { describe, expect, it, beforeEach } from 'vitest';
import { type ReactNode } from 'react';
import { act, render, screen } from '@testing-library/react';
import {
  MemoryRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import HistoryPage from './history';
import LoginPage from './login';
import { AuthProvider, useAuth } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/toast';
import { writeToken } from '@/lib/api';
import { FAKE_JWT } from '@/test/mocks/handlers';

function RequireAuthRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route
            path="/history"
            element={
              <RequireAuthRoute>
                <HistoryPage />
              </RequireAuthRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

describe('HistoryPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('redirects to /login when unauthenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/history']}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { name: /bienvenido/i })).toBeInTheDocument();
  });

  it('renders saved items when authenticated', async () => {
    writeToken(FAKE_JWT);
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/history']}>
          <App />
        </MemoryRouter>,
      );
    });
    expect(await screen.findByText('HOLA')).toBeInTheDocument();
    expect(await screen.findByText('MUNDO')).toBeInTheDocument();
  });
});
