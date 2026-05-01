import { cn } from '@/lib/utils';

interface MarkProps {
  size?: number;
  dark?: boolean;
  className?: string;
}

const ICON_PATH =
  'M13 0h2v1h-2z M8 1h3v1h-3z M13 1h3v1h-3z M8 2h3v1h-3z M14 2h2v1h-2z M9 3h3v1h-3z M14 3h3v1h-3z M6 4h2v1h-2z M10 4h3v1h-3z M14 4h3v1h-3z M6 5h3v1h-3z M11 5h1v1h-1z M15 5h3v1h-3z M19 5h3v1h-3z M7 6h3v1h-3z M12 6h1v1h-1z M15 6h7v1h-7z M3 7h3v1h-3z M8 7h1v1h-1z M11 7h3v1h-3z M16 7h6v1h-6z M3 8h5v1h-5z M10 8h4v1h-4z M16 8h6v1h-6z M5 9h10v1h-10z M16 9h5v1h-5z M1 10h1v1h-1z M7 10h8v1h-8z M18 10h3v1h-3z M0 11h5v1h-5z M8 11h8v1h-8z M18 11h3v1h-3z M0 12h8v1h-8z M10 12h6v1h-6z M17 12h3v1h-3z M3 13h5v1h-5z M14 13h2v1h-2z M17 13h2v1h-2z M6 14h2v1h-2z M14 14h2v1h-2z M0 15h6v1h-6z M13 15h3v1h-3z M0 16h7v1h-7z M13 16h3v1h-3z M3 17h4v1h-4z M13 17h2v1h-2z M12 18h3v1h-3z M1 19h8v1h-8z M12 19h3v1h-3z M1 20h13v1h-13z M2 21h11v1h-11z';

export function MarkSigna({ size = 32, dark = false, className }: MarkProps) {
  const r = Math.max(5, size * 0.22);
  const inner = Math.round(size * 0.55);
  return (
    <div
      className={cn('flex items-center justify-center shrink-0', className)}
      style={{
        width: size,
        height: size,
        borderRadius: r,
        backgroundColor: dark ? '#FFFFFF' : '#0A0A0A',
      }}
      aria-hidden="true"
    >
      <svg
        width={inner}
        height={inner}
        viewBox="0 0 23 23"
        shapeRendering="geometricPrecision"
        style={{ color: dark ? '#0A0A0A' : '#FFFFFF' }}
      >
        <path d={ICON_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}

interface SignaLogoProps {
  size?: number;
  dark?: boolean;
  italic?: boolean;
  className?: string;
}

export function SignaLogo({ size = 36, dark = false, italic = true, className }: SignaLogoProps) {
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
