/* SVG illustrations for ASL static letters A–Y (no J/Z). */
import type { ReactElement, ReactNode } from 'react';

const ST = { stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

function W({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className="text-ink">
      {children}
    </svg>
  );
}

// A: closed fist, thumb alongside index (not over like S)
const SvgA = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="28" y="46" width="40" height="24" rx="7" {...ST} />
    <path d="M33 46 Q33 36 37 34 Q41 36 41 46" {...ST} />
    <path d="M41 46 Q41 33 46 31 Q51 33 51 46" {...ST} />
    <path d="M51 46 Q51 36 55 34 Q59 36 59 46" {...ST} />
    <path d="M59 46 Q59 40 62 38 Q65 40 65 46" {...ST} />
    <path d="M28 57 Q20 55 18 61 Q18 67 26 68 L28 68" {...ST} />
    <path d="M30 70 Q29 80 36 83 L60 83 Q67 80 66 70" {...ST} />
  </W>
);

// B: 4 fingers up together, thumb folded against palm
const SvgB = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="31" y="12" width="7" height="36" rx="3.5" {...ST} />
    <rect x="40" y="10" width="7" height="38" rx="3.5" {...ST} />
    <rect x="49" y="10" width="7" height="38" rx="3.5" {...ST} />
    <rect x="58" y="14" width="7" height="34" rx="3.5" {...ST} />
    <path d="M29 46 L67 46 Q67 60 61 62 L33 62 Q28 60 28 53 Z" {...ST} />
    <path d="M28 60 Q20 58 18 64 Q18 70 26 70 L28 70" {...ST} />
    <path d="M31 62 Q30 72 36 75 L60 75 Q66 72 65 62" {...ST} />
  </W>
);

// C: hand curved in open C shape
const SvgC = ({ size }: { size: number }) => (
  <W size={size}>
    <path d="M72 32 Q66 16 50 13 Q30 11 18 28 Q10 40 13 58 Q16 72 28 80 Q42 88 60 85 Q70 82 76 70" {...ST} strokeWidth={2} />
  </W>
);

// D: index up, other 3 fingers + thumb form ring below
const SvgD = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="27" y="10" width="8" height="44" rx="4" {...ST} />
    <path d="M35 52 Q44 66 58 60 Q70 52 66 40 Q60 30 48 32 Q38 34 35 44 Z" {...ST} />
    <path d="M33 72 Q32 82 38 85 L58 85 Q64 82 63 72" {...ST} />
  </W>
);

// E: all fingers bent tight, thumb tucked below
const SvgE = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="28" y="46" width="40" height="22" rx="7" {...ST} />
    <path d="M33 46 Q33 40 37 38 Q41 40 41 46" {...ST} />
    <path d="M41 46 Q41 38 46 36 Q51 38 51 46" {...ST} />
    <path d="M51 46 Q51 40 55 38 Q59 40 59 46" {...ST} />
    <path d="M59 46 Q59 42 62 40 Q65 42 65 46" {...ST} />
    <path d="M28 63 Q20 63 18 68 Q18 73 26 73 L28 73" {...ST} />
    <path d="M30 68 Q29 78 36 81 L60 81 Q67 78 66 68" {...ST} />
  </W>
);

// F: index+thumb form small ring, middle+ring+pinky extended up
const SvgF = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="42" y="10" width="7" height="36" rx="3.5" {...ST} />
    <rect x="51" y="10" width="7" height="36" rx="3.5" {...ST} />
    <rect x="60" y="14" width="7" height="32" rx="3.5" {...ST} />
    <path d="M28 46 L69 46 Q69 60 63 62 L32 62 Q27 60 27 53 Z" {...ST} />
    <path d="M28 44 Q21 50 24 58 Q28 64 35 62 Q42 58 39 50 Q36 42 28 44 Z" {...ST} />
    <path d="M30 62 Q29 72 35 75 L61 75 Q67 72 66 62" {...ST} />
  </W>
);

// G: index + thumb extended horizontally pointing left
const SvgG = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="15" y="37" width="40" height="7" rx="3.5" {...ST} />
    <rect x="15" y="49" width="34" height="7" rx="3.5" {...ST} />
    <rect x="53" y="35" width="18" height="30" rx="6" {...ST} />
    <path d="M55 65 Q54 75 59 78 L67 78 Q72 75 71 65" {...ST} />
  </W>
);

// H: index + middle pointing sideways together (horizontal)
const SvgH = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="15" y="35" width="44" height="7" rx="3.5" {...ST} />
    <rect x="15" y="45" width="44" height="7" rx="3.5" {...ST} />
    <rect x="57" y="33" width="16" height="32" rx="6" {...ST} />
    <path d="M58 65 Q57 75 62 78 L69 78 Q73 75 72 65" {...ST} />
  </W>
);

// I: only pinky extended up, rest closed
const SvgI = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="28" y="46" width="40" height="24" rx="7" {...ST} />
    <path d="M33 46 Q33 36 37 34 Q41 36 41 46" {...ST} />
    <path d="M41 46 Q41 33 46 31 Q51 33 51 46" {...ST} />
    <path d="M51 46 Q51 36 55 34 Q59 36 59 46" {...ST} />
    <rect x="60" y="14" width="7" height="34" rx="3.5" {...ST} />
    <path d="M28 57 Q20 55 18 61 Q18 67 26 68 L28 68" {...ST} />
    <path d="M30 70 Q29 80 36 83 L60 83 Q67 80 66 70" {...ST} />
  </W>
);

// K: index up, middle angled to meet thumb tip
const SvgK = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="29" y="10" width="7" height="38" rx="3.5" {...ST} />
    <path d="M44 48 L60 24" {...ST} strokeWidth={7} strokeLinecap="round" />
    <path d="M32 58 Q42 48 58 26" {...ST} strokeWidth={5} strokeLinecap="round" />
    <rect x="27" y="46" width="24" height="22" rx="7" {...ST} />
    <path d="M51 52 Q55 46 59 46 Q63 46 63 52" {...ST} />
    <path d="M29 68 Q28 78 35 81 L57 81 Q63 78 62 68" {...ST} />
  </W>
);

// L: index up + thumb horizontal (90° L-shape)
const SvgL = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="30" y="10" width="8" height="44" rx="4" {...ST} />
    <rect x="13" y="52" width="25" height="8" rx="4" {...ST} />
    <path d="M38 52 L66 52 Q66 66 60 68 L42 68 Q38 66 38 60 Z" {...ST} />
    <path d="M46 52 Q46 43 50 41 Q54 43 54 52" {...ST} />
    <path d="M54 52 Q54 43 58 41 Q62 43 62 52" {...ST} />
    <path d="M31 68 Q30 78 37 81 L59 81 Q65 78 64 68" {...ST} />
  </W>
);

// M: 3 fingers (index, middle, ring) bent over thumb
const SvgM = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="28" y="48" width="40" height="22" rx="7" {...ST} />
    <path d="M32 48 Q30 36 35 32 Q42 34 42 48" {...ST} />
    <path d="M42 48 Q40 32 46 28 Q52 30 52 48" {...ST} />
    <path d="M52 48 Q52 36 56 32 Q62 34 62 48" {...ST} />
    <path d="M62 48 Q62 42 65 40 Q67 42 67 48" {...ST} />
    <path d="M28 62 Q20 62 18 67 Q18 72 26 72 L28 72" {...ST} />
    <path d="M30 70 Q29 80 36 83 L60 83 Q67 80 66 70" {...ST} />
  </W>
);

// N: 2 fingers (index, middle) bent over thumb
const SvgN = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="28" y="48" width="40" height="22" rx="7" {...ST} />
    <path d="M32 48 Q30 36 36 32 Q43 34 43 48" {...ST} />
    <path d="M43 48 Q41 34 47 30 Q53 32 53 48" {...ST} />
    <path d="M53 48 Q53 40 57 38 Q61 40 61 48" {...ST} />
    <path d="M61 48 Q61 43 64 41 Q67 43 67 48" {...ST} />
    <path d="M28 62 Q20 62 18 67 Q18 72 26 72 L28 72" {...ST} />
    <path d="M30 70 Q29 80 36 83 L60 83 Q67 80 66 70" {...ST} />
  </W>
);

// O: all fingers curved to touch thumb, forming O
const SvgO = ({ size }: { size: number }) => (
  <W size={size}>
    <path d="M48 18 C34 18 22 30 22 46 C22 62 34 74 48 74 C62 74 74 62 74 46 C74 30 62 18 48 18Z" {...ST} />
    <path d="M48 30 C40 30 33 37 33 46 C33 55 40 62 48 62 C56 62 63 55 63 46 C63 37 56 30 48 30Z" {...ST} />
    <path d="M39 74 Q37 83 42 86 L54 86 Q59 83 57 74" {...ST} />
  </W>
);

// P: like K but hand/fingers pointing downward
const SvgP = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="44" y="10" width="8" height="26" rx="4" {...ST} />
    <rect x="27" y="36" width="30" height="22" rx="7" {...ST} />
    <rect x="32" y="56" width="7" height="28" rx="3.5" {...ST} />
    <path d="M48 58 L62 78" {...ST} strokeWidth={7} strokeLinecap="round" />
    <path d="M40 44 Q50 58 60 76" {...ST} strokeWidth={5} strokeLinecap="round" />
  </W>
);

// Q: like G but index+thumb pointing downward
const SvgQ = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="27" y="22" width="18" height="32" rx="6" {...ST} />
    <rect x="38" y="52" width="7" height="30" rx="3.5" {...ST} />
    <rect x="49" y="52" width="7" height="22" rx="3.5" {...ST} />
    <path d="M28 22 Q27 12 33 9 L41 9 Q46 12 45 22" {...ST} />
  </W>
);

// R: index + middle crossed
const SvgR = ({ size }: { size: number }) => (
  <W size={size}>
    <path d="M36 68 L50 14" {...ST} strokeWidth={8} strokeLinecap="round" />
    <path d="M46 68 L60 14" {...ST} strokeWidth={8} strokeLinecap="round" />
    <rect x="26" y="52" width="44" height="20" rx="7" {...ST} />
    <path d="M28 58 Q20 56 18 62 Q18 68 26 68 L28 68" {...ST} />
    <path d="M29 72 Q28 82 35 85 L61 85 Q67 82 67 72" {...ST} />
  </W>
);

// S: closed fist, thumb over all fingers (vs A: thumb at side)
const SvgS = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="28" y="46" width="40" height="24" rx="7" {...ST} />
    <path d="M33 46 Q33 36 37 34 Q41 36 41 46" {...ST} />
    <path d="M41 46 Q41 33 46 31 Q51 33 51 46" {...ST} />
    <path d="M51 46 Q51 36 55 34 Q59 36 59 46" {...ST} />
    <path d="M59 46 Q59 40 62 38 Q65 40 65 46" {...ST} />
    <path d="M26 46 Q22 39 28 35 Q38 31 54 33 Q62 35 66 42" {...ST} />
    <path d="M30 70 Q29 80 36 83 L60 83 Q67 80 66 70" {...ST} />
  </W>
);

// T: fist, thumb between index and middle
const SvgT = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="28" y="46" width="40" height="24" rx="7" {...ST} />
    <path d="M33 46 Q33 36 37 34 Q41 36 41 46" {...ST} />
    <path d="M41 46 Q41 33 46 31 Q51 33 51 46" {...ST} />
    <path d="M51 46 Q51 36 55 34 Q59 36 59 46" {...ST} />
    <path d="M59 46 Q59 40 62 38 Q65 40 65 46" {...ST} />
    <path d="M34 43 Q38 36 43 39" {...ST} strokeWidth={4} strokeLinecap="round" />
    <path d="M30 70 Q29 80 36 83 L60 83 Q67 80 66 70" {...ST} />
  </W>
);

// U: index + middle together pointing up (parallel)
const SvgU = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="35" y="12" width="7" height="36" rx="3.5" {...ST} />
    <rect x="44" y="12" width="7" height="36" rx="3.5" {...ST} />
    <path d="M28 46 L68 46 Q68 60 62 62 L34 62 Q28 60 28 53 Z" {...ST} />
    <path d="M53 46 Q53 38 57 36 Q61 38 61 46" {...ST} />
    <path d="M61 46 Q61 40 64 38 Q67 40 67 46" {...ST} />
    <path d="M28 60 Q20 58 18 63 Q18 68 26 68 L28 68" {...ST} />
    <path d="M30 62 Q29 72 35 75 L61 75 Q67 72 66 62" {...ST} />
  </W>
);

// V: index + middle spread apart in V
const SvgV = ({ size }: { size: number }) => (
  <W size={size}>
    <path d="M40 64 L30 14" {...ST} strokeWidth={8} strokeLinecap="round" />
    <path d="M52 64 L62 14" {...ST} strokeWidth={8} strokeLinecap="round" />
    <path d="M26 56 L70 56 Q70 68 64 70 L32 70 Q26 68 26 62 Z" {...ST} />
    <path d="M56 56 Q56 48 60 46 Q64 48 64 56" {...ST} />
    <path d="M64 56 Q64 50 67 48 Q70 50 70 56" {...ST} />
    <path d="M26 64 Q18 62 16 67 Q16 72 24 72 L26 72" {...ST} />
    <path d="M28 70 Q27 80 33 83 L63 83 Q69 80 68 70" {...ST} />
  </W>
);

// W: index + middle + ring spread in W
const SvgW = ({ size }: { size: number }) => (
  <W size={size}>
    <path d="M36 60 L26 14" {...ST} strokeWidth={8} strokeLinecap="round" />
    <path d="M48 58 L48 12" {...ST} strokeWidth={8} strokeLinecap="round" />
    <path d="M60 60 L70 14" {...ST} strokeWidth={8} strokeLinecap="round" />
    <path d="M20 52 L76 52 Q76 66 70 68 L26 68 Q20 66 20 60 Z" {...ST} />
    <path d="M66 52 Q66 44 70 42 Q74 44 74 52" {...ST} />
    <path d="M20 62 Q13 60 11 66 Q11 71 18 71 L20 71" {...ST} />
    <path d="M23 68 Q22 78 28 81 L68 81 Q74 78 73 68" {...ST} />
  </W>
);

// X: index hooked/bent like a hook, others closed
const SvgX = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="28" y="48" width="40" height="22" rx="7" {...ST} />
    <path d="M41 48 Q41 36 46 34 Q51 36 51 48" {...ST} />
    <path d="M51 48 Q51 40 55 38 Q59 40 59 48" {...ST} />
    <path d="M59 48 Q59 42 62 40 Q65 42 65 48" {...ST} />
    <path d="M31 48 Q29 36 33 28 Q41 24 44 34 Q47 42 41 48" {...ST} />
    <path d="M28 58 Q20 56 18 62 Q18 68 26 68 L28 68" {...ST} />
    <path d="M30 70 Q29 80 36 83 L60 83 Q67 80 66 70" {...ST} />
  </W>
);

// Y: thumb + pinky extended (shaka), middle 3 closed
const SvgY = ({ size }: { size: number }) => (
  <W size={size}>
    <rect x="28" y="46" width="40" height="24" rx="7" {...ST} />
    <path d="M33 46 Q33 36 37 34 Q41 36 41 46" {...ST} />
    <path d="M41 46 Q41 33 46 31 Q51 33 51 46" {...ST} />
    <path d="M51 46 Q51 36 55 34 Q59 36 59 46" {...ST} />
    <path d="M28 54 Q18 48 12 52 Q8 58 14 64 Q18 68 26 66 L28 64" {...ST} />
    <rect x="60" y="14" width="8" height="34" rx="4" {...ST} />
    <path d="M30 70 Q29 80 36 83 L60 83 Q67 80 66 70" {...ST} />
  </W>
);

const SVG_MAP: Record<string, (size: number) => ReactElement> = {
  A: (s) => <SvgA size={s} />,
  B: (s) => <SvgB size={s} />,
  C: (s) => <SvgC size={s} />,
  D: (s) => <SvgD size={s} />,
  E: (s) => <SvgE size={s} />,
  F: (s) => <SvgF size={s} />,
  G: (s) => <SvgG size={s} />,
  H: (s) => <SvgH size={s} />,
  I: (s) => <SvgI size={s} />,
  K: (s) => <SvgK size={s} />,
  L: (s) => <SvgL size={s} />,
  M: (s) => <SvgM size={s} />,
  N: (s) => <SvgN size={s} />,
  O: (s) => <SvgO size={s} />,
  P: (s) => <SvgP size={s} />,
  Q: (s) => <SvgQ size={s} />,
  R: (s) => <SvgR size={s} />,
  S: (s) => <SvgS size={s} />,
  T: (s) => <SvgT size={s} />,
  U: (s) => <SvgU size={s} />,
  V: (s) => <SvgV size={s} />,
  W: (s) => <SvgW size={s} />,
  X: (s) => <SvgX size={s} />,
  Y: (s) => <SvgY size={s} />,
};

export function AslLetterSvg({ letter, size = 80 }: { letter: string; size?: number }) {
  const render = SVG_MAP[letter];
  return render ? render(size) : null;
}
