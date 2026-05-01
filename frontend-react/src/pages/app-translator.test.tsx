import { describe, expect, it, vi, beforeEach } from 'vitest';
import { forwardRef, useEffect } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AppTranslatorPage from './app-translator';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/toast';

vi.mock('react-webcam', () => ({
  default: forwardRef(function MockWebcam({ onUserMediaError }: { onUserMediaError?: (e: unknown) => void }, _ref: unknown) {
    useEffect(() => {
      if (!navigator.mediaDevices?.getUserMedia) return;
      navigator.mediaDevices.getUserMedia({ video: true }).catch((e) => onUserMediaError?.(e));
    }, [onUserMediaError]);
    return null;
  }),
}));

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/app']}>
      <AuthProvider>
        <ToastProvider>
          <AppTranslatorPage />
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('AppTranslatorPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('shows the "Habilitar cámara" CTA initially', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /habilitar cámara/i })).toBeInTheDocument();
    expect(screen.getByText(/Acceso a cámara/i)).toBeInTheDocument();
  });

  it('shows error toast when getUserMedia rejects with NotAllowedError', async () => {
    const err = new DOMException('Permission denied', 'NotAllowedError');
    Object.defineProperty(navigator, 'mediaDevices', {
      value: { getUserMedia: vi.fn().mockRejectedValue(err) },
      configurable: true,
    });
    renderApp();
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /habilitar cámara/i }));
    });
    expect(await screen.findByText(/Habilita la cámara en la configuración del navegador/i)).toBeInTheDocument();
  });

  it('shows error when getUserMedia is not available', async () => {
    Object.defineProperty(navigator, 'mediaDevices', {
      value: undefined,
      configurable: true,
    });
    renderApp();
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /habilitar cámara/i }));
    });
    expect(await screen.findByText(/Cámara no disponible/i)).toBeInTheDocument();
  });
});
