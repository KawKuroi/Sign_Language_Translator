import { describe, expect, it, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './auth';
import { TOKEN_KEY } from './api';

function Probe() {
  const { user, login, logout, register } = useAuth();
  return (
    <div>
      <p data-testid="email">{user?.email ?? 'anonymous'}</p>
      <button onClick={() => void login('demo@signa.dev', 'pass')}>login</button>
      <button onClick={() => void register('new@signa.dev', 'Strong1!')}>register</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('starts anonymous', () => {
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );
    expect(screen.getByTestId('email')).toHaveTextContent('anonymous');
  });

  it('login populates user and stores token', async () => {
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );
    await act(async () => {
      await userEvent.click(screen.getByText('login'));
    });
    expect(screen.getByTestId('email')).toHaveTextContent('demo@signa.dev');
    expect(sessionStorage.getItem(TOKEN_KEY)).toBeTruthy();
  });

  it('register populates user', async () => {
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );
    await act(async () => {
      await userEvent.click(screen.getByText('register'));
    });
    expect(screen.getByTestId('email')).toHaveTextContent('new@signa.dev');
  });

  it('logout clears state and storage', async () => {
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );
    await act(async () => {
      await userEvent.click(screen.getByText('login'));
    });
    await act(async () => {
      await userEvent.click(screen.getByText('logout'));
    });
    expect(screen.getByTestId('email')).toHaveTextContent('anonymous');
    expect(sessionStorage.getItem(TOKEN_KEY)).toBeNull();
  });
});
