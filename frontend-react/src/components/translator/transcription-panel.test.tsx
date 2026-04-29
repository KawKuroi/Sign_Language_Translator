import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TranscriptionPanel } from './transcription-panel';
import { ToastProvider } from '@/components/ui/toast';

function wrap(ui: React.ReactNode) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe('TranscriptionPanel', () => {
  it('shows placeholder when word is empty', () => {
    wrap(<TranscriptionPanel word="" status="idle" isAuthenticated={false} />);
    expect(screen.getByText(/aparecerá aquí/i)).toBeInTheDocument();
  });

  it('shows the word when present', () => {
    wrap(<TranscriptionPanel word="HOLA" status="running" isAuthenticated={false} />);
    expect(screen.getByText(/HOLA/)).toBeInTheDocument();
  });

  it('copy button triggers clipboard.writeText', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    wrap(<TranscriptionPanel word="HOLA" status="idle" isAuthenticated={false} />);
    await userEvent.click(screen.getByLabelText(/copiar transcripción/i));
    expect(writeText).toHaveBeenCalledWith('HOLA');
  });

  it('Save button calls onLoginPrompt when not authenticated', async () => {
    const onLoginPrompt = vi.fn();
    const onSave = vi.fn();
    wrap(
      <TranscriptionPanel
        word="HOLA"
        status="idle"
        isAuthenticated={false}
        onSave={onSave}
        onLoginPrompt={onLoginPrompt}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /iniciar sesión para guardar/i }));
    expect(onLoginPrompt).toHaveBeenCalled();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('Save button calls onSave when authenticated', async () => {
    const onSave = vi.fn();
    wrap(
      <TranscriptionPanel
        word="HOLA"
        status="idle"
        isAuthenticated
        onSave={onSave}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /^guardar$/i }));
    expect(onSave).toHaveBeenCalled();
  });
});
