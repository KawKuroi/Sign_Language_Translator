import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TranscriptionPanel } from './transcription-panel';
import { ToastProvider } from '@/components/ui/toast';

function wrap(ui: ReactNode) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe('TranscriptionPanel', () => {
  it('shows placeholder when word is empty', () => {
    wrap(<TranscriptionPanel word="" status="idle" />);
    expect(screen.getByText(/aparecerá aquí/i)).toBeInTheDocument();
  });

  it('shows the word when present', () => {
    wrap(<TranscriptionPanel word="HOLA" status="running" />);
    expect(screen.getByText(/HOLA/)).toBeInTheDocument();
  });

  it('copy button triggers clipboard.writeText', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    wrap(<TranscriptionPanel word="HOLA" status="idle" />);
    await userEvent.click(screen.getByLabelText(/copiar transcripción/i));
    expect(writeText).toHaveBeenCalledWith('HOLA');
  });

  it('Save button calls onSave when word is present', async () => {
    const onSave = vi.fn();
    wrap(
      <TranscriptionPanel
        word="HOLA"
        status="idle"
        onSave={onSave}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /guardar al historial/i }));
    expect(onSave).toHaveBeenCalled();
  });
});
