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
  IcChevronDown,
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

function HeroPreview({ size = 'md' }: { size?: 'md' | 'lg' } = {}) {
  const lg = size === 'lg';
  return (
    <div
      className="relative aspect-[3/2] rounded-16 overflow-hidden flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000 80%)' }}
    >
      <div className="opacity-20 text-white">
        <IcCamera s={lg ? 88 : 72} w={1} />
      </div>
      <div className={`absolute ${lg ? 'top-4 left-4' : 'top-3 left-3'} flex items-center gap-[6px] bg-white/8 backdrop-blur-md border border-white/12 rounded-full ${lg ? 'px-[11px] py-[5px]' : 'px-[9px] py-1'}`}>
        <span className="w-[5px] h-[5px] rounded-full bg-ok pulse-dot" />
        <span className={`font-mono ${lg ? 'text-10' : 'text-9'} font-medium text-white tracking-wide3`}>EN VIVO</span>
      </div>
      <div className={`absolute ${lg ? 'top-4 right-4' : 'top-3 right-3'}`}>
        <span className={`font-mono ${lg ? 'text-10' : 'text-9'} text-white/40 tracking-wide1`}>42.331 / -71.028</span>
      </div>
      <div className={`absolute ${lg ? 'bottom-4 left-4 right-4' : 'bottom-3 left-3 right-3'} bg-black/70 backdrop-blur-lg border border-white/8 rounded-8 ${lg ? 'px-[18px] py-[13px]' : 'px-[14px] py-[10px]'}`}>
        <div className="flex justify-between items-start">
          <p className={`font-mono ${lg ? 'text-10' : 'text-9'} text-white/50 mb-1 tracking-wide3`}>TRADUCCIÓN · ASL → ES</p>
          <span className={`font-mono ${lg ? 'text-10' : 'text-9'} text-white/40`}>00:42</span>
        </div>
        <p className={`font-serif italic font-normal ${lg ? 'text-22' : 'text-17'} text-white`}>"H – E – L – L – O"</p>
      </div>
    </div>
  );
}

function Metric({ value, label, size = 'md' }: { value: string; label: string; size?: 'md' | 'lg' }) {
  const lg = size === 'lg';
  return (
    <div>
      <p className={`font-serif italic font-normal ${lg ? 'text-32' : 'text-28'} text-ink leading-none`} style={{ letterSpacing: '-0.02em' }}>{value}</p>
      <p className={`font-mono ${lg ? 'text-11' : 'text-10'} text-ink4 tracking-wide2 mt-[6px] uppercase`}>{label}</p>
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
    <div className="border-b border-border first:border-t">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center py-8 text-left"
        aria-expanded={open}
      >
        <span className="font-sans font-medium text-18 text-ink tracking-tight1">{q}</span>
        <span className={`flex text-ink4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <IcChevronDown s={18} />
        </span>
      </button>
      {open && (
        <p className="font-sans text-17 text-ink3 leading-[1.65] pb-8 pr-8 -mt-1">{a}</p>
      )}
    </div>
  );
}

function DemoSection() {
  const { toast } = useToast();
  return (
    <section className="px-12 pb-24">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 gap-24 mb-14 items-end">
          <div>
            <SectionLabel>·01 · DEMO</SectionLabel>
            <h2 className="font-sans text-56 font-semibold text-ink mt-4 tracking-tighter2 leading-[1.05]">
              Mira Signa <span className="font-serif italic font-normal">en acción</span>
            </h2>
          </div>
          <p className="font-sans text-18 text-ink2 leading-[1.6]">
            Observa cómo nuestra tecnología procesa gestos complejos y los convierte en texto o voz
            instantáneamente.
          </p>
        </div>

        <div
          className="relative w-full rounded-20 overflow-hidden bg-black flex items-center justify-center border border-border"
          style={{ aspectRatio: '21/9' }}
        >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000 80%)' }}
        >
          <button
            type="button"
            aria-label="Reproducir demo"
            onClick={() => toast({ title: 'Demo próximamente', description: 'El vídeo de demo estará disponible pronto.' })}
            className="w-[88px] h-[88px] rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform pl-1"
            style={{ boxShadow: '0 8px 32px rgba(255,255,255,0.15)' }}
          >
            <IcPlay s={26} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-7 pt-12" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
          <div className="h-[2px] bg-white/15 rounded-full mb-3 relative">
            <div className="absolute left-0 top-0 h-full bg-white rounded-full" style={{ width: '34%' }} />
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-12 text-white tracking-wide1">02:14</span>
            <span className="font-mono text-12 text-white/50 tracking-wide1">05:00</span>
          </div>
        </div>
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
      <section className="px-12 pt-[112px] pb-[96px]">
        <div className="max-w-[1440px] mx-auto grid gap-16 items-start" style={{ gridTemplateColumns: '620px 1fr' }}>
          <div>
            <div className="flex gap-2 mb-10">
              <Badge variant="dark">
                <IcSparkle s={12} w={1.7} /> IA Generativa
              </Badge>
              <Badge variant="outline">
                <IcCode s={12} w={1.7} /> Open Source
              </Badge>
            </div>
            <h1 className="font-sans text-[88px] font-semibold text-ink leading-[0.98] tracking-tightest mb-7">
              Rompiendo<br />
              barreras con{' '}
              <span className="font-serif italic font-normal">signa</span>
            </h1>
            <p className="font-sans text-20 text-ink2 leading-[1.55] mb-10 max-w-[560px]">
              Traducción del alfabeto de Lenguaje de Señas Americano (ASL) en tiempo real con visión
              computacional. Una herramienta para conectar mundos de forma fluida, accesible y sin
              intermediarios.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/app">
                <Button size="lg" variant="primary" iconRight={<IcArrowRight s={18} w={1.8} />}>
                  Comenzar ahora
                </Button>
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" icon={<IcGithub s={18} />}>
                  GitHub
                </Button>
              </a>
              <Button size="lg" variant="ghost" icon={<IcPlay s={13} />}>
                Ver demo
              </Button>
            </div>
            <div className="flex gap-12 mt-16 pt-8 border-t border-border">
              <Metric value="<100ms" label="Latencia" size="lg" />
              <Metric value="24 letras" label="Alfabeto A-Y" size="lg" />
              <Metric value="ASL" label="Señas estáticas" size="lg" />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-full max-w-[680px]">
              <HeroPreview size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Construido con */}
      <div className="px-12 py-6 border-t border-b border-border">
        <div className="max-w-[1440px] mx-auto flex items-center gap-8">
          <SectionLabel>Construido con</SectionLabel>
          {['React + TS', 'Spring Boot', 'FastAPI', 'TensorFlow', 'MediaPipe', 'Docker'].map((t, i, arr) => (
            <span key={t} className="flex items-center gap-8">
              <span className="font-mono font-medium text-13 text-ink2" style={{ letterSpacing: '-0.01em' }}>{t}</span>
              {i < arr.length - 1 && <span className="w-[3px] h-[3px] rounded-full bg-ink5 shrink-0" />}
            </span>
          ))}
        </div>
      </div>

      {/* Demo */}
      <div className="mt-4">
        <DemoSection />
      </div>

      {/* Capacidades */}
      <section className="px-12 pb-24">
        <div className="max-w-[1440px] mx-auto">
        <SectionLabel>·02 · Capacidades</SectionLabel>
        <h2 className="font-sans text-56 font-semibold text-ink mt-4 mb-14 tracking-tighter2 leading-[1.05] max-w-3xl">
          Tecnología discreta, <span className="font-serif italic font-normal">impacto profundo</span>
        </h2>
        <div className="grid grid-cols-3 border border-border rounded-16 overflow-hidden bg-surface">
          {features.map((f, i) => {
            const Icon = f.Icon;
            return (
              <div
                key={f.title}
                className={`p-10 ${i < 2 ? 'border-r border-border' : ''}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <Icon s={22} w={1.6} />
                  <span className="font-mono text-11 text-ink4 tracking-wide1">0{i + 1}</span>
                </div>
                <h3 className="font-sans text-22 font-semibold text-ink mb-3 tracking-tight1">
                  {f.title}
                </h3>
                <p className="font-sans text-15 text-ink3 leading-[1.6]">{f.desc}</p>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* Comunidad */}
      <section className="px-12 pb-[112px]">
        <div className="max-w-[1440px] mx-auto">
        <div
          className="bg-black text-white rounded-24 relative overflow-hidden"
          style={{ padding: '88px 80px' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at 80% 50%, black 0%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 80% 50%, black 0%, transparent 70%)',
            }}
          />
          <div className="relative max-w-[780px]">
            <Badge variant="outline_white" className="mb-7">
              ·03 · Comunidad
            </Badge>
            <h2 className="font-sans text-68 font-semibold text-white leading-[1.02] tracking-tighter2 mb-6">
              Construyamos el<br />
              <span className="font-serif italic font-normal">futuro juntos.</span>
            </h2>
            <p className="font-sans text-18 text-white/65 leading-[1.6] max-w-[640px] mb-10">
              Signa es código abierto. Creemos que la accesibilidad universal no debe tener dueños.
              Únete a desarrolladores y traductores para mejorar los modelos juntos.
            </p>
            <div className="flex gap-3">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="white" size="lg" icon={<IcUsers s={18} w={1.8} />}>
                  Unirme a la comunidad
                </Button>
              </a>
              <a href={`${GITHUB_URL}/Sign_Language_Translator`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline_white" size="lg" icon={<IcGithub s={18} />}>
                  Cómo contribuir
                </Button>
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-12 pt-8 pb-40">
        <div
          className="max-w-[1440px] mx-auto"
          style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '140px' }}
        >
          <div>
            <SectionLabel>·04 · Preguntas</SectionLabel>
            <h2 className="font-sans text-48 font-semibold text-ink mt-4 tracking-tighter2 leading-[1.05]">
              Preguntas <span className="font-serif italic font-normal">frecuentes</span>
            </h2>
          </div>
          <div>
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
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
        <SignaLogo size={32} />
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
          <SignaLogo size={32} />
        </div>
      </footer>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const links: [string, string][] = [
    ['/', 'Inicio'],
    ['/about', 'Sobre Signa'],
    ['/app', 'Probar el traductor'],
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
