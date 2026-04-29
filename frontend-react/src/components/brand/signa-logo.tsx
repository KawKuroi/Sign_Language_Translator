import { cn } from '@/lib/utils';

interface MarkProps {
  size?: number;
  dark?: boolean;
  className?: string;
}

export function MarkSigna({ size = 32, dark = false, className }: MarkProps) {
  const bg = dark ? '#FFFFFF' : '#000000';
  const fg = dark ? '#000000' : '#FFFFFF';
  const r = Math.max(5, size * 0.22);
  return (
    <div
      className={cn('flex items-center justify-center shrink-0 relative', className)}
      style={{ width: size, height: size, borderRadius: r, backgroundColor: bg }}
      aria-hidden="true"
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <path d="M2 12 L6 13" stroke={fg} strokeWidth="2" strokeLinecap="round" />
        <path d="M2 16 L7 16" stroke={fg} strokeWidth="2" strokeLinecap="round" />
        <path d="M2 20 L6 19" stroke={fg} strokeWidth="2" strokeLinecap="round" />
        <path d="M26 4 L24 7" stroke={fg} strokeWidth="2" strokeLinecap="round" />
        <path d="M28.5 8 L26 9.5" stroke={fg} strokeWidth="2" strokeLinecap="round" />
        <path
          d="M11 13 L11 9.5 Q11 8 12.5 8 Q14 8 14 9.5 L14 13 Q14.6 12.6 15.4 12.6 Q16.7 12.6 16.7 14 L16.7 17 Q17.5 13 19 13 Q20.5 13 20.5 14.5 L20.5 21 Q20.5 25 17 25.5 L13 25.5 Q9 25 8.5 21 L8 17 Q8 15.2 9.5 15.2 Q10.5 15.2 11 16 Z"
          fill={fg}
        />
        <rect x="20.6" y="11" width="2.7" height="6" rx="1.3" fill={fg} />
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
