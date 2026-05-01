import { Link } from 'react-router-dom';
import { SignaLogo } from '@/components/brand/signa-logo';
import { IcBell } from '@/components/brand/icons';
import { useAuth } from '@/lib/auth';

export function MobileHeader() {
  const { user } = useAuth();
  const initial = user?.email?.[0]?.toLowerCase();

  return (
    <header className="bg-surface border-b border-border px-5 py-[14px] flex items-center justify-between shrink-0">
      <Link to="/" aria-label="Inicio Signa">
        <SignaLogo size={32} />
      </Link>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notificaciones"
          className="w-8 h-8 rounded-8 bg-transparent text-ink3 flex items-center justify-center hover:bg-surface2"
        >
          <IcBell s={16} w={1.6} />
        </button>
        {initial ? (
          <Link
            to="/app"
            aria-label="Cuenta"
            className="w-[30px] h-[30px] rounded-full bg-ink text-white flex items-center justify-center font-serif italic text-13"
          >
            {initial}
          </Link>
        ) : (
          <Link
            to="/login"
            className="font-sans text-12 font-semibold text-ink px-3 h-8 inline-flex items-center rounded-8 border border-border hover:bg-surface2"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
