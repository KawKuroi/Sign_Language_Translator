import { useState, type FormEvent, type ReactNode } from 'react';
import { NavDesktop } from '@/components/layout/nav-desktop';
import { FooterDesktop } from '@/components/layout/footer-desktop';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IcGithub, IcLink, IcSend } from '@/components/brand/icons';
import { useToast } from '@/components/ui/toast';
import { useIsMobile } from '@/hooks/use-media-query';
import { MobileHeader } from '@/components/layout/mobile-header';
import { MobileBottomNav } from '@/components/layout/mobile-bottomnav';

const GITHUB_URL = 'https://github.com/KawKuroi';

const GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
  backgroundSize: '36px 36px',
};

function Pill({
  children,
  href,
  dark = false,
  icon,
}: {
  children: ReactNode;
  href?: string;
  dark?: boolean;
  icon?: ReactNode;
}) {
  const cls = dark
    ? 'inline-flex items-center gap-[6px] px-3 py-[5px] rounded-full bg-white/10 border border-white/15 font-mono text-11 text-white/80 hover:bg-white/15 transition-colors'
    : 'inline-flex items-center gap-[6px] px-3 py-[5px] rounded-full bg-surface border border-border font-mono text-11 text-ink2 hover:bg-surface2 transition-colors';

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {icon}
        {children}
      </a>
    );
  }
  return <span className={cls}>{icon}{children}</span>;
}

const stackCards = [
  { tag: 'Frontend', stack: 'React + TypeScript', desc: 'Cliente que captura los frames de la cámara y muestra la transcripción en vivo.' },
  { tag: 'Gateway', stack: 'Spring Boot · Java', desc: 'API gateway con autenticación JWT, gestión de usuarios y persistencia del historial.' },
  { tag: 'AI Service', stack: 'FastAPI · Python', desc: 'Inferencia con MediaPipe + red neuronal densa entrenada sobre 24 letras del alfabeto ASL.' },
];

function ContactForm() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast({ title: 'Mensaje enviado', description: 'Gracias por escribir. Responderé pronto.', variant: 'success' });
      setName('');
      setEmail('');
      setMessage('');
      setSending(false);
    }, 600);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-16 p-7 flex flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-[6px]">
          <Label className="font-mono text-10 text-ink4 tracking-wide2 uppercase">Nombre</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan García"
            required
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <Label className="font-mono text-10 text-ink4 tracking-wide2 uppercase">Correo</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="juan@ejemplo.com"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-[6px]">
        <Label className="font-mono text-10 text-ink4 tracking-wide2 uppercase">Mensaje</Label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="¿Cómo podemos mejorar?"
          required
          rows={5}
          className="w-full rounded-8 border border-border bg-bg px-4 py-3 font-sans text-14 text-ink placeholder:text-ink4 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-1 resize-none"
        />
      </div>
      <div>
        <Button type="submit" variant="primary" icon={<IcSend s={13} w={1.6} />} disabled={sending}>
          {sending ? 'Enviando…' : 'Enviar mensaje'}
        </Button>
      </div>
    </form>
  );
}

function AboutDesktop() {
  return (
    <div className="bg-bg font-sans w-full">
      <NavDesktop />

      {/* Quién está detrás */}
      <section className="px-20 pt-20 pb-14 grid grid-cols-2 gap-16 items-end">
        <div>
          <SectionLabel>·01 · Quién está detrás</SectionLabel>
          <h1 className="font-sans text-72 font-semibold text-ink leading-[0.95] tracking-tightest mt-4">
            Un proyecto<br />
            <span className="font-serif italic font-normal">en solitario.</span>
          </h1>
        </div>
        <p className="font-sans text-16 text-ink2 leading-[1.65]">
          Signa nació como un experimento personal sobre cómo la IA puede acortar distancias.
          Lo construyo en mis horas libres, con Claude Code como copiloto, y con la convicción
          de que la accesibilidad no debería esperar a tener un equipo grande detrás.
        </p>
      </section>

      <Divider className="mx-20" />

      {/* El equipo */}
      <section className="px-20 py-14">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-sans text-22 font-semibold text-ink tracking-tight1">El equipo</h2>
          <SectionLabel>1 humano · 1 IA</SectionLabel>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Card humano */}
          <div className="bg-surface border border-border rounded-16 p-7 flex gap-7">
            <div className="w-[180px] h-[180px] rounded-12 bg-bg border border-border flex items-center justify-center relative shrink-0 overflow-hidden">
              <span className="font-serif italic text-[100px] text-ink leading-none select-none">k</span>
              <span className="absolute top-3 right-3 font-mono text-10 text-ink4">/01</span>
            </div>
            <div className="flex-1 min-w-0">
              <SectionLabel className="mb-2">Founder · Engineer · Designer</SectionLabel>
              <h3 className="font-sans text-26 font-semibold text-ink tracking-tight1">
                Kaw<span className="font-serif italic font-normal">Kuroi</span>
              </h3>
              <p className="font-mono text-11 text-ink4 mb-4">@kawkuroi</p>
              <p className="font-sans text-14 text-ink3 leading-[1.6] mb-5">
                Diseño, desarrollo y entreno los modelos. Cada decisión —desde la arquitectura
                de microservicios hasta el placement de un botón— pasa por mis manos.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Pill href={GITHUB_URL} icon={<IcGithub s={11} />}>
                  github.com/KawKuroi
                </Pill>
                <Pill href="#" icon={<IcLink s={11} w={1.5} />}>
                  Portfolio
                </Pill>
              </div>
            </div>
          </div>

          {/* Card IA */}
          <div className="bg-black text-white rounded-16 p-7 flex flex-col" style={GRID_BG}>
            <div className="flex justify-between items-start mb-4">
              <SectionLabel className="text-white/50">Pair Programmer · IA</SectionLabel>
              <span className="font-mono text-10 text-white/30">/02</span>
            </div>
            <h3 className="font-sans text-32 font-semibold text-white tracking-tight1 mb-3">
              Claude <span className="font-serif italic font-normal">Code</span>
            </h3>
            <p className="font-sans text-14 text-white/70 leading-[1.6] mb-auto">
              Mi colaborador en arquitectura, refactors y debugging. Acelera lo que sería
              imposible solo, manteniéndome a cargo de cada decisión de producto.
            </p>
            <div className="flex gap-2 mt-6 flex-wrap">
              <Pill dark>Anthropic</Pill>
              <Pill dark>Sonnet 4.5</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* Tres servicios */}
      <section className="px-20 pb-20">
        <SectionLabel>·02 · Cómo se construye</SectionLabel>
        <h2 className="font-sans text-48 font-semibold text-ink mt-3 mb-12 tracking-tighter2 leading-[1.05]">
          Tres servicios, <span className="font-serif italic font-normal">una idea</span>
        </h2>
        <div className="grid grid-cols-3 border border-border rounded-16 overflow-hidden">
          {stackCards.map((s, i) => (
            <div key={s.tag} className={`p-9 bg-surface ${i < 2 ? 'border-r border-border' : ''}`}>
              <div className="flex items-center justify-between mb-7">
                <SectionLabel emphasized>{s.tag}</SectionLabel>
                <span className="font-mono text-10 text-ink4 tracking-wide1">0{i + 1}</span>
              </div>
              <h3 className="font-sans text-20 font-semibold text-ink mb-2 tracking-tight1">{s.stack}</h3>
              <p className="font-sans text-14 text-ink3 leading-[1.6]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section className="px-20 pb-24 grid grid-cols-2 gap-16 items-start">
        <div>
          <SectionLabel>·03 · Contacto</SectionLabel>
          <h2 className="font-sans text-44 font-semibold text-ink mt-3 tracking-tighter2 leading-[1.05]">
            Retroalimenta<span className="font-serif italic font-normal">ción</span>
          </h2>
          <p className="font-sans text-15 text-ink3 mt-4 leading-[1.6] max-w-sm">
            Tu opinión me ayuda a mejorar Signa. ¿Tienes una sugerencia, encontraste un bug o
            quieres saludar? Escríbeme.
          </p>
        </div>
        <ContactForm />
      </section>

      <FooterDesktop />
    </div>
  );
}

function AboutMobile() {
  return (
    <div className="flex flex-col h-screen bg-bg overflow-hidden">
      <MobileHeader />
      <div className="flex-1 overflow-auto">
        <section className="px-5 pt-8 pb-6">
          <SectionLabel>·01 · Quién está detrás</SectionLabel>
          <h1 className="font-sans text-40 font-semibold text-ink leading-[0.95] tracking-tightest mt-4 mb-4">
            Un proyecto<br />
            <span className="font-serif italic font-normal">en solitario.</span>
          </h1>
          <p className="font-sans text-15 text-ink2 leading-[1.6]">
            Signa nació como un experimento personal. Lo construyo con Claude Code como copiloto,
            convencido de que la accesibilidad no debería esperar un equipo grande.
          </p>
        </section>

        <Divider className="mx-5" />

        <section className="px-5 py-8 flex flex-col gap-4">
          <div className="flex justify-between mb-1">
            <h2 className="font-sans text-18 font-semibold text-ink">El equipo</h2>
            <SectionLabel>1 humano · 1 IA</SectionLabel>
          </div>
          <div className="bg-surface border border-border rounded-12 p-5">
            <SectionLabel className="mb-2">Founder · Engineer · Designer</SectionLabel>
            <h3 className="font-sans text-22 font-semibold text-ink mt-1">
              Kaw<span className="font-serif italic font-normal">Kuroi</span>
            </h3>
            <p className="font-mono text-10 text-ink4 mb-3">@kawkuroi</p>
            <p className="font-sans text-13 text-ink3 leading-[1.5] mb-4">
              Diseño, desarrollo y entreno los modelos.
            </p>
            <Pill href={GITHUB_URL} icon={<IcGithub s={11} />}>github.com/KawKuroi</Pill>
          </div>
          <div className="bg-black text-white rounded-12 p-5" style={GRID_BG}>
            <SectionLabel className="text-white/50 mb-2">Pair Programmer · IA</SectionLabel>
            <h3 className="font-sans text-22 font-semibold text-white">
              Claude <span className="font-serif italic font-normal">Code</span>
            </h3>
            <p className="font-sans text-13 text-white/70 leading-[1.5] mt-2 mb-4">
              Mi colaborador en arquitectura, refactors y debugging.
            </p>
            <div className="flex gap-2">
              <Pill dark>Anthropic</Pill>
              <Pill dark>Sonnet 4.5</Pill>
            </div>
          </div>
        </section>
      </div>
      <MobileBottomNav />
    </div>
  );
}

export default function AboutPage(): ReactNode {
  const isMobile = useIsMobile();
  return isMobile ? <AboutMobile /> : <AboutDesktop />;
}
