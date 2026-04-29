import { Link, useLocation } from 'react-router-dom';
import { SignaLogo } from '@/components/brand/signa-logo';
import {
  IcDictionary,
  IcHelp,
  IcHistory,
  IcLogout,
  IcSettings,
  IcTranslator,
} from '@/components/brand/icons';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import type { ComponentType, SVGProps } from 'react';

interface ItemProps {
  Icon: ComponentType<SVGProps<SVGSVGElement> & { s?: number; w?: number }>;
  label: string;
  to: string;
  badge?: string;
  active?: boolean;
}

function SideNavItem({ Icon, label, to, badge, active }: ItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-[11px] h-[38px] px-3 rounded-8 transition-colors',
        active ? 'bg-surface2 text-ink' : 'text-ink3 hover:bg-surface2/60',
      )}
    >
      <Icon s={17} w={1.6} />
      <span
        className={cn(
          'font-sans text-[13.5px] flex-1 tracking-tight05',
          active ? 'font-semibold text-ink' : 'font-medium text-ink2',
        )}
      >
        {label}
      </span>
      {badge && <span className="font-mono text-10 text-ink4">{badge}</span>}
    </Link>
  );
}

interface AppSidebarProps {
  historyCount?: number;
}

export function AppSidebar({ historyCount }: AppSidebarProps) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const initial = user?.email?.[0]?.toLowerCase() ?? 'g';

  return (
    <aside className="w-[240px] h-full bg-surface border-r border-border flex flex-col p-[14px] shrink-0">
      <div className="px-2 pt-[10px] pb-[22px]">
        <SignaLogo />
        <div className="ml-[38px] mt-1">
          <span className="font-mono text-10 text-ink4 tracking-wide2">v2.0 · open</span>
        </div>
      </div>

      <div className="flex flex-col gap-[2px] flex-1">
        <p className="font-mono text-10 text-ink4 px-3 pt-1 pb-2 uppercase tracking-wide3">
          Workspace
        </p>
        <SideNavItem
          Icon={IcTranslator}
          label="Traductor"
          to="/app"
          active={pathname.startsWith('/app')}
        />
        <SideNavItem
          Icon={IcHistory}
          label="Historial"
          to="/history"
          badge={historyCount ? String(historyCount) : undefined}
          active={pathname.startsWith('/history')}
        />
        <SideNavItem Icon={IcDictionary} label="Diccionario" to="/dictionary" />

        <p className="font-mono text-10 text-ink4 px-3 pt-5 pb-2 uppercase tracking-wide3">
          Cuenta
        </p>
        <SideNavItem Icon={IcSettings} label="Ajustes" to="/settings" />
        <SideNavItem Icon={IcHelp} label="Ayuda" to="/about" active={pathname === '/about'} />
      </div>

      <div className="pt-[14px] border-t border-border">
        {user ? (
          <div className="flex items-center gap-[10px] py-[6px] px-2">
            <div className="w-[30px] h-[30px] rounded-full bg-ink text-white flex items-center justify-center font-serif italic text-14">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[12.5px] font-semibold text-ink truncate tracking-tight05">
                {user.email}
              </p>
              <p className="font-mono text-10 text-ink4 tracking-wide1">Cuenta</p>
            </div>
            <button
              type="button"
              aria-label="Cerrar sesión"
              onClick={logout}
              className="w-7 h-7 flex items-center justify-center rounded-6 text-ink4 hover:bg-surface2 hover:text-ink transition-colors"
            >
              <IcLogout s={14} />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center justify-center w-full h-[38px] rounded-8 bg-ink text-white font-sans text-13 font-semibold hover:bg-black transition-colors"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </aside>
  );
}
