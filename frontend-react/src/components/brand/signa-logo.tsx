import iconPng from './Icon.png';
import { cn } from '@/lib/utils';

interface MarkProps {
  size?: number;
  dark?: boolean;
  className?: string;
}

export function MarkSigna({ size = 32, dark = false, className }: MarkProps) {
  const r = Math.max(5, size * 0.22);
  return (
    <img
      src={iconPng}
      alt=""
      aria-hidden="true"
      className={cn('shrink-0', className)}
      width={size}
      height={size}
      style={{ borderRadius: r, filter: dark ? 'invert(1)' : undefined }}
    />
  );
}

interface SignaLogoProps {
  size?: number;
  dark?: boolean;
  italic?: boolean;
  className?: string;
}

export function SignaLogo({ size = 28, dark = false, italic = true, className }: SignaLogoProps) {
  return (
    <div className={cn('flex items-center gap-[9px]', className)}>
      <MarkSigna size={size} dark={dark} />
      <span
        className={cn(
          italic ? 'font-serif italic font-normal' : 'font-sans font-semibold',
          'leading-none',
        )}
        style={{
          fontSize: italic ? size * 0.95 : size * 0.7,
          color: dark ? '#FFFFFF' : '#0A0A0A',
          letterSpacing: italic ? '-0.02em' : '-0.01em',
        }}
      >
        signa
      </span>
    </div>
  );
}
