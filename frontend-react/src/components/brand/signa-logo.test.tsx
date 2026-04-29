import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignaLogo, MarkSigna } from './signa-logo';

describe('SignaLogo', () => {
  it('renders the wordmark "signa"', () => {
    render(<SignaLogo />);
    expect(screen.getByText('signa')).toBeInTheDocument();
  });

  it('respects italic=false', () => {
    render(<SignaLogo italic={false} />);
    const span = screen.getByText('signa');
    expect(span.className).toMatch(/font-sans/);
  });

  it('MarkSigna renders the SVG mark', () => {
    const { container } = render(<MarkSigna size={40} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
