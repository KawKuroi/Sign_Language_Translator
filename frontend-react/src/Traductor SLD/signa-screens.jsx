// Signa — App + About + Mobile screens (Editorial / Modern)
// ───────────────────────────────────────────────────────────

// ── Sidebar Nav Item ────────────
function SideNavItem({ Icon, label, active = false, badge }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 11,
      height: 38, padding: '0 12px', borderRadius: T.r8,
      backgroundColor: active ? T.surface2 : 'transparent',
      cursor: 'pointer', color: active ? T.ink : T.ink3,
    }}>
      <Icon s={17} w={1.6} />
      <span style={{
        fontFamily: T.fontSans, fontSize: 13.5,
        fontWeight: active ? 600 : 500,
        color: active ? T.ink : T.ink2,
        flex: 1, letterSpacing: '-0.005em',
      }}>{label}</span>
      {badge && <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink4 }}>{badge}</span>}
    </div>
  );
}

// ── App View Desktop ────────────
function AppDesktop() {
  const navTop = [
    { Icon: IcTranslator, label: 'Traductor',   active: true },
    { Icon: IcHistory,    label: 'Historial',   badge: '12' },
    { Icon: IcDictionary, label: 'Diccionario' },
  ];
  const navBottom = [
    { Icon: IcSettings,   label: 'Ajustes' },
    { Icon: IcHelp,       label: 'Ayuda' },
  ];

  return (
    <div style={{ width: 1280, height: 900, display: 'flex', backgroundColor: T.bg, fontFamily: T.fontSans, overflow: 'hidden' }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, height: '100%',
        backgroundColor: T.surface,
        borderRight: `1px solid ${T.border}`,
        display: 'flex', flexDirection: 'column',
        padding: 14, flexShrink: 0,
      }}>
        <div style={{ padding: '10px 8px 22px' }}>
          <SignaLogo />
          <div style={{ marginLeft: 38, marginTop: 4 }}>
            <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink4, letterSpacing: '0.06em' }}>v2.0 · pro</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <p style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink4, padding: '4px 12px 8px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Workspace</p>
          {navTop.map(it => <SideNavItem key={it.label} {...it} />)}

          <p style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink4, padding: '20px 12px 8px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Cuenta</p>
          {navBottom.map(it => <SideNavItem key={it.label} {...it} />)}
        </div>

        {/* Profile */}
        <div style={{ paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px' }}>
            <div style={{
              width: 30, height: 30, borderRadius: T.rFull,
              backgroundColor: T.ink, color: T.white,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.fontSerif, fontStyle: 'italic', fontSize: 14,
            }}>a</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: T.fontSans, fontSize: 12.5, fontWeight: 600, color: T.ink, margin: 0, letterSpacing: '-0.005em' }}>alex@signa.dev</p>
              <p style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink4, margin: 0, letterSpacing: '0.04em' }}>Enterprise</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          height: 60, backgroundColor: T.surface,
          borderBottom: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.ink4, letterSpacing: '0.06em' }}>workspace</span>
            <IcChevronRight s={11} w={1.5} />
            <span style={{ fontFamily: T.fontSans, fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: '-0.005em' }}>Traductor</span>
            <span style={{
              fontFamily: T.fontMono, fontSize: 10, color: T.ink3,
              padding: '3px 8px', borderRadius: T.rFull,
              backgroundColor: T.surface2, marginLeft: 4, letterSpacing: '0.04em',
            }}>SESIÓN ACTIVA</span>
          </div>
          <div style={{ display: 'flex', gap: 6, color: T.ink3 }}>
            {[IcBell, IcHelp].map((Ic, i) => (
              <button key={i} style={{
                width: 34, height: 34, borderRadius: T.r8, border: 'none',
                backgroundColor: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.ink3,
              }}><Ic s={16} w={1.6} /></button>
            ))}
          </div>
        </header>

        {/* Content */}
        <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto', backgroundColor: T.bg }}>

          {/* Camera card */}
          <Card sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 440, position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, maxWidth: 420, textAlign: 'center' }}>
              <div style={{ position: 'relative', width: 180, height: 180 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: T.rFull, border: `1px dashed ${T.ink5}` }} />
                <div style={{
                  position: 'absolute', inset: 22,
                  backgroundColor: T.surface2,
                  border: `1px solid ${T.border}`,
                  borderRadius: T.r20,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: T.ink4,
                }}>
                  <IcCameraOff s={42} w={1.4} />
                </div>
              </div>
              <div>
                <h2 style={{
                  fontFamily: T.fontSans, fontSize: 22, fontWeight: 600,
                  color: T.ink, margin: '0 0 10px', letterSpacing: '-0.02em',
                }}>
                  Acceso a cámara <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>requerido</span>
                </h2>
                <p style={{ fontFamily: T.fontSans, fontSize: 14, lineHeight: 1.55, color: T.ink3, margin: 0, maxWidth: 360 }}>
                  Para iniciar la traducción del alfabeto ASL, otorga permiso a Signa para acceder a tu cámara. Los frames se descartan tras la inferencia — solo se guarda el texto.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <Btn variant="primary" size="md" icon={<IcCamera s={15} w={1.7} />}>Habilitar cámara</Btn>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: T.ink4 }}>
                  <IcLock s={11} w={1.6} />
                  <SectionLabel>Sin almacenar frames · solo texto</SectionLabel>
                </div>
              </div>
            </div>
          </Card>

          {/* Transcription panel */}
          <div style={{
            backgroundColor: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: T.r12, overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 18px',
              borderBottom: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <SectionLabel color={T.ink}>Transcripción</SectionLabel>
                <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink4, letterSpacing: '0.04em' }}>ASL → ES</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: T.rFull, backgroundColor: T.ink5 }} />
                  <SectionLabel>Motor inactivo</SectionLabel>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.ink4, padding: 4, display: 'flex' }}>
                  <IcCopy s={13} w={1.5} />
                </button>
              </div>
            </div>
            <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
              <span style={{
                fontFamily: T.fontSerif, fontStyle: 'italic', fontSize: 17,
                color: T.ink5, letterSpacing: '-0.01em', textAlign: 'center',
              }}>
                La traducción aparecerá aquí cuando se detecten gestos…
              </span>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div style={{
          height: 30, backgroundColor: T.surface,
          borderTop: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', gap: 18 }}>
            {[
              { dot: T.ink5, label: 'Cámara inactiva' },
              { dot: '#10B981', label: 'Modelo cargado' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: T.rFull, backgroundColor: s.dot }} />
                <SectionLabel>{s.label}</SectionLabel>
              </div>
            ))}
          </div>
          <SectionLabel>v2.0.1 · open source</SectionLabel>
        </div>
      </main>
    </div>
  );
}

// ── About Us Desktop ────────────
function AboutDesktop() {
  return (
    <div style={{ width: 1280, backgroundColor: T.bg, fontFamily: T.fontSans }}>
      <NavDesktop activePage="about" />

      {/* Hero */}
      <section style={{ padding: '88px 80px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-end' }}>
        <div>
          <SectionLabel>·01 · Quién está detrás</SectionLabel>
          <h1 style={{
            fontFamily: T.fontSans, fontSize: 80, fontWeight: 600,
            color: T.ink, margin: '20px 0 0',
            letterSpacing: '-0.045em', lineHeight: 0.95,
          }}>
            Un proyecto<br />
            <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>en solitario</span>.
          </h1>
        </div>
        <p style={{
          fontFamily: T.fontSans, fontSize: 17, lineHeight: 1.6,
          color: T.ink2, margin: 0, maxWidth: 480,
        }}>
          Signa nació como un experimento personal sobre cómo la IA puede acortar distancias. Lo construyo en mis horas libres, con Claude Code como copiloto, y con la convicción de que la accesibilidad no debería esperar a tener un equipo grande detrás.
        </p>
      </section>

      {/* Builders — duo */}
      <section style={{ padding: '0 80px 96px' }}>
        <div style={{
          borderTop: `1px solid ${T.border}`,
          padding: '32px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40,
        }}>
          <h2 style={{ fontFamily: T.fontSans, fontSize: 18, fontWeight: 600, color: T.ink, margin: 0, letterSpacing: '-0.01em' }}>El equipo</h2>
          <SectionLabel>1 humano · 1 ia</SectionLabel>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          {/* Lead — human */}
          <div style={{
            backgroundColor: T.surface, border: `1px solid ${T.border}`,
            borderRadius: T.r20, padding: 36,
            display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'flex-start',
          }}>
            <div style={{
              width: 200, height: 200, borderRadius: T.r16,
              backgroundColor: T.surface2, border: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.ink, position: 'relative', overflow: 'hidden',
            }}>
              <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontSize: 130, lineHeight: 1, letterSpacing: '-0.02em', color: T.ink, marginTop: -8 }}>k</span>
              <div style={{ position: 'absolute', top: 12, right: 12, fontFamily: T.fontMono, fontSize: 10, color: T.ink4, letterSpacing: '0.04em' }}>/01</div>
            </div>
            <div style={{ paddingTop: 4 }}>
              <SectionLabel>Founder · Engineer · Designer</SectionLabel>
              <h3 style={{
                fontFamily: T.fontSans, fontSize: 32, fontWeight: 600,
                color: T.ink, margin: '10px 0 4px', letterSpacing: '-0.025em', lineHeight: 1.05,
              }}>
                Kaw<span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>Kuroi</span>
              </h3>
              <p style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink4, margin: '0 0 18px', letterSpacing: '0.02em' }}>@kawkuroi</p>
              <p style={{ fontFamily: T.fontSans, fontSize: 14, lineHeight: 1.6, color: T.ink3, margin: '0 0 24px' }}>
                Diseño, desarrollo y entreno los modelos. Cada decisión —desde la arquitectura de microservicios hasta el placement de un botón— pasa por mis manos.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="secondary" size="sm" icon={<IcGithub s={14} />}>github.com/KawKuroi</Btn>
                <Btn variant="ghost" size="sm" icon={<IcLink s={13} w={1.6} />}>Portfolio</Btn>
              </div>
            </div>
          </div>

          {/* AI collaborator */}
          <div style={{
            backgroundColor: T.black, color: T.white,
            borderRadius: T.r20, padding: 36,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
            }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <span style={{
                  fontFamily: T.fontMono, fontSize: 10, color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>Pair programmer · IA</span>
                <span style={{ fontFamily: T.fontMono, fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>/02</span>
              </div>
              <h3 style={{
                fontFamily: T.fontSans, fontSize: 32, fontWeight: 600,
                color: T.white, margin: '0 0 14px', letterSpacing: '-0.025em', lineHeight: 1.05,
              }}>
                Claude <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>Code</span>
              </h3>
              <p style={{ fontFamily: T.fontSans, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                Mi colaborador en arquitectura, refactors y debugging. Acelera lo que sería imposible solo, manteniéndome a cargo de cada decisión de producto.
              </p>
            </div>
            <div style={{ position: 'relative', display: 'flex', gap: 8, marginTop: 28 }}>
              <span style={{
                fontFamily: T.fontMono, fontSize: 10,
                padding: '5px 10px', borderRadius: T.rFull,
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em',
              }}>Anthropic</span>
              <span style={{
                fontFamily: T.fontMono, fontSize: 10,
                padding: '5px 10px', borderRadius: T.rFull,
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em',
              }}>Sonnet 4.5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stack & Process */}
      <section style={{ padding: '0 80px 96px' }}>
        <SectionLabel>·02 · Cómo se construye</SectionLabel>
        <h2 style={{
          fontFamily: T.fontSans, fontSize: 48, fontWeight: 600,
          color: T.ink, margin: '14px 0 56px', letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: 720,
        }}>
          Tres servicios, <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>una idea</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${T.border}`, borderRadius: T.r16, overflow: 'hidden' }}>
          {[
            { tag: 'Frontend',   stack: 'React + TypeScript', desc: 'Cliente que captura los frames de la cámara y muestra la transcripción en vivo.' },
            { tag: 'Gateway',    stack: 'Spring Boot · Java',  desc: 'API gateway con autenticación JWT, gestión de usuarios y persistencia del historial.' },
            { tag: 'AI Service', stack: 'FastAPI · Python',    desc: 'Inferencia con MediaPipe + red neuronal densa entrenada sobre 24 letras del alfabeto ASL.' },
          ].map((s, i) => (
            <div key={s.tag} style={{
              padding: 36, backgroundColor: T.surface,
              borderRight: i < 2 ? `1px solid ${T.border}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <SectionLabel color={T.ink}>{s.tag}</SectionLabel>
                <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink4, letterSpacing: '0.04em' }}>0{i + 1}</span>
              </div>
              <h3 style={{
                fontFamily: T.fontSans, fontSize: 20, fontWeight: 600,
                color: T.ink, margin: '0 0 10px', letterSpacing: '-0.015em',
              }}>{s.stack}</h3>
              <p style={{ fontFamily: T.fontSans, fontSize: 14, lineHeight: 1.6, color: T.ink3, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: '0 80px 96px', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 80 }}>
        <div>
          <SectionLabel>·03 · Contacto</SectionLabel>
          <h2 style={{
            fontFamily: T.fontSans, fontSize: 36, fontWeight: 600,
            color: T.ink, margin: '14px 0 16px',
            letterSpacing: '-0.03em', lineHeight: 1.05,
          }}>
            Retroalimenta<span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>ción</span>
          </h2>
          <p style={{ fontFamily: T.fontSans, fontSize: 14, lineHeight: 1.6, color: T.ink3, margin: 0 }}>
            Tu opinión me ayuda a mejorar Signa. ¿Tienes una sugerencia, encontraste un bug o quieres saludar? Escríbeme.
          </p>
        </div>

        <div style={{
          backgroundColor: T.surface, border: `1px solid ${T.border}`,
          borderRadius: T.r16, padding: 32,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[['Nombre', 'Juan García'], ['Correo', 'juan@ejemplo.com']].map(([label, ph]) => (
              <div key={label}>
                <label style={{
                  display: 'block', fontFamily: T.fontMono, fontSize: 10,
                  color: T.ink4, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>{label}</label>
                <input placeholder={ph} style={{
                  width: '100%', height: 42, padding: '0 14px',
                  border: `1px solid ${T.border}`, borderRadius: T.r8,
                  backgroundColor: T.bg,
                  fontFamily: T.fontSans, fontSize: 14, color: T.ink,
                  outline: 'none', boxSizing: 'border-box',
                }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block', fontFamily: T.fontMono, fontSize: 10,
              color: T.ink4, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>Mensaje</label>
            <textarea placeholder="¿Cómo podemos mejorar?" rows={4} style={{
              width: '100%', padding: '12px 14px',
              border: `1px solid ${T.border}`, borderRadius: T.r8,
              backgroundColor: T.bg,
              fontFamily: T.fontSans, fontSize: 14, color: T.ink,
              outline: 'none', resize: 'vertical', boxSizing: 'border-box',
            }} />
          </div>
          <Btn variant="primary" size="md" icon={<IcSend s={14} w={1.7} />}>Enviar mensaje</Btn>
        </div>
      </section>

      <FooterDesktop />
    </div>
  );
}

// ── Landing Mobile ────────────
function LandingMobile() {
  return (
    <div style={{ width: 390, backgroundColor: T.bg, fontFamily: T.fontSans }}>
      {/* Nav */}
      <nav style={{
        height: 56, backgroundColor: T.surface,
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <SignaLogo size={26} />
        <button style={{
          width: 36, height: 36, borderRadius: T.r8,
          border: `1px solid ${T.border}`, backgroundColor: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.ink,
        }}><IcMenu s={16} w={1.6} /></button>
      </nav>

      {/* Hero */}
      <section style={{ padding: '36px 20px 28px' }}>
        <Badge variant="dark"><IcSparkle s={11} w={1.7} /> IA Generativa</Badge>
        <h1 style={{
          fontFamily: T.fontSans, fontSize: 44, fontWeight: 600,
          lineHeight: 0.98, letterSpacing: '-0.04em',
          color: T.ink, margin: '20px 0 16px',
        }}>
          Rompiendo barreras con{' '}
          <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>signa</span>
        </h1>
        <p style={{
          fontFamily: T.fontSans, fontSize: 15, lineHeight: 1.55,
          color: T.ink2, margin: '0 0 28px',
        }}>
          Traducción de lengua de señas en tiempo real con inteligencia artificial.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn variant="primary" size="lg" iconRight={<IcArrowRight s={15} w={1.7} />} sx={{ width: '100%' }}>Comenzar ahora</Btn>
          <Btn variant="secondary" size="lg" icon={<IcPlay s={11} />} sx={{ width: '100%' }}>Ver demo</Btn>
        </div>
      </section>

      {/* Hero image */}
      <div style={{ margin: '0 20px 36px' }}>
        <div style={{
          backgroundColor: T.black, borderRadius: T.r16, aspectRatio: '4/3',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000 80%)',
        }}>
          <div style={{ opacity: 0.18, color: '#fff' }}><IcCamera s={56} w={1} /></div>
          <div style={{
            position: 'absolute', top: 12, left: 12,
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: T.rFull, padding: '4px 9px',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: T.rFull, backgroundColor: '#10B981' }} />
            <span style={{ fontFamily: T.fontMono, fontSize: 9, fontWeight: 500, color: '#fff', letterSpacing: '0.08em' }}>EN VIVO</span>
          </div>
          <div style={{
            position: 'absolute', bottom: 12, left: 12, right: 12,
            backgroundColor: 'rgba(20,20,20,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: T.r8, padding: '10px 14px',
          }}>
            <p style={{ fontFamily: T.fontMono, fontSize: 9, color: 'rgba(255,255,255,0.5)', margin: '0 0 4px', letterSpacing: '0.08em' }}>TRADUCCIÓN · ASL → ES</p>
            <p style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400, fontSize: 17, color: '#fff', margin: 0 }}>"H – E – L – L – O"</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <section style={{ padding: '0 20px 36px' }}>
        <SectionLabel>·01 · Capacidades</SectionLabel>
        <h2 style={{
          fontFamily: T.fontSans, fontSize: 26, fontWeight: 600,
          color: T.ink, margin: '12px 0 20px',
          letterSpacing: '-0.03em', lineHeight: 1.05,
        }}>
          Por qué <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>Signa</span>
        </h2>
        <div style={{ border: `1px solid ${T.border}`, borderRadius: T.r12, overflow: 'hidden', backgroundColor: T.surface }}>
          {[
            { Icon: IcBolt, title: 'Precisión Instantánea', desc: 'Captura cada microgesto con exactitud sub‑milimétrica.' },
            { Icon: IcLock, title: 'Privacidad Total',      desc: 'Procesamiento local. Sin servidores externos.' },
            { Icon: IcEye,  title: 'Diseño Inclusivo',      desc: 'Hecho con la comunidad sorda.' },
          ].map((f, i) => (
            <div key={f.title} style={{
              padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start',
              borderBottom: i < 2 ? `1px solid ${T.border}` : 'none',
            }}>
              <div style={{ color: T.ink, marginTop: 2 }}><f.Icon s={18} w={1.6} /></div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: T.fontSans, fontSize: 15, fontWeight: 600, color: T.ink, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontFamily: T.fontSans, fontSize: 13, lineHeight: 1.5, color: T.ink3, margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: T.surface, borderTop: `1px solid ${T.border}`, padding: '28px 20px 32px', textAlign: 'center' }}>
        <SignaLogo size={26} />
        <p style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink4, marginTop: 14, letterSpacing: '0.04em' }}>© 2024 SIGNA · MIT LICENSE</p>
      </footer>
    </div>
  );
}

// ── App View Mobile ────────────
function AppMobile() {
  const tabs = [
    { Icon: IcTranslator, label: 'Traductor',   active: true },
    { Icon: IcHistory,    label: 'Historial' },
    { Icon: IcDictionary, label: 'Dicc.' },
    { Icon: IcSettings,   label: 'Ajustes' },
  ];
  return (
    <div style={{ width: 390, height: 844, backgroundColor: T.bg, fontFamily: T.fontSans, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <header style={{
        backgroundColor: T.surface, borderBottom: `1px solid ${T.border}`,
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <SignaLogo size={26} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ width: 32, height: 32, borderRadius: T.r8, border: 'none', backgroundColor: 'transparent', color: T.ink3, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IcBell s={16} w={1.6} />
          </button>
          <div style={{
            width: 30, height: 30, borderRadius: T.rFull,
            backgroundColor: T.ink, color: T.white,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.fontSerif, fontStyle: 'italic', fontSize: 13,
          }}>a</div>
        </div>
      </header>

      <div style={{ padding: '14px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionLabel color={T.ink}>Traductor</SectionLabel>
        <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink4, letterSpacing: '0.04em' }}>ASL → ES</span>
      </div>

      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'auto' }}>
        {/* Camera */}
        <Card sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 360 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, padding: '0 16px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 150, height: 150 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: T.rFull, border: `1px dashed ${T.ink5}` }} />
              <div style={{
                position: 'absolute', inset: 18, borderRadius: T.r16,
                backgroundColor: T.surface2, border: `1px solid ${T.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.ink4,
              }}>
                <IcCameraOff s={32} w={1.4} />
              </div>
            </div>
            <div>
              <h2 style={{
                fontFamily: T.fontSans, fontSize: 18, fontWeight: 600,
                color: T.ink, margin: '0 0 6px', letterSpacing: '-0.02em',
              }}>
                Acceso <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontWeight: 400 }}>requerido</span>
              </h2>
              <p style={{ fontFamily: T.fontSans, fontSize: 13, lineHeight: 1.5, color: T.ink3, margin: '0 0 18px' }}>
                Signa usa tu cámara para traducir el alfabeto ASL. Los frames se descartan tras la inferencia.
              </p>
              <Btn variant="primary" size="md" icon={<IcCamera s={14} w={1.7} />} sx={{ width: '100%' }}>Habilitar cámara</Btn>
            </div>
          </div>
        </Card>

        {/* Transcription */}
        <div style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: T.r12, overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <SectionLabel color={T.ink}>Transcripción</SectionLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: T.rFull, backgroundColor: T.ink5 }} />
              <SectionLabel>Inactivo</SectionLabel>
            </div>
          </div>
          <div style={{ padding: '20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontSize: 14, color: T.ink5, textAlign: 'center', lineHeight: 1.4 }}>
              La traducción aparecerá aquí…
            </span>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav style={{
        backgroundColor: T.surface, borderTop: `1px solid ${T.border}`,
        display: 'flex', flexShrink: 0, paddingBottom: 16,
      }}>
        {tabs.map(tab => (
          <div key={tab.label} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '12px 0 0', gap: 4, cursor: 'pointer',
            color: tab.active ? T.ink : T.ink4,
          }}>
            <tab.Icon s={20} w={tab.active ? 1.8 : 1.5} />
            <span style={{
              fontFamily: T.fontMono, fontSize: 9,
              fontWeight: tab.active ? 600 : 500,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>{tab.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

Object.assign(window, { AppDesktop, AboutDesktop, LandingMobile, AppMobile });
