// Signa — Custom Icon Library
// Stroke: 1.5px · viewBox 24x24 · rounded caps · geometric
// ──────────────────────────────────────────────────────────

const I = (size = 18, sw = 1.5) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round',
});

// ── Brand mark — Signa logomark (ASL "I Love You" hand + motion lines) ──
function MarkSigna({ size = 32, dark = false }) {
  const bg = dark ? '#FFFFFF' : '#000000';
  const fg = dark ? '#000000' : '#FFFFFF';
  const r  = Math.max(5, size * 0.22);
  return (
    <div style={{
      width: size, height: size, borderRadius: r,
      backgroundColor: bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        {/* Motion lines — left side */}
        <path d="M2 12 L6 13"   stroke={fg} strokeWidth="2"   strokeLinecap="round"/>
        <path d="M2 16 L7 16"   stroke={fg} strokeWidth="2"   strokeLinecap="round"/>
        <path d="M2 20 L6 19"   stroke={fg} strokeWidth="2"   strokeLinecap="round"/>

        {/* Motion sparks — top right */}
        <path d="M26 4 L24 7"   stroke={fg} strokeWidth="2"   strokeLinecap="round"/>
        <path d="M28.5 8 L26 9.5" stroke={fg} strokeWidth="2" strokeLinecap="round"/>

        {/* Hand — closed palm body */}
        <path
          d="M11 13
             L11 9.5
             Q11 8 12.5 8
             Q14 8 14 9.5
             L14 13
             Q14.6 12.6 15.4 12.6
             Q16.7 12.6 16.7 14
             L16.7 17
             Q17.5 13 19 13
             Q20.5 13 20.5 14.5
             L20.5 21
             Q20.5 25 17 25.5
             L13 25.5
             Q9 25 8.5 21
             L8 17
             Q8 15.2 9.5 15.2
             Q10.5 15.2 11 16
             Z"
          fill={fg}
        />
        {/* Pinky — extended up */}
        <rect x="20.6" y="11" width="2.7" height="6" rx="1.3" fill={fg} />
      </svg>
    </div>
  );
}

// ── Wordmark ──────────────────────────────
function SignaWordmark({ size = 32, dark = false, showName = true, lockup = 'horizontal' }) {
  const txt = dark ? '#FFFFFF' : '#0A0A0A';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      flexDirection: lockup === 'horizontal' ? 'row' : 'column',
    }}>
      <MarkSigna size={size} dark={dark} />
      {showName && (
        <span style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: size * 0.62, fontWeight: 400,
          color: txt, lineHeight: 1, letterSpacing: '-0.02em',
          fontStyle: 'italic',
        }}>signa</span>
      )}
    </div>
  );
}

// ── Icons (custom) ────────────────────────
const Translator = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M3 6h7M6.5 4v2"/>
    <path d="M4 11s1.5-3 2.5-3 2.5 3 2.5 3"/>
    <path d="M11 15h10M11 19h7"/>
    <path d="M14 9l3 3 3-3"/>
  </svg>
);

const History = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M3 12a9 9 0 1 0 3-6.7"/>
    <path d="M3 4v4h4"/>
    <path d="M12 8v4l2.5 2.5"/>
  </svg>
);

const Dictionary = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4z"/>
    <path d="M5 18a2 2 0 0 1 2-2h11"/>
    <path d="M9 8h6M9 11h4"/>
  </svg>
);

const Settings = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M4 6h10M18 6h2"/>
    <path d="M4 12h2M10 12h10"/>
    <path d="M4 18h12M20 18h0"/>
    <circle cx="16" cy="6" r="2"/>
    <circle cx="8" cy="12" r="2"/>
    <circle cx="18" cy="18" r="2"/>
  </svg>
);

const Bell = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/>
    <path d="M10 19a2 2 0 0 0 4 0"/>
  </svg>
);

const Help = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-1 .4-1 1.2-1 1.7"/>
    <circle cx="12" cy="16.5" r=".6" fill="currentColor"/>
  </svg>
);

const Github = ({ s = 18, w = 0 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5.02 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/>
  </svg>
);

const Users = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <circle cx="9" cy="9" r="3"/>
    <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
    <circle cx="17" cy="7" r="2.5"/>
    <path d="M16 13c2.5 0 5 1.8 5 5"/>
  </svg>
);

const Bolt = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"/>
  </svg>
);

const Lock = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <rect x="4" y="11" width="16" height="10" rx="2"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
  </svg>
);

const Eye = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const Camera = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M4 7h3l2-2h6l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/>
    <circle cx="12" cy="13" r="3.5"/>
  </svg>
);

const CameraOff = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M4 7h3l2-2h6l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/>
    <circle cx="12" cy="13" r="3.5"/>
    <path d="M3 3l18 18"/>
  </svg>
);

const Copy = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <rect x="9" y="9" width="12" height="12" rx="2"/>
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>
  </svg>
);

const Send = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M21 3L3 11l8 2 2 8 8-18z"/>
    <path d="M11 13l4-4"/>
  </svg>
);

const Play = ({ s = 18, w = 0 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 4l14 8-14 8V4z"/>
  </svg>
);

const Code = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>
  </svg>
);

const Link = ({ s = 18, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/>
    <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/>
  </svg>
);

const ChevronDown = ({ s = 14, w = 1.6 }) => (
  <svg {...I(s, w)}><path d="M6 9l6 6 6-6"/></svg>
);

const ChevronRight = ({ s = 14, w = 1.6 }) => (
  <svg {...I(s, w)}><path d="M9 6l6 6-6 6"/></svg>
);

const ArrowRight = ({ s = 16, w = 1.6 }) => (
  <svg {...I(s, w)}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);

const ArrowUpRight = ({ s = 14, w = 1.6 }) => (
  <svg {...I(s, w)}><path d="M7 17L17 7M9 7h8v8"/></svg>
);

const Sparkle = ({ s = 14, w = 1.6 }) => (
  <svg {...I(s, w)}>
    <path d="M12 3l1.5 5L18 9.5 13.5 11 12 16l-1.5-5L6 9.5 10.5 8 12 3z"/>
    <path d="M19 17l.7 2 2 .7-2 .8-.7 2-.7-2-2-.8 2-.7.7-2z"/>
  </svg>
);

const Menu = ({ s = 18, w = 1.6 }) => (
  <svg {...I(s, w)}><path d="M3 6h18M3 12h18M3 18h18"/></svg>
);

const User = ({ s = 16, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <circle cx="12" cy="9" r="3.5"/>
    <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>
  </svg>
);

const Globe = ({ s = 16, w = 1.5 }) => (
  <svg {...I(s, w)}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
  </svg>
);

const Check = ({ s = 14, w = 1.7 }) => (
  <svg {...I(s, w)}><path d="M4 12l5 5L20 6"/></svg>
);

const Plus = ({ s = 14, w = 1.6 }) => (
  <svg {...I(s, w)}><path d="M12 4v16M4 12h16"/></svg>
);

Object.assign(window, {
  MarkSigna, SignaWordmark,
  IcTranslator: Translator, IcHistory: History, IcDictionary: Dictionary, IcSettings: Settings,
  IcBell: Bell, IcHelp: Help, IcGithub: Github, IcUsers: Users,
  IcBolt: Bolt, IcLock: Lock, IcEye: Eye,
  IcCamera: Camera, IcCameraOff: CameraOff, IcCopy: Copy, IcSend: Send, IcPlay: Play,
  IcCode: Code, IcLink: Link, IcChevronDown: ChevronDown, IcChevronRight: ChevronRight,
  IcArrowRight: ArrowRight, IcArrowUpRight: ArrowUpRight, IcSparkle: Sparkle,
  IcMenu: Menu, IcUser: User, IcGlobe: Globe, IcCheck: Check, IcPlus: Plus,
});
