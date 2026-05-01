import type { SVGProps } from 'react';

interface IcProps extends SVGProps<SVGSVGElement> {
  s?: number;
  w?: number;
}

const stroke = (s: number, w: number) =>
  ({
    width: s,
    height: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: w,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }) as const;

export const IcTranslator = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M3 6h7M6.5 4v2" />
    <path d="M4 11s1.5-3 2.5-3 2.5 3 2.5 3" />
    <path d="M11 15h10M11 19h7" />
    <path d="M14 9l3 3 3-3" />
  </svg>
);

export const IcHistory = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v4h4" />
    <path d="M12 8v4l2.5 2.5" />
  </svg>
);

export const IcDictionary = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4z" />
    <path d="M5 18a2 2 0 0 1 2-2h11" />
    <path d="M9 8h6M9 11h4" />
  </svg>
);

export const IcSettings = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M4 6h10M18 6h2" />
    <path d="M4 12h2M10 12h10" />
    <path d="M4 18h12M20 18h0" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="8" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

export const IcBell = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const IcHelp = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-1 .4-1 1.2-1 1.7" />
    <circle cx="12" cy="16.5" r=".6" fill="currentColor" stroke="none" />
  </svg>
);

export const IcGithub = ({ s = 18, ...rest }: IcProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" {...rest}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5.02 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

export const IcUsers = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <circle cx="9" cy="9" r="3" />
    <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="7" r="2.5" />
    <path d="M16 13c2.5 0 5 1.8 5 5" />
  </svg>
);

export const IcBolt = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
  </svg>
);

export const IcLock = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IcEye = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IcCamera = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M4 7h3l2-2h6l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export const IcCameraOff = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M4 7h3l2-2h6l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13" r="3.5" />
    <path d="M3 3l18 18" />
  </svg>
);

export const IcCopy = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);

export const IcSend = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M21 3L3 11l8 2 2 8 8-18z" />
    <path d="M11 13l4-4" />
  </svg>
);

export const IcPlay = ({ s = 18, ...rest }: IcProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" {...rest}>
    <path d="M6 4l14 8-14 8V4z" />
  </svg>
);

export const IcCode = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
  </svg>
);

export const IcLink = ({ s = 18, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1" />
  </svg>
);

export const IcChevronDown = ({ s = 14, w = 1.6, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IcChevronRight = ({ s = 14, w = 1.6, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const IcArrowRight = ({ s = 16, w = 1.6, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IcArrowUpRight = ({ s = 14, w = 1.6, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const IcSparkle = ({ s = 14, w = 1.6, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M12 3l1.5 5L18 9.5 13.5 11 12 16l-1.5-5L6 9.5 10.5 8 12 3z" />
    <path d="M19 17l.7 2 2 .7-2 .8-.7 2-.7-2-2-.8 2-.7.7-2z" />
  </svg>
);

export const IcMenu = ({ s = 18, w = 1.6, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IcUser = ({ s = 16, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <circle cx="12" cy="9" r="3.5" />
    <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
  </svg>
);

export const IcGlobe = ({ s = 16, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);

export const IcCheck = ({ s = 14, w = 1.7, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M4 12l5 5L20 6" />
  </svg>
);

export const IcPlus = ({ s = 14, w = 1.6, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const IcLogout = ({ s = 16, w = 1.5, ...rest }: IcProps) => (
  <svg {...stroke(s, w)} {...rest}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

