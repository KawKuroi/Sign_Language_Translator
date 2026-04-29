import { describe, expect, it, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './register';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/toast';

function renderAt() {
  return render(
    <MemoryRouter initialEntries={['/register']}>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/app" element={<div>app-page</div>} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('RegisterPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('shows error when passwords do not match', async () => {
    renderAt();
    await userEvent.type(screen.getByLabelText('Correo'), 'a@b.com');
    await userEvent.type(screen.getByLabelText('Contraseña'), 'Strong1!');
    await userEvent.type(screen.getByLabelText('Confirmar contraseña'), 'Different2!');
    await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));
    expect(await screen.findByText(/no coinciden/i)).toBeInTheDocument();
  });

  it('shows error when password is weak', async () => {
    renderAt();
    await userEvent.type(screen.getByLabelText('Correo'), 'a@b.com');
    await userEvent.type(screen.getByLabelText('Contraseña'), 'weak');
    await userEvent.type(screen.getByLabelText('Confirmar contraseña'), 'weak');
    await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));
    expect(await screen.findByText(/Mínimo 8 caracteres/i)).toBeInTheDocument();
  });

  it('navigates to /app on success', async () => {
    renderAt();
    await userEvent.type(screen.getByLabelText('Correo'), 'new@signa.dev');
    await userEvent.type(screen.getByLabelText('Contraseña'), 'Strong1!');
    await userEvent.type(screen.getByLabelText('Confirmar contraseña'), 'Strong1!');
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));
    });
    expect(await screen.findByText('app-page')).toBeInTheDocument();
  });

  it('shows server error when email is taken', async () => {
    renderAt();
    await userEvent.type(screen.getByLabelText('Correo'), 'taken@signa.dev');
    await userEvent.type(screen.getByLabelText('Contraseña'), 'Strong1!');
    await userEvent.type(screen.getByLabelText('Confirmar contraseña'), 'Strong1!');
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));
    });
    expect(await screen.findByText(/ya está registrado/i)).toBeInTheDocument();
  });
});
