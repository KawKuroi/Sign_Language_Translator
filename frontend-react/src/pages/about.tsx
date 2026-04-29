import { NavDesktop } from '@/components/layout/nav-desktop';
import { FooterDesktop } from '@/components/layout/footer-desktop';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { IcGithub, IcLink, IcSend } from '@/components/brand/icons';
import { useIsMobile } from '@/hooks/use-media-query';
import { MobileHeader } from '@/components/layout/mobile-header';
import { MobileBottomNav } from '@/components/layout/mobile-bottomnav';

const stack = [
  { tag: 'Frontend', stack: 'React + TypeScript', desc: 'Cliente que captura los frames y muestra la transcripción en vivo.' },
  { tag: 'Gateway', stack: 'Spring Boot · Java', desc: 'API gateway con auth JWT, gestión de usuarios y persistencia del historial.' },
  { tag: 'AI Service', stack: 'FastAPI · Python', desc: 'Inferencia con MediaPipe + red neuronal densa entrenada sobre 24 letras del ASL.' },
];

function AboutDesktop() {
  return (
    <div className="bg-bg font-sans">
      <NavDesktop />

      <section className="px-20 pt-24 pb-16 grid grid-cols-2 gap-20 items-end">
        <div>
          <SectionLabel>·01 · Quién está detrás</SectionLabel>
          <h1 className="font-sans text-80 font-semibold text-ink mt-5 leading-[0.95] tracking-tightest">
            Un proyecto<br />
            <span className="font-serif italic font-normal">en solitario</span>.
          </h1>
        </div>
        <p className="font-sans text-17 text-ink2 leading-[1.6] max-w-md">
          Signa nació como un experimento personal sobre cómo la IA puede acortar distancias. Lo
          construyo en mis horas libres, con Claude Code como copiloto, y con la convicción de que
          la accesibilidad no debería esperar a tener un equipo grande detrás.
        </p>
      </section>

      <section className="px-20 pb-24">
        <div className="border-t border-border pt-8 flex items-center justify-between mb-10">
          <h2 className="font-sans text-18 font-semibold text-ink tracking-tight1">El equipo</h2>
          <SectionLabel>1 humano · 1 ia</SectionLabel>
        </div>

        <div className="grid grid-cols-[1.4fr_1fr] gap-5">
          <div className="bg-surface border border-border rounded-20 p-9 grid grid-cols-[200px_1fr] gap-8 items-start">
            <div className="w-[200px] h-[200px] rounded-16 bg-surface2 border border-border flex items-center justify-center text-ink relative overflow-hidden">
              <span className="font-serif italic leading-none tracking-tighter1 text-ink -mt-2" style={{ fontSize: 130 }}>
                k
              </span>
              <div className="absolute top-3 right-3 font-mono text-10 text-ink4 tracking-wide1">/01</div>
            </div>
            <div className="pt-1">
              <SectionLabel>Founder · Engineer · Designer</SectionLabel>
              <h3 className="font-sans text-32 font-semibold text-ink mt-3 mb-1 tracking-tighter1 leading-[1.05]">
                Kaw<span className="font-serif italic font-normal">Kuroi</span>
              </h3>
              <p className="font-mono text-12 text-ink4 mb-5 tracking-wide1">@kawkuroi</p>
              <p className="font-sans text-14 text-ink3 leading-[1.6] mb-6">
                Diseño, desarrollo y entreno los modelos. Cada decisión —desde la arquitectura de
                microservicios hasta el placement de un botón— pasa por mis manos.
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" icon={<IcGithub s={14} />}>
                  github.com/KawKuroi
                </Button>
                <Button variant="ghost" size="sm" icon={<IcLink s={13} w={1.6} />}>
                  Portfolio
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-black text-white rounded-20 p-9 flex flex-col justify-between relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-7">
                <span className="font-mono text-10 text-white/50 tracking-wide2 uppercase">
                  Pair programmer · IA
                </span>
                <span className="font-mono text-10 text-white/40 tracking-wide1">/02</span>
              </div>
              <h3 className="font-sans text-32 font-semibold text-white mb-4 tracking-tighter1 leading-[1.05]">
                Claude <span className="font-serif italic font-normal">Code</span>
              </h3>
              <p className="font-sans text-14 text-white/70 leading-[1.6]">
                Mi colaborador en arquitectura, refactors y debugging. Acelera lo que sería
                imposible solo, manteniéndome a cargo de cada decisión de producto.
              </p>
            </div>
            <div className="relative flex gap-2 mt-7">
              <span className="font-mono text-10 px-[10px] py-[5px] rounded-full border border-white/20 text-white/70 tracking-wide1">
                Anthropic
              </span>
              <span className="font-mono text-10 px-[10px] py-[5px] rounded-full border border-white/20 text-white/70 tracking-wide1">
                Opus 4.7
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-20 pb-24">
        <SectionLabel>·02 · Cómo se construye</SectionLabel>
        <h2 className="font-sans text-48 font-semibold text-ink mt-3 mb-14 tracking-tighter2 leading-[1.05] max-w-2xl">
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

      <section className="px-20 pb-24 grid grid-cols-[320px_1fr] gap-20">
        <div>
          <SectionLabel>·03 · Contacto</SectionLabel>
          <h2 className="font-sans text-36 font-semibold text-ink mt-3 mb-4 tracking-tighter2 leading-[1.05]">
            Retroalimenta<span className="font-serif italic font-normal">ción</span>
          </h2>
          <p className="font-sans text-14 text-ink3 leading-[1.6]">
            Tu opinión me ayuda a mejorar Signa. ¿Tienes una sugerencia, encontraste un bug o
            quieres saludar? Escríbeme.
          </p>
        </div>
        <Card className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="contact-name">Nombre</Label>
              <Input id="contact-name" placeholder="Juan García" />
            </div>
            <div>
              <Label htmlFor="contact-email">Correo</Label>
              <Input id="contact-email" type="email" placeholder="juan@ejemplo.com" />
            </div>
          </div>
          <div className="mb-5">
            <Label htmlFor="contact-msg">Mensaje</Label>
            <textarea
              id="contact-msg"
              rows={4}
              placeholder="¿Cómo podemos mejorar?"
              className="w-full px-[14px] py-3 border border-border rounded-8 bg-bg font-sans text-14 text-ink outline-none resize-y"
            />
          </div>
          <Button variant="primary" size="md" icon={<IcSend s={14} w={1.7} />}>
            Enviar mensaje
          </Button>
        </Card>
      </section>

      <FooterDesktop />
    </div>
  );
}

function AboutMobile() {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <MobileHeader />
      <main className="flex-1 px-5 py-8 flex flex-col gap-10 overflow-auto">
        <section>
          <SectionLabel>·01 · Quién</SectionLabel>
          <h1 className="font-sans text-44 font-semibold text-ink mt-3 leading-[0.98] tracking-tightest">
            Un proyecto<br />
            <span className="font-serif italic font-normal">en solitario</span>.
          </h1>
          <p className="font-sans text-15 text-ink2 leading-[1.55] mt-5">
            Signa nació como un experimento personal sobre cómo la IA puede acortar distancias.
          </p>
        </section>

        <section>
          <SectionLabel>·02 · Equipo</SectionLabel>
          <Card className="mt-3 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-12 bg-surface2 border border-border flex items-center justify-center">
                <span className="font-serif italic text-32 text-ink leading-none">k</span>
              </div>
              <div>
                <h3 className="font-sans text-20 font-semibold text-ink tracking-tight1">
                  Kaw<span className="font-serif italic font-normal">Kuroi</span>
                </h3>
                <p className="font-mono text-11 text-ink4 tracking-wide1">@kawkuroi</p>
              </div>
            </div>
            <p className="font-sans text-13 text-ink3 leading-[1.55]">
              Diseño, desarrollo y entreno los modelos.
            </p>
          </Card>
          <div className="bg-black text-white rounded-16 p-6 mt-3">
            <span className="font-mono text-10 text-white/50 uppercase tracking-wide2">
              Pair programmer · IA
            </span>
            <h3 className="font-sans text-22 font-semibold mt-3 tracking-tighter1">
              Claude <span className="font-serif italic font-normal">Code</span>
            </h3>
            <p className="font-sans text-13 text-white/70 mt-2 leading-[1.55]">
              Mi colaborador en arquitectura, refactors y debugging.
            </p>
          </div>
        </section>

        <section>
          <SectionLabel>·03 · Stack</SectionLabel>
          <div className="mt-3 flex flex-col gap-2">
            {stack.map((s) => (
              <Card key={s.tag} className="p-5">
                <SectionLabel emphasized>{s.tag}</SectionLabel>
                <h3 className="font-sans text-16 font-semibold text-ink mt-2 tracking-tight1">
                  {s.stack}
                </h3>
                <p className="font-sans text-13 text-ink3 leading-[1.5] mt-1">{s.desc}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <MobileBottomNav />
    </div>
  );
}

export default function AboutPage() {
  const isMobile = useIsMobile();
  return isMobile ? <AboutMobile /> : <AboutDesktop />;
}
