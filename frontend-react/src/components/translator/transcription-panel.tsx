import { useCallback } from 'react';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';
import { IcCopy } from '@/components/brand/icons';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

interface TranscriptionPanelProps {
  word: string;
  status: 'idle' | 'running' | 'error';
  onSave?: () => void;
  onClear?: () => void;
  onWordChange?: (newWord: string) => void;
  saving?: boolean;
}

export function TranscriptionPanel({
  word,
  status,
  onSave,
  onClear,
  onWordChange,
  saving = false,
}: TranscriptionPanelProps) {
  const { toast } = useToast();

  const handleCopy = useCallback(() => {
    if (!word) return;
    void navigator.clipboard
      .writeText(word)
      .then(() => toast({ title: 'Copiado al portapapeles', variant: 'success' }))
      .catch(() => toast({ title: 'No se pudo copiar', variant: 'error' }));
  }, [word, toast]);

  const dotColor = status === 'running' ? '#10B981' : status === 'error' ? '#DC2626' : '#D4D4D4';
  const statusLabel =
    status === 'running' ? 'Motor activo' : status === 'error' ? 'Error de motor' : 'Motor inactivo';

  return (
    <div className="bg-surface border border-border rounded-12 overflow-hidden">
      <div className="px-[18px] py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <SectionLabel emphasized>Transcripción</SectionLabel>
          <span className="font-mono text-10 text-ink4 tracking-wide1">ASL → ES</span>
        </div>
        <div className="flex items-center gap-[14px]">
          <div className="flex items-center gap-[6px]">
            <span
              className={cn('w-[6px] h-[6px] rounded-full', status === 'running' && 'pulse-dot')}
              style={{ backgroundColor: dotColor }}
              aria-hidden="true"
            />
            <SectionLabel>{statusLabel}</SectionLabel>
          </div>
          <button
            type="button"
            aria-label="Copiar transcripción"
            disabled={!word}
            onClick={handleCopy}
            className="text-ink4 hover:text-ink p-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <IcCopy s={13} w={1.5} />
          </button>
        </div>
      </div>
      <div className="px-6 py-8 min-h-[80px] flex items-center justify-center">
        {word ? (
          <span
            className="font-serif italic text-ink text-32 tracking-tighter1 text-center break-all outline-none uppercase focus:bg-surface2/50 focus:rounded-8 focus:px-3 focus:py-2 cursor-text"
            contentEditable={!!onWordChange}
            suppressContentEditableWarning
            role={onWordChange ? 'textbox' : undefined}
            aria-label={onWordChange ? 'Editar transcripción' : undefined}
            title={onWordChange ? 'Haz clic para editar' : undefined}
            onBlur={(e) => onWordChange?.((e.currentTarget.textContent ?? '').toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur(); }
            }}
          >
            {word}
          </span>
        ) : (
          <span className="font-serif italic text-ink5 text-17 tracking-tight1 text-center">
            La traducción aparecerá aquí cuando se detecten gestos…
          </span>
        )}
      </div>
      {word && (
        <div className="px-[18px] py-3 border-t border-border flex items-center justify-end gap-2">
          {onClear && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Limpiar
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            disabled={saving}
            onClick={onSave}
          >
            {saving ? 'Guardando…' : 'Guardar al historial'}
          </Button>
        </div>
      )}
    </div>
  );
}
