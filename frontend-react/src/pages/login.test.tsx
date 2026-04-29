import { describe, expect, it, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './login';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/toast';

function renderAt(initialEntries: string[] = ['/login']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/app" element={<div>app-page</div>} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('LoginPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('renders headline and form', () => {
    renderAt();
    expect(screen.getByRole('heading', { name: /bienvenido/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Correo')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  it('shows zod error when email is invalid', async () => {
    renderAt();
    await userEvent.type(screen.getByLabelText('Correo'), 'no-email');
    await userEvent.type(screen.getByLabelText('Contraseña'), 'pass');
    await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    expect(await screen.findByText(/correo inválido/i)).toBeInTheDocument();
  });

  it('navigates to /app on successful login', async () => {
    renderAt();
    await userEvent.type(screen.getByLabelText('Correo'), 'demo@signa.dev');
    await userEvent.type(screen.getByLabelText('Contraseña'), 'whatever');
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    });
    expect(await screen.findByText('app-page')).toBeInTheDocument();
  });

  it('shows error message on 401', async () => {
    renderAt();
    await userEvent.type(screen.getByLabelText('Correo'), 'fail@signa.dev');
    await userEvent.type(screen.getByLabelText('Contraseña'), 'wrong');
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    });
    expect(await screen.findByText(/incorrectos/i)).toBeInTheDocument();
  });
});
