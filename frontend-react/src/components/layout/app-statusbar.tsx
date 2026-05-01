import { SectionLabel } from '@/components/ui/section-label';
import { cn } from '@/lib/utils';

interface AppStatusBarProps {
  cameraActive: boolean;
  modelLoaded: boolean;
}

export function AppStatusBar({ cameraActive, modelLoaded }: AppStatusBarProps) {
  const items = [
    { color: cameraActive ? '#10B981' : '#D4D4D4', label: cameraActive ? 'Cámara activa' : 'Cámara inactiva' },
    { color: modelLoaded ? '#10B981' : '#D4D4D4', label: modelLoaded ? 'Modelo cargado' : 'Modelo desconectado' },
  ];
  return (
    <div className="h-[30px] bg-surface border-t border-border flex items-center px-6 shrink-0">
      <div className="flex gap-[18px]">
        {items.map((s) => (
          <div key={s.label} className="flex items-center gap-[6px]">
            <span
              className={cn('w-[6px] h-[6px] rounded-full')}
              style={{ backgroundColor: s.color }}
              aria-hidden="true"
            />
            <SectionLabel>{s.label}</SectionLabel>
          </div>
        ))}
      </div>
    </div>
  );
}
