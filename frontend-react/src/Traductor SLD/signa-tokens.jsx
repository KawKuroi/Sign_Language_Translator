// Signa Design Tokens & Shared Components — TRUE BLACK + EDITORIAL TYPE
// ──────────────────────────────────────────────────────────────────────

const T = {
  // Pure neutrals (no slate blue tint)
  bg:       '#FAFAFA',
  surface:  '#FFFFFF',
  surface2: '#F5F5F5',
  border:   '#EAEAEA',
  border2:  '#F4F4F4',
  ink:      '#0A0A0A',  // near-black text
  ink2:     '#404040',
  ink3:     '#737373',
  ink4:     '#A3A3A3',
  ink5:     '#D4D4D4',
  black:    '#000000',  // TRUE BLACK
  white:    '#FFFFFF',

  // Radii — tighter, more modern
  r4: 4, r6: 6, r8: 8, r12: 12, r16: 16, r20: 20, r24: 24, rFull: 9999,

  // Shadows — very subtle, matter the most when dark
  shadowSm: '0 1px 2px 0 rgba(0,0,0,0.04)',
  shadowMd: '0 2px 8px 0 rgba(0,0,0,0.06)',
  shadowLg: '0 8px 24px 0 rgba(0,0,0,0.08)',
  shadowXl: '0 24px 48px -12px rgba(0,0,0,0.18)',

  // Type stacks
  fontSerif: '"Instrument Serif", "Times New Roman", serif',
  fontSans:  '"Geist", "Inter", -apple-system, system-ui, sans-serif',
  fontMono:  '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
};

// ── Logo (uses MarkSigna from signa-icons.jsx) ────
function SignaLogo({ size = 28, dark = false, italic = true }) {
  const txt = dark ? '#FFFFFF' : T.ink;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <MarkSigna size={size} dark={dark} />
      <span style={{
        fontFamily: italic ? T.fontSerif : T.fontSans,
        fontStyle: italic ? 'italic' : 'normal',
        fontSize: italic ? size * 0.78 : size * 0.58,
        fontWeight: italic ? 400 : 600,
        color: txt, lineHeight: 1, letterSpacing: italic ? '-0.02em' : '-0.01em',
      }}>signa</span>
    </div>
  );
}

// ── Navbar Desktop ────────────────────────────
function NavDesktop({ activePage = 'landing', dark = false }) {
  const bg  = dark ? T.black : T.surface;
  const bdr = dark ? 'rgba(255,255,255,0.08)' : T.border;
  const link = dark ? 'rgba(255,255,255,0.6)' : T.ink3;
  const pages = [
    { id: 'landing', label: 'Producto' },
    { id: 'about',   label: 'Equipo' },
    { id: 'app',     label: 'Abrir App' },
  ];
  return (
    <nav style={{
      height: 64, backgroundColor: bg,
      borderBottom: `1px solid ${bdr}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', flexShrink: 0,
    }}>
      <SignaLogo dark={dark} />
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {pages.map(p => (
          <span key={p.id} style={{
            fontFamily: T.fontSans, fontSize: 13,
            fontWeight: activePage === p.id ? 600 : 500,
            color: activePage === p.id ? (dark ? '#fff' : T.ink) : link,
            cursor: 'pointer', letterSpacing: '-0.005em',
          }}>{p.label}</span>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: T.fontMono, fontSize: 11, color: link, letterSpacing: '0.04em' }}>v2.0</span>
        <button style={{
          height: 36, padding: '0 16px', borderRadius: T.r8,
          backgroundColor: dark ? T.white : T.black,
          color: dark ? T.black : T.white,
          fontFamily: T.fontSans, fontSize: 13, fontWeight: 600,
          border: 'none', cursor: 'pointer', letterSpacing: '-0.005em',
        }}>Empezar</button>
      </div>
    </nav>
  );
}

// ── Button ────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', icon, iconRight, style: sx = {} }) {
  const sizes = {
    sm: { h: 34, px: 14, fontSize: 13, gap: 6 },
    md: { h: 42, px: 18, fontSize: 14, gap: 8 },
    lg: { h: 52, px: 24, fontSize: 15, gap: 10 },
  };
  const s = sizes[size];
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: s.gap, height: s.h, padding: `0 ${s.px}px`,
    borderRadius: T.r8, cursor: 'pointer',
    fontFamily: T.fontSans, fontWeight: 600, fontSize: s.fontSize,
    letterSpacing: '-0.005em',
    whiteSpace: 'nowrap', border: 'none', flexShrink: 0,
    transition: 'all .15s',
  };
  const variants = {
    primary:       { backgroundColor: T.black, color: T.white },
    secondary:     { backgroundColor: T.surface, border: `1px solid ${T.border}`, color: T.ink },
    ghost:         { backgroundColor: 'transparent', color: T.ink2 },
    white:         { backgroundColor: T.white, color: T.black },
    outline_white: { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: T.white },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...sx }}>
      {icon && icon}
      {children}
      {iconRight && iconRight}
    </button>
  );
}

// ── Badge ─────────────────────────────────────
function Badge({ children, variant = 'dark' }) {
  const variants = {
    dark:          { bg: T.black,    color: T.white, border: 'none' },
    light:         { bg: T.surface2, color: T.ink2,  border: `1px solid ${T.border}` },
    mono:          { bg: T.surface,  color: T.ink3,  border: `1px solid ${T.border}` },
    outline_white: { bg: 'transparent', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' },
  };
  const v = variants[variant] || variants.dark;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      height: 24, padding: '0 10px', borderRadius: T.rFull,
      backgroundColor: v.bg, color: v.color, border: v.border,
      fontFamily: T.fontMono, fontWeight: 500, fontSize: 11,
      letterSpacing: '0.02em', whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// ── Card ──────────────────────────────────────
function Card({ children, style: sx = {}, padding = 24 }) {
  return (
    <div style={{
      backgroundColor: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: T.r16,
      padding,
      ...sx,
    }}>{children}</div>
  );
}

// ── Section Label (mono small caps) ────────
function SectionLabel({ children, color }) {
  return (
    <span style={{
      fontFamily: T.fontMono, fontWeight: 500, fontSize: 11,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      color: color || T.ink4,
    }}>{children}</span>
  );
}

function Divider() {
  return <div style={{ height: 1, width: '100%', backgroundColor: T.border, flexShrink: 0 }} />;
}

// ── Tech Badge ────────────────────────────────
function TechBadge({ name, mark }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      height: 34, padding: '0 14px',
      backgroundColor: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: T.r8,
    }}>
      {mark && <span style={{ display: 'flex', color: T.ink3 }}>{mark}</span>}
      <span style={{ fontFamily: T.fontMono, fontWeight: 500, fontSize: 12, color: T.ink, letterSpacing: '-0.01em' }}>{name}</span>
    </div>
  );
}

// ── FAQ Item ──────────────────────────────────
function FAQItem({ q, expanded = false }) {
  const [open, setOpen] = React.useState(expanded);
  const answers = {
    '¿Cómo funciona la traducción en tiempo real?': 'Signa usa MediaPipe para extraer 21 puntos clave de tu mano cuadro a cuadro. Esos landmarks se normalizan y se pasan a una red neuronal densa que los clasifica como una de 24 letras del alfabeto ASL en menos de 100 ms.',
    '¿Qué lenguaje de señas soporta?': 'Actualmente soporta el alfabeto del Lenguaje de Señas Americano (ASL): letras A a la Y. Las letras J y Z están excluidas porque requieren movimiento — no son señas estáticas. El soporte para LSM y palabras completas está en el roadmap.',
    '¿Es segura mi privacidad?': 'Tus frames de cámara viajan al backend solo durante la sesión activa y nunca se almacenan. El historial guarda únicamente el texto traducido, asociado a tu cuenta vía JWT. Sin terceros, sin trackers.',
    '¿Necesito hardware especial?': 'No. Signa funciona con cualquier cámara web estándar. Para resultados óptimos recomendamos buena iluminación frontal y una mano visible sobre fondo despejado.',
  };
  return (
    <div style={{ borderBottom: `1px solid ${T.border}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: T.fontSans, fontWeight: 500, fontSize: 16, color: T.ink,
        textAlign: 'left', letterSpacing: '-0.01em',
      }}>
        {q}
        <span style={{ color: T.ink4, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'flex' }}>
          <IcChevronDown s={16} />
        </span>
      </button>
      {open && (
        <p style={{
          fontFamily: T.fontSans, fontSize: 14, color: T.ink3,
          lineHeight: '23px', paddingBottom: 22, margin: 0, paddingRight: 32,
        }}>{answers[q]}</p>
      )}
    </div>
  );
}

// ── Footer Desktop ────────────────────────────
function FooterDesktop() {
  const cols = [
    { title: 'Producto', links: ['Traductor', 'Diccionario', 'Roadmap'] },
    { title: 'Recursos', links: ['Documentación', 'GitHub', 'Tutoriales'] },
    { title: 'Legal',    links: ['Licencia', 'Privacidad', 'Conducta'] },
  ];
  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, padding: '56px 40px 28px', backgroundColor: T.surface }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 48, gap: 64 }}>
        <div style={{ maxWidth: 320 }}>
          <SignaLogo />
          <p style={{ fontFamily: T.fontSans, fontSize: 14, color: T.ink3, marginTop: 16, lineHeight: '22px' }}>
            Traductor del alfabeto ASL en tiempo real. Proyecto open‑source dedicado a la inclusión mediante el uso ético y creativo de la inteligencia artificial.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 64 }}>
          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: T.fontMono, fontSize: 11, color: T.ink4, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.title}</p>
              {col.links.map(l => (
                <p key={l} style={{ fontFamily: T.fontSans, fontSize: 14, color: T.ink2, margin: '0 0 10px', cursor: 'pointer' }}>{l}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.ink4 }}>© 2024 SIGNA · MIT LICENSE</span>
        <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.ink4 }}>BUILT WITH ❤ FOR THE COMMUNITY</span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  T, SignaLogo, NavDesktop, Btn, Badge, Card, SectionLabel, Divider, TechBadge, FAQItem, FooterDesktop,
});
