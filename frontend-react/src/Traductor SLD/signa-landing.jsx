// Signa — Landing Desktop Screen (Editorial / Modern)
// ─────────────────────────────────────────────────────

function LandingDesktop() {
  const features = [
    { Icon: IcBolt,  title: 'Precisión Instantánea', desc: 'Algoritmos optimizados para capturar cada microgesto con exactitud sub‑milimétrica.' },
    { Icon: IcLock,  title: 'Privacidad por diseño',  desc: 'Sin almacenar frames. Solo el texto traducido se guarda, autenticado por JWT. Sin terceros, sin trackers.' },
    { Icon: IcEye,   title: 'Diseño Inclusivo',      desc: 'Interfaz minimalista construida con la comunidad y para la comunidad.' },
  ];
  const faqs = [
    '¿Cómo funciona la traducción en tiempo real?',
    '¿Qué lenguaje de señas soporta?',
    '¿Es segura mi privacidad?',
    '¿Necesito hardware especial?',
  ];

  return (
    <div style={{ width: 1280, backgroundColor: T.bg, fontFamily: T.fontSans }}>
      <NavDesktop activePage="landing" />

      {/* ── Hero ──────────────────────────── */}
      <section style={{ padding: '88px 80px 72px', display: 'flex', gap: 56, alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 540px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
            <Badge variant="dark"><IcSparkle s={11} w={1.7} /> IA Generativa</Badge>
            <Badge variant="light"><IcCode s={11} w={1.7} /> Open Source</Badge>
          </div>

          <h1 style={{
            fontFamily: T.fontSans, fontSize: 72, fontWeight: 600,
            lineHeight: 0.98, letterSpacing: '-0.04em',
            color: T.ink, margin: '0 0 24px',
          }}>
            Rompiendo<br />
            barreras con{' '}
            <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.03em' }}>signa</span>
          </h1>

          <p style={{
            fontFamily: T.fontSans, fontSize: 17, lineHeight: 1.55,
            color: T.ink2, margin: '0 0 36px', maxWidth: 480, fontWeight: 400,
          }}>
            Traducción del alfabeto de Lenguaje de Señas Americano (ASL) en tiempo real con visión computacional. Una herramienta para conectar mundos de forma fluida, accesible y sin intermediarios.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Btn size="lg" variant="primary" iconRight={<IcArrowRight s={16} w={1.8} />}>Comenzar ahora</Btn>
            <Btn size="lg" variant="secondary" icon={<IcGithub s={16} />}>GitHub</Btn>
            <Btn size="lg" variant="ghost" icon={<IcPlay s={11} />}>Ver demo</Btn>
          </div>

          {/* Microstats */}
          <div style={{ display: 'flex', gap: 40, marginTop: 56, paddingTop: 28, borderTop: `1px solid ${T.border}` }}>
            {[
              { n: '<100ms',    l: 'Latencia' },
              { n: '24 letras', l: 'Alfabeto A‑Y' },
              { n: 'ASL',       l: 'Señas estáticas' },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontSize: 28, color: T.ink, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.n}</div>
                <div style={{ fontFamily: T.fontMono, fontSize: 11, color: T.ink4, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div style={{ flex: 1, position: 'relative', height: 560 }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: T.r20, overflow: 'hidden',
            backgroundColor: T.black, boxShadow: T.shadowXl,
          }}>
            {/* Camera placeholder w/ subtle gradient */}
            <div style={{
              width: '100%', height: '100%',
              background: 'radial-gradient(ellipse at 50% 40%, #1a1a1a 0%, #000 75%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ opacity: 0.18 }}>
                <IcCamera s={96} w={1} />
              </div>
            </div>

            {/* Live chip */}
            <div style={{
              position: 'absolute', top: 20, left: 20,
              display: 'flex', alignItems: 'center', gap: 7,
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: T.rFull, padding: '5px 11px',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: T.rFull, backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }} />
              <span style={{ fontFamily: T.fontMono, fontSize: 10, fontWeight: 500, color: '#fff', letterSpacing: '0.08em' }}>EN VIVO</span>
            </div>

            {/* Coordinates */}
            <div style={{
              position: 'absolute', top: 20, right: 20,
              fontFamily: T.fontMono, fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em',
            }}>
              42.331 / -71.028
            </div>

            {/* Translation overlay */}
            <div style={{
              position: 'absolute', bottom: 20, left: 20, right: 20,
              backgroundColor: 'rgba(20,20,20,0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: T.r12, padding: '16px 20px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: T.fontMono, fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>TRADUCCIÓN · ASL → ES</span>
                <span style={{ fontFamily: T.fontMono, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>00:42</span>
              </div>
              <p style={{
                fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400,
                fontSize: 22, color: '#fff', margin: 0, letterSpacing: '-0.01em',
              }}>"H – E – L – L – O"</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stack strip ──────────────────────── */}
      <div style={{
        margin: '0 80px',
        display: 'flex', alignItems: 'center', gap: 28,
        padding: '20px 0', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`,
      }}>
        <SectionLabel>Construido con</SectionLabel>
        {['React + TS', 'Spring Boot', 'FastAPI', 'TensorFlow', 'MediaPipe', 'Docker'].map((name, i) => (
          <React.Fragment key={name}>
            <span style={{ fontFamily: T.fontMono, fontSize: 12, fontWeight: 500, color: T.ink2, letterSpacing: '-0.01em' }}>{name}</span>
            {i < 5 && <span style={{ width: 3, height: 3, borderRadius: T.rFull, backgroundColor: T.ink5 }} />}
          </React.Fragment>
        ))}
      </div>

      {/* ── Demo section ─────────────────────── */}
      <section style={{ padding: '96px 80px 88px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <SectionLabel>·01 · Demo</SectionLabel>
            <h2 style={{
              fontFamily: T.fontSans, fontSize: 48, fontWeight: 600,
              color: T.ink, margin: '14px 0 0', letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Mira Signa <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>en acción</span>
            </h2>
          </div>
          <p style={{ fontFamily: T.fontSans, fontSize: 15, color: T.ink3, lineHeight: 1.55, margin: 0, maxWidth: 380 }}>
            Observa cómo nuestra tecnología procesa gestos complejos y los convierte en texto o voz instantáneamente.
          </p>
        </div>

        <div style={{
          position: 'relative', borderRadius: T.r20, overflow: 'hidden',
          backgroundColor: T.black, aspectRatio: '16/9',
          border: `1px solid ${T.border}`,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000 80%)',
          }}>
            <button style={{
              width: 72, height: 72, borderRadius: T.rFull,
              backgroundColor: T.white, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(255,255,255,0.15)',
              paddingLeft: 4,
            }}>
              <IcPlay s={22} />
            </button>
          </div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          }}>
            <div style={{ height: 2, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: T.rFull, marginBottom: 12, position: 'relative' }}>
              <div style={{ height: '100%', width: '34%', backgroundColor: T.white, borderRadius: T.rFull }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.white, letterSpacing: '0.04em' }}>02:14</span>
              <span style={{ fontFamily: T.fontMono, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>05:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────── */}
      <section style={{ padding: '0 80px 96px' }}>
        <SectionLabel>·02 · Capacidades</SectionLabel>
        <h2 style={{
          fontFamily: T.fontSans, fontSize: 48, fontWeight: 600,
          color: T.ink, margin: '14px 0 56px', letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: 720,
        }}>
          Tecnología discreta, <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>impacto profundo</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, border: `1px solid ${T.border}`, borderRadius: T.r16, overflow: 'hidden' }}>
          {features.map((f, i) => (
            <div key={f.title} style={{
              padding: 36,
              backgroundColor: T.surface,
              borderRight: i < features.length - 1 ? `1px solid ${T.border}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, color: T.ink }}>
                <f.Icon s={20} w={1.6} />
                <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.ink4, letterSpacing: '0.06em' }}>0{i + 1}</span>
              </div>
              <h3 style={{
                fontFamily: T.fontSans, fontSize: 20, fontWeight: 600,
                color: T.ink, margin: '0 0 10px', letterSpacing: '-0.015em',
              }}>{f.title}</h3>
              <p style={{ fontFamily: T.fontSans, fontSize: 14, lineHeight: 1.6, color: T.ink3, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Community CTA (true black) ──────── */}
      <section style={{ padding: '0 80px 88px' }}>
        <div style={{
          backgroundColor: T.black, borderRadius: T.r24,
          padding: '72px 64px', position: 'relative', overflow: 'hidden',
        }}>
          {/* Subtle grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at 80% 50%, black 0%, transparent 70%)',
          }} />

          <div style={{ position: 'relative', maxWidth: 680 }}>
            <Badge variant="outline_white">·03 · Comunidad</Badge>
            <h2 style={{
              fontFamily: T.fontSans, fontSize: 56, fontWeight: 600,
              color: T.white, margin: '24px 0 20px',
              letterSpacing: '-0.04em', lineHeight: 1.02,
            }}>
              Construyamos el<br />
              <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>futuro juntos.</span>
            </h2>
            <p style={{
              fontFamily: T.fontSans, fontSize: 16, lineHeight: 1.6,
              color: 'rgba(255,255,255,0.65)', margin: '0 0 36px', maxWidth: 560,
            }}>
              Signa es código abierto. Creemos que la accesibilidad universal no debe tener dueños. Únete a desarrolladores y traductores para mejorar los modelos juntos.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn variant="white" size="lg" icon={<IcUsers s={16} w={1.8} />}>Unirme a la comunidad</Btn>
              <Btn variant="outline_white" size="lg" icon={<IcGithub s={16} />}>Cómo contribuir</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────── */}
      <section style={{ padding: '0 80px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 80 }}>
          <div>
            <SectionLabel>·04 · Preguntas</SectionLabel>
            <h2 style={{
              fontFamily: T.fontSans, fontSize: 40, fontWeight: 600,
              color: T.ink, margin: '14px 0 0', letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Preguntas <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>frecuentes</span>
            </h2>
          </div>
          <div>
            {faqs.map((q, i) => <FAQItem key={q} q={q} expanded={i === 0} />)}
          </div>
        </div>
      </section>

      <FooterDesktop />
    </div>
  );
}

Object.assign(window, { LandingDesktop });
