import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';
import { Label } from './label';

describe('Input + Label', () => {
  it('label associates with input via htmlFor/id', () => {
    render(
      <>
        <Label htmlFor="x">Correo</Label>
        <Input id="x" />
      </>,
    );
    expect(screen.getByLabelText('Correo')).toBeInTheDocument();
  });

  it('forwards type and autoComplete', () => {
    render(<Input type="password" autoComplete="new-password" data-testid="i" />);
    const el = screen.getByTestId('i') as HTMLInputElement;
    expect(el.type).toBe('password');
    expect(el.autocomplete).toBe('new-password');
  });

  it('typing updates value', async () => {
    render(<Input data-testid="i" />);
    await userEvent.type(screen.getByTestId('i'), 'hola');
    expect((screen.getByTestId('i') as HTMLInputElement).value).toBe('hola');
  });

  it('aria-invalid is reflected', () => {
    render(<Input aria-invalid={true} data-testid="i" />);
    expect(screen.getByTestId('i')).toHaveAttribute('aria-invalid', 'true');
  });
});
