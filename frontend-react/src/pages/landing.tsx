import { Link } from 'react-router-dom';
import { NavDesktop } from '@/components/layout/nav-desktop';
import { FooterDesktop } from '@/components/layout/footer-desktop';
import { SignaLogo } from '@/components/brand/signa-logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { Divider } from '@/components/ui/divider';
import {
  IcArrowRight,
  IcBolt,
  IcCamera,
  IcEye,
  IcLock,
  IcMenu,
  IcPlay,
  IcSparkle,
} from '@/components/brand/icons';
import { useIsMobile } from '@/hooks/use-media-query';
import { useState, type ReactNode } from 'react';

function HeroPreview() {
  return (
    <div
      className="relative aspect-[4/3] rounded-16 overflow-hidden flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000 80%)' }}
    >
      <div className="opacity-20 text-white">
        <IcCamera s={72} w={1} />
      </div>
      <div className="absolute top-3 left-3 flex items-center gap-[6px] bg-white/8 backdrop-blur-md border border-white/12 rounded-full px-[9px] py-1">
        <span className="w-[5px] h-[5px] rounded-full bg-ok pulse-dot" />
        <span className="font-mono text-9 font-medium text-white tracking-wide3">EN VIVO</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-lg border border-white/8 rounded-8 px-[14px] py-[10px]">
        <p className="font-mono text-9 text-white/50 mb-1 tracking-wide3">TRADUCCIÓN · ASL → ES</p>
        <p className="font-serif italic font-normal text-17 text-white">"H – E – L – L – O"</p>
      </div>
    </div>
  );
}

const features = [
  { Icon: IcBolt, title: 'Precisión Instantánea', desc: 'MediaPipe extrae 21 puntos clave por mano cuadro a cuadro, con inferencia en menos de 100 ms.' },
  { Icon: IcLock, title: 'Privacidad Total', desc: 'Los frames se descartan tras la inferencia. Solo el texto traducido se guarda.' },
  { Icon: IcEye, title: 'Diseño Inclusivo', desc: 'Pensado para acortar la distancia entre la comunidad sorda y los oyentes.' },
];

const stack = [
  { tag: 'Frontend', stack: 'React + TypeScript', desc: 'Cliente que captura los frames y muestra la transcripción en vivo.' },
  { tag: 'Gateway', stack: 'Spring Boot · Java', desc: 'API gateway con auth JWT, gestión de usuarios y persistencia del historial.' },
  { tag: 'AI Service', stack: 'FastAPI · Python', desc: 'Inferencia con MediaPipe + red neuronal densa entrenada sobre 24 letras del ASL.' },
];

const faqs = [
  {
    q: '¿Cómo funciona la traducción en tiempo real?',
    a: 'Signa usa MediaPipe para extraer 21 puntos clave de tu mano cuadro a cuadro. Esos landmarks se normalizan y se pasan a una red neuronal densa que los clasifica como una de 24 letras del alfabeto ASL en menos de 100 ms.',
  },
  {
    q: '¿Qué lenguaje de señas soporta?',
    a: 'Actualmente soporta el alfabeto del Lenguaje de Señas Americano (ASL): letras A a la Y. Las letras J y Z están excluidas porque requieren movimiento — no son señas estáticas.',
  },
  {
    q: '¿Es segura mi privacidad?',
    a: 'Tus frames de cámara viajan al backend solo durante la sesión activa y nunca se almacenan. El historial guarda únicamente el texto traducido, asociado a tu cuenta vía JWT.',
  },
  {
    q: '¿Necesito hardware especial?',
    a: 'No. Signa funciona con cualquier cámara web estándar. Para resultados óptimos recomendamos buena iluminación frontal y una mano visible sobre fondo despejado.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center py-[22px] text-left"
        aria-expanded={open}
      >
        <span className="font-sans font-medium text-16 text-ink tracking-tight1">{q}</span>
        <span className={open ? 'rotate-180 transition-transform text-ink4' : 'transition-transform text-ink4'}>▾</span>
      </button>
      {open && (
        <p className="font-sans text-14 text-ink3 leading-[23px] pb-[22px] pr-8">{a}</p>
      )}
    </div>
  );
}

function LandingDesktop() {
  return (
    <div className="bg-bg font-sans w-full">
      <NavDesktop />

      <section className="px-20 pt-24 pb-20">
        <div className="grid grid-cols-2 gap-20 items-end">
          <div>
            <Badge variant="dark" className="mb-6">
              <IcSparkle s={11} w={1.7} /> IA Generativa
            </Badge>
            <h1 className="font-sans text-80 font-semibold text-ink leading-[0.95] tracking-tightest">
              Rompiendo barreras<br />
              con <span className="font-serif italic font-normal">signa</span>
            </h1>
          </div>
          <div>
            <p className="font-sans text-17 text-ink2 leading-[1.6] mb-8 max-w-md">
              Traducción del alfabeto del Lenguaje de Señas Americano en tiempo real con inteligencia
              artificial. Open-source, accesible y diseñado para la comunidad.
            </p>
            <div className="flex gap-3">
              <Link to="/app">
                <Button size="lg" variant="primary" iconRight={<IcArrowRight s={15} w={1.7} />}>
                  Comenzar ahora
                </Button>
              </Link>
              <Button size="lg" variant="secondary" icon={<IcPlay s={11} />}>
                Ver demo
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
          <HeroPreview />
        </div>
      </section>

      <section className="px-20 pb-20">
        <SectionLabel>·01 · Capacidades</SectionLabel>
        <h2 className="font-sans text-48 font-semibold text-ink mt-3 mb-12 tracking-tighter2 leading-[1.05] max-w-2xl">
          Por qué <span className="font-serif italic font-normal">Signa</span>
        </h2>
        <div className="grid grid-cols-3 border border-border rounded-16 overflow-hidden bg-surface">
          {features.map((f, i) => {
            const Icon = f.Icon;
            return (
              <div
                key={f.title}
                className={`p-9 ${i < 2 ? 'border-r border-border' : ''}`}
              >
                <div className="flex items-center justify-between mb-7">
                  <Icon s={20} w={1.6} />
                  <span className="font-mono text-10 text-ink4 tracking-wide1">0{i + 1}</span>
                </div>
                <h3 className="font-sans text-20 font-semibold text-ink mb-2 tracking-tight1">
                  {f.title}
                </h3>
                <p className="font-sans text-14 text-ink3 leading-[1.6]">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-20 pb-20">
        <SectionLabel>·02 · Cómo funciona</SectionLabel>
        <h2 className="font-sans text-48 font-semibold text-ink mt-3 mb-12 tracking-tighter2 leading-[1.05] max-w-2xl">
          Tres servicios, <span className="font-serif italic font-normal">una idea</span>
        </h2>
        <div className="grid grid-cols-3 border border-border rounded-16 overflow-hidden">
          {stack.map((s, i) => (
            <div
              key={s.tag}
              className={`p-9 bg-surface ${i < 2 ? 'border-r border-border' : ''}`}
            >
              <div className="flex items-center justify-between mb-7">
                <SectionLabel emphasized>{s.tag}</SectionLabel>
                <span className="font-mono text-10 text-ink4 tracking-wide1">0{i + 1}</span>
              </div>
              <h3 className="font-sans text-20 font-semibold text-ink mb-2 tracking-tight1">
                {s.stack}
              </h3>
              <p className="font-sans text-14 text-ink3 leading-[1.6]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-20 pb-24 grid grid-cols-2 gap-20">
        <div>
          <SectionLabel>·03 · Preguntas frecuentes</SectionLabel>
          <h2 className="font-sans text-44 font-semibold text-ink mt-3 tracking-tighter2 leading-[1.05]">
            Lo que probablemente te <span className="font-serif italic font-normal">preguntas</span>
          </h2>
        </div>
        <div>
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      <FooterDesktop />
    </div>
  );
}

function LandingMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-bg font-sans">
      <nav className="h-14 bg-surface border-b border-border flex items-center justify-between px-5 sticky top-0 z-10">
        <SignaLogo size={26} />
        <button
          type="button"
          aria-label="Menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="w-9 h-9 rounded-8 border border-border bg-transparent flex items-center justify-center text-ink"
        >
          <IcMenu s={16} w={1.6} />
        </button>
      </nav>

      {menuOpen && (
        <MobileMenu onClose={() => setMenuOpen(false)} />
      )}

      <section className="px-5 pt-9 pb-7">
        <Badge variant="dark">
          <IcSparkle s={11} w={1.7} /> IA Generativa
        </Badge>
        <h1 className="font-sans text-44 font-semibold text-ink leading-[0.98] tracking-tightest mt-5 mb-4">
          Rompiendo barreras con{' '}
          <span className="font-serif italic font-normal">signa</span>
        </h1>
        <p className="font-sans text-15 text-ink2 leading-[1.55] mb-7">
          Traducción de lengua de señas americana en tiempo real con inteligencia artificial.
        </p>
        <div className="flex flex-col gap-[10px]">
          <Link to="/app">
            <Button size="lg" variant="primary" iconRight={<IcArrowRight s={15} w={1.7} />} className="w-full">
              Comenzar ahora
            </Button>
          </Link>
          <Button size="lg" variant="secondary" icon={<IcPlay s={11} />} className="w-full">
            Ver demo
          </Button>
        </div>
      </section>

      <div className="mx-5 mb-9">
        <HeroPreview />
      </div>

      <section className="px-5 pb-9">
        <SectionLabel>·01 · Capacidades</SectionLabel>
        <h2 className="font-sans text-26 font-semibold text-ink mt-3 mb-5 tracking-tighter2 leading-[1.05]">
          Por qué <span className="font-serif italic font-normal">Signa</span>
        </h2>
        <Card className="p-0 overflow-hidden">
          {features.map((f, i) => {
            const Icon = f.Icon;
            return (
              <div
                key={f.title}
                className={`p-[18px] flex gap-[14px] items-start ${i < features.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="text-ink mt-[2px]">
                  <Icon s={18} w={1.6} />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-15 font-semibold text-ink mb-1 tracking-tight1">
                    {f.title}
                  </h3>
                  <p className="font-sans text-13 text-ink3 leading-[1.5]">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </Card>
      </section>

      <section className="px-5 pb-9">
        <SectionLabel>·02 · Preguntas</SectionLabel>
        <Card className="p-5 mt-3">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </Card>
      </section>

      <footer className="bg-surface border-t border-border px-5 pt-7 pb-8 text-center">
        <div className="flex justify-center">
          <SignaLogo size={26} />
        </div>
        <Divider className="my-5" />
        <p className="font-mono text-10 text-ink4 tracking-wide1">© 2024 SIGNA · MIT LICENSE</p>
      </footer>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const links: [string, string][] = [
    ['/', 'Producto'],
    ['/about', 'Equipo'],
    ['/app', 'Abrir App'],
    ['/login', 'Iniciar sesión'],
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} role="presentation">
      <div
        className="absolute top-14 right-4 left-4 bg-surface rounded-12 border border-border shadow-lg p-4 flex flex-col gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        {links.map(([to, label]) => (
          <Link
            key={to}
            to={to}
            onClick={onClose}
            className="font-sans text-15 text-ink py-3 px-3 rounded-8 hover:bg-surface2 tracking-tight05"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage(): ReactNode {
  const isMobile = useIsMobile();
  return isMobile ? <LandingMobile /> : <LandingDesktop />;
}
