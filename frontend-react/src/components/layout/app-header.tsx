import { IcBell, IcChevronRight, IcHelp } from '@/components/brand/icons';

interface AppHeaderProps {
  title: string;
  status?: 'idle' | 'active' | 'error';
}

export function AppHeader({ title, status = 'idle' }: AppHeaderProps) {
  const statusLabel =
    status === 'active' ? 'SESIÓN ACTIVA' : status === 'error' ? 'ERROR' : 'INACTIVO';
  return (
    <header className="h-[60px] bg-surface border-b border-border flex items-center justify-between px-7 shrink-0">
      <div className="flex items-center gap-3">
        <span className="font-mono text-11 text-ink4 tracking-wide2">workspace</span>
        <IcChevronRight s={11} w={1.5} />
        <span className="font-sans text-14 font-semibold text-ink tracking-tight05">{title}</span>
        <span className="font-mono text-10 text-ink3 px-2 py-[3px] rounded-full bg-surface2 ml-1 tracking-wide1">
          {statusLabel}
        </span>
      </div>
      <div className="flex gap-[6px] text-ink3">
        <button
          type="button"
          aria-label="Notificaciones"
          className="w-[34px] h-[34px] rounded-8 bg-transparent hover:bg-surface2 flex items-center justify-center"
        >
          <IcBell s={16} w={1.6} />
        </button>
        <button
          type="button"
          aria-label="Ayuda"
          className="w-[34px] h-[34px] rounded-8 bg-transparent hover:bg-surface2 flex items-center justify-center"
        >
          <IcHelp s={16} w={1.6} />
        </button>
      </div>
    </header>
  );
}
