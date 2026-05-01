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
  IcCode,
  IcEye,
  IcGithub,
  IcLock,
  IcMenu,
  IcPlay,
  IcSparkle,
  IcUsers,
} from '@/components/brand/icons';
import { useToast } from '@/components/ui/toast';
import { useIsMobile } from '@/hooks/use-media-query';
import { useState, type ReactNode } from 'react';

const GITHUB_URL = 'https://github.com/KawKuroi';

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
      <div className="absolute top-3 right-3">
        <span className="font-mono text-9 text-white/40 tracking-wide1">42.331 / -71.028</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-lg border border-white/8 rounded-8 px-[14px] py-[10px]">
        <div className="flex justify-between items-start">
          <p className="font-mono text-9 text-white/50 mb-1 tracking-wide3">TRADUCCIÓN · ASL → ES</p>
          <span className="font-mono text-9 text-white/40">00:42</span>
        </div>
        <p className="font-serif italic font-normal text-17 text-white">"H – E – L – L – O"</p>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif italic font-normal text-26 text-ink leading-none">{value}</p>
      <p className="font-mono text-10 text-ink4 tracking-wide2 mt-1 uppercase">{label}</p>
    </div>
  );
}

const features = [
  { Icon: IcBolt, title: 'Precisión Instantánea', desc: 'Algoritmos optimizados para capturar cada microgesto con exactitud sub-milimétrica.' },
  { Icon: IcLock, title: 'Privacidad por diseño', desc: 'Sin almacenar frames. Solo el texto traducido se guarda, autenticado por JWT. Sin terceros, sin trackers.' },
  { Icon: IcEye, title: 'Diseño Inclusivo', desc: 'Interfaz minimalista construida con la comunidad y para la comunidad.' },
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

function DemoSection() {
  const { toast } = useToast();
  return (
    <section className="px-20 pb-20">
      <div className="grid grid-cols-2 gap-20 mb-12 items-end">
        <div>
          <SectionLabel>·01 · DEMO</SectionLabel>
          <h2 className="font-sans text-48 font-semibold text-ink mt-3 tracking-tighter2 leading-[1.05]">
            Mira Signa <span className="font-serif italic font-normal">en acción</span>
          </h2>
        </div>
        <p className="font-sans text-16 text-ink2 leading-[1.6]">
          Observa cómo nuestra tecnología procesa gestos complejos y los convierte en texto o voz
          instantáneamente.
        </p>
      </div>

      <div
        className="relative w-full rounded-16 overflow-hidden bg-black flex items-center justify-center"
        style={{ aspectRatio: '16/9' }}
      >
        <button
          type="button"
          aria-label="Reproducir demo"
          onClick={() => toast({ title: 'Demo próximamente', description: 'El vídeo de demo estará disponible pronto.' })}
          className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
        >
          <IcPlay s={28} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
          <span className="font-mono text-11 text-white/60">02:14</span>
          <div className="flex-1 h-[2px] bg-white/10 relative rounded-full">
            <div className="absolute left-0 top-0 h-full bg-white/60 rounded-full" style={{ width: '44%' }} />
          </div>
          <span className="font-mono text-11 text-white/60">05:00</span>
        </div>
      </div>
    </section>
  );
}

function LandingDesktop() {
  return (
    <div className="bg-bg font-sans w-full">
      <NavDesktop />

      {/* Hero */}
      <section className="px-20 pt-24 pb-16">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex gap-2 mb-6">
              <Badge variant="dark">
                <IcSparkle s={11} w={1.7} /> IA Generativa
              </Badge>
              <Badge variant="outline">
                <IcCode s={11} w={1.7} /> Open Source
              </Badge>
            </div>
            <h1 className="font-sans text-72 font-semibold text-ink leading-[0.95] tracking-tightest mb-6">
              Rompiendo<br />
              barreras con<br />
              <span className="font-serif italic font-normal">signa</span>
            </h1>
            <p className="font-sans text-16 text-ink2 leading-[1.6] mb-8 max-w-md">
              Traducción del alfabeto de Lenguaje de Señas Americano (ASL) en tiempo real con visión
              computacional. Una herramienta para conectar mundos de forma fluida, accesible y sin
              intermediarios.
            </p>
            <div className="flex gap-3">
              <Link to="/app">
                <Button size="lg" variant="primary" iconRight={<IcArrowRight s={15} w={1.7} />}>
                  Comenzar ahora
                </Button>
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" icon={<IcGithub s={16} />}>
                  GitHub
                </Button>
              </a>
              <Button size="lg" variant="ghost" icon={<IcPlay s={11} />}>
                Ver demo
              </Button>
            </div>
          </div>
          <div>
            <HeroPreview />
          </div>
        </div>

        <Divider className="mt-14 mb-8" />
        <div className="flex items-center gap-12">
          <Metric value="<100ms" label="Latencia" />
          <Metric value="24 letras" label="Alfabeto A-Y" />
          <Metric value="ASL" label="Señas estáticas" />
        </div>
      </section>

      {/* Construido con */}
      <div className="px-20 py-5 border-t border-border flex items-center gap-5">
        <SectionLabel>Construido con</SectionLabel>
        <div className="flex items-center gap-4">
          {['React + TS', 'Spring Boot', 'FastAPI', 'TensorFlow', 'MediaPipe', 'Docker'].map((t, i, arr) => (
            <span key={t} className="flex items-center gap-4">
              <span className="font-sans font-semibold text-13 text-ink2">{t}</span>
              {i < arr.length - 1 && <span className="text-ink5">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Demo */}
      <div className="mt-4">
        <DemoSection />
      </div>

      {/* Capacidades */}
      <section className="px-20 pb-20">
        <SectionLabel>·02 · Capacidades</SectionLabel>
        <h2 className="font-sans text-48 font-semibold text-ink mt-3 mb-12 tracking-tighter2 leading-[1.05] max-w-2xl">
          Tecnología discreta, <span className="font-serif italic font-normal">impacto profundo</span>
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

      {/* Comunidad */}
      <section className="px-20 pb-20">
        <div
          className="bg-black text-white rounded-20 p-16 relative overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        >
          <Badge variant="outline_white" className="mb-6">
            ·03 · Comunidad
          </Badge>
          <h2 className="font-sans text-56 font-semibold text-white leading-[1.0] tracking-tighter2 mb-5">
            Construyamos el<br />
            <span className="font-serif italic font-normal">futuro juntos.</span>
          </h2>
          <p className="font-sans text-15 text-white/70 leading-[1.6] max-w-lg mb-7">
            Signa es código abierto. Creemos que la accesibilidad universal no debe tener dueños.
            Únete a desarrolladores y traductores para mejorar los modelos juntos.
          </p>
          <div className="flex gap-3">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="white" icon={<IcUsers s={15} w={1.6} />}>
                Unirme a la comunidad
              </Button>
            </a>
            <a href={`${GITHUB_URL}/Sign_Language_Translator`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline_white" icon={<IcGithub s={14} />}>
                Cómo contribuir
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-20 pb-24 grid grid-cols-2 gap-20">
        <div>
          <SectionLabel>·04 · Preguntas</SectionLabel>
          <h2 className="font-sans text-44 font-semibold text-ink mt-3 tracking-tighter2 leading-[1.05]">
            Preguntas<br />
            <span className="font-serif italic font-normal">frecuentes</span>
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
        <div className="flex gap-2 mb-5">
          <Badge variant="dark">
            <IcSparkle s={11} w={1.7} /> IA Generativa
          </Badge>
          <Badge variant="outline">
            <IcCode s={11} w={1.7} /> Open Source
          </Badge>
        </div>
        <h1 className="font-sans text-44 font-semibold text-ink leading-[0.98] tracking-tightest mt-3 mb-4">
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
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button size="lg" variant="secondary" icon={<IcGithub s={16} />} className="w-full">
              GitHub
            </Button>
          </a>
        </div>
        <Divider className="mt-8 mb-5" />
        <div className="flex gap-8">
          <Metric value="<100ms" label="Latencia" />
          <Metric value="24 letras" label="Alfabeto A-Y" />
          <Metric value="ASL" label="Señas estáticas" />
        </div>
      </section>

      <div className="mx-5 mb-9">
        <HeroPreview />
      </div>

      <section className="px-5 pb-9">
        <SectionLabel>·02 · Capacidades</SectionLabel>
        <h2 className="font-sans text-26 font-semibold text-ink mt-3 mb-5 tracking-tighter2 leading-[1.05]">
          Tecnología discreta,{' '}
          <span className="font-serif italic font-normal">impacto profundo</span>
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

      {/* Comunidad mobile */}
      <section className="px-5 pb-9">
        <div className="bg-black text-white rounded-16 p-7">
          <Badge variant="outline_white" className="mb-4">·03 · Comunidad</Badge>
          <h2 className="font-sans text-28 font-semibold text-white leading-[1.05] tracking-tighter2 mb-4">
            Construyamos el{' '}
            <span className="font-serif italic font-normal">futuro juntos.</span>
          </h2>
          <p className="font-sans text-13 text-white/70 leading-[1.5] mb-5">
            Signa es código abierto. Únete para mejorar los modelos juntos.
          </p>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="white" size="sm" icon={<IcGithub s={13} />} className="w-full">
              Ver en GitHub
            </Button>
          </a>
        </div>
      </section>

      <section className="px-5 pb-9">
        <SectionLabel>·04 · Preguntas</SectionLabel>
        <h2 className="font-sans text-26 font-semibold text-ink mt-3 mb-5 tracking-tighter2">
          Preguntas <span className="font-serif italic font-normal">frecuentes</span>
        </h2>
        <Card className="p-5">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </Card>
      </section>

      <footer className="bg-surface border-t border-border px-5 pt-7 pb-8 text-center">
        <div className="flex justify-center">
          <SignaLogo size={26} />
        </div>
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
