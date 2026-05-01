import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SignaLogo } from '@/components/brand/signa-logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavDesktopProps {
  dark?: boolean;
}

const pages = [
  { to: '/', label: 'Inicio', match: (p: string) => p === '/' },
  { to: '/about', label: 'Sobre Signa', match: (p: string) => p.startsWith('/about') },
  { to: '/app', label: 'Probar el traductor', match: (p: string) => p.startsWith('/app') },
];

export function NavDesktop({ dark = false }: NavDesktopProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <nav
      className={cn(
        'h-16 shrink-0 border-b px-10',
        dark ? 'bg-black border-white/10' : 'bg-surface border-border',
      )}
    >
      <div className="max-w-[1240px] mx-auto h-full flex items-center justify-between">
        <Link to="/" aria-label="Inicio Signa">
          <SignaLogo dark={dark} />
        </Link>
        <div className="flex gap-8 items-center">
          {pages.map((p) => {
            const active = p.match(pathname);
            return (
              <Link
                key={p.to}
                to={p.to}
                className={cn(
                  'font-sans text-13 tracking-tight05 transition-colors',
                  active
                    ? dark
                      ? 'text-white font-semibold'
                      : 'text-ink font-semibold'
                    : dark
                      ? 'text-white/60 hover:text-white font-medium'
                      : 'text-ink3 hover:text-ink font-medium',
                )}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant={dark ? 'white' : 'primary'} onClick={() => navigate('/app')}>
            Empezar
          </Button>
        </div>
      </div>
    </nav>
  );
}
