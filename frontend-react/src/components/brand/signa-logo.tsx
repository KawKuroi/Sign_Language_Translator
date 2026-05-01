import { cn } from '@/lib/utils';
import iconPng from './Icon.png';

interface MarkProps {
  size?: number;
  dark?: boolean;
  className?: string;
}

export function MarkSigna({ size = 32, dark = false, className }: MarkProps) {
  const bg = dark ? '#FFFFFF' : '#000000';
  const r = Math.max(5, size * 0.22);
  return (
    <div
      className={cn('flex items-center justify-center shrink-0 relative', className)}
      style={{ width: size, height: size, borderRadius: r, backgroundColor: bg }}
      aria-hidden="true"
    >
      <img
        src={iconPng}
        alt=""
        style={{
          width: size * 0.78,
          height: size * 0.78,
          objectFit: 'contain',
          filter: dark ? 'none' : 'invert(1)',
        }}
      />
    </div>
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
          fontSize: italic ? size * 0.78 : size * 0.58,
          color: dark ? '#FFFFFF' : '#0A0A0A',
          letterSpacing: italic ? '-0.02em' : '-0.01em',
        }}
      >
        signa
      </span>
    </div>
  );
}
