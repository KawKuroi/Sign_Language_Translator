/* SVG illustrations for ASL static letters (A–Y, no J/Z).
   6 detailed designs (A, B, C, L, O, V) + fallback for the rest. */

const STROKE = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function SvgWrapper({ children, size }: { children: React.ReactNode; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-ink"
    >
      {children}
    </svg>
  );
}

// A — closed fist, thumb at side
const SvgA = ({ size }: { size: number }) => (
  <SvgWrapper size={size}>
    <rect x="30" y="36" width="36" height="28" rx="6" {...STROKE} />
    <path d="M30 44h-6a4 4 0 0 0 0 8h6" {...STROKE} />
    <path d="M34 36v-6a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v6" {...STROKE} />
    <path d="M42 36v-8a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v8" {...STROKE} />
    <path d="M50 36v-6a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v6" {...STROKE} />
    <path d="M58 36v-4a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v8" {...STROKE} />
  </SvgWrapper>
);

// B — flat open hand, fingers together, thumb across palm
const SvgB = ({ size }: { size: number }) => (
  <SvgWrapper size={size}>
    <path d="M34 64V28a4 4 0 0 1 8 0v36" {...STROKE} />
    <path d="M42 64V28a4 4 0 0 1 8 0v36" {...STROKE} />
    <path d="M50 64V28a4 4 0 0 1 8 0v36" {...STROKE} />
    <path d="M58 64V32a4 4 0 0 1 8 0v32" {...STROKE} />
    <path d="M34 64h32a0 0 0 0 1 0 0" {...STROKE} />
    <path d="M34 58h-8a4 4 0 0 1 0-8h8" {...STROKE} />
  </SvgWrapper>
);

// C — curved C shape
const SvgC = ({ size }: { size: number }) => (
  <SvgWrapper size={size}>
    <path d="M68 34a24 24 0 1 0 0 28" {...STROKE} strokeWidth={2} />
  </SvgWrapper>
);

// L — index up, thumb out
const SvgL = ({ size }: { size: number }) => (
  <SvgWrapper size={size}>
    {/* vertical index finger */}
    <rect x="44" y="20" width="10" height="46" rx="5" {...STROKE} />
    {/* horizontal thumb */}
    <rect x="20" y="56" width="30" height="10" rx="5" {...STROKE} />
    {/* palm/joint */}
    <path d="M44 66h6v0" {...STROKE} />
  </SvgWrapper>
);

// O — all fingers curved to thumb forming circle
const SvgO = ({ size }: { size: number }) => (
  <SvgWrapper size={size}>
    <path
      d="M48 24 C36 24 28 32 28 44 C28 56 36 64 48 64 C60 64 68 56 68 44 C68 32 60 24 48 24Z"
      {...STROKE}
    />
    <path
      d="M48 34 C42 34 38 38 38 44 C38 50 42 54 48 54 C54 54 58 50 58 44 C58 38 54 34 48 34Z"
      {...STROKE}
    />
  </SvgWrapper>
);

// V — index and middle spread
const SvgV = ({ size }: { size: number }) => (
  <SvgWrapper size={size}>
    {/* index going left-up */}
    <path d="M48 66 L38 26" {...STROKE} strokeWidth={9} strokeLinecap="round" />
    {/* middle going right-up */}
    <path d="M48 66 L58 26" {...STROKE} strokeWidth={9} strokeLinecap="round" />
    {/* soften overlap */}
    <rect x="38" y="60" width="20" height="10" rx="5" fill="white" />
    <path d="M38 66 Q48 72 58 66" {...STROKE} />
  </SvgWrapper>
);

// Generic fallback: shows the letter large in serif italic
function SvgFallback({ letter, size }: { letter: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* simplified hand outline */}
      <rect x="28" y="38" width="40" height="30" rx="8" stroke="currentColor" strokeWidth={1.5} />
      <path d="M36 38V28a4 4 0 0 1 8 0v10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M44 38V24a4 4 0 0 1 8 0v14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M52 38V28a4 4 0 0 1 8 0v10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M28 46h-6a3 3 0 0 0 0 6h6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      {/* letter overlay */}
      <text
        x="48"
        y="55"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Instrument Serif', serif"
        fontStyle="italic"
        fontSize="20"
        fill="currentColor"
        opacity={0.35}
      >
        {letter}
      </text>
    </svg>
  );
}

const SVG_MAP: Record<string, (size: number) => React.ReactElement> = {
  A: (s) => <SvgA size={s} />,
  B: (s) => <SvgB size={s} />,
  C: (s) => <SvgC size={s} />,
  L: (s) => <SvgL size={s} />,
  O: (s) => <SvgO size={s} />,
  V: (s) => <SvgV size={s} />,
};

export function AslLetterSvg({ letter, size = 80 }: { letter: string; size?: number }) {
  const render = SVG_MAP[letter];
  return render ? render(size) : <SvgFallback letter={letter} size={size} />;
}
