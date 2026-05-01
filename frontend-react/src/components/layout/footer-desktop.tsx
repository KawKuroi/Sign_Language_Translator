import { Link } from 'react-router-dom';
import { SignaLogo } from '@/components/brand/signa-logo';

const GITHUB_URL = 'https://github.com/KawKuroi';

const cols = [
  {
    title: 'Producto',
    links: [
      { label: 'Traductor', to: '/app' },
      { label: 'Diccionario', to: '/dictionary' },
      { label: 'Historial', to: '/history' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'GitHub', href: GITHUB_URL },
      { label: 'Equipo', to: '/about' },
      { label: 'Contacto', to: '/about' },
    ],
  },
  {
    title: 'Cuenta',
    links: [
      { label: 'Iniciar sesión', to: '/login' },
      { label: 'Crear cuenta', to: '/register' },
      { label: 'Ajustes', to: '/settings' },
    ],
  },
];

export function FooterDesktop() {
  return (
    <footer className="border-t border-border bg-surface px-10 pt-14 pb-12">
      <div className="flex justify-between gap-16">
        <div className="max-w-[320px]">
          <SignaLogo />
          <p className="font-sans text-14 text-ink3 mt-4 leading-[22px]">
            Traductor del alfabeto ASL en tiempo real. Proyecto open-source dedicado a la inclusión
            mediante el uso ético y creativo de la inteligencia artificial.
          </p>
        </div>
        <div className="flex gap-16">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-11 text-ink4 mb-4 uppercase tracking-wide2">
                {col.title}
              </p>
              {col.links.map((l) =>
                'href' in l ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-sans text-14 text-ink2 mb-[10px] hover:text-ink transition-colors"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="block font-sans text-14 text-ink2 mb-[10px] hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
