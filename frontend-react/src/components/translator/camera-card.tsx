import { forwardRef, type ReactNode } from 'react';
import type Webcam from 'react-webcam';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { IcCamera, IcCameraOff, IcLock } from '@/components/brand/icons';
import { WebcamView } from './webcam-view';

export type CameraPermission = 'idle' | 'granted' | 'denied' | 'error';

interface CameraCardProps {
  permission: CameraPermission;
  isActive: boolean;
  currentLetter?: string | null;
  confidence?: number;
  onEnable: () => void;
  onUserMedia?: (stream: MediaStream) => void;
  onUserMediaError?: (e: string | DOMException) => void;
  size?: 'desktop' | 'mobile';
  footer?: ReactNode;
}

export const CameraCard = forwardRef<Webcam, CameraCardProps>(
  (
    {
      permission,
      isActive,
      currentLetter,
      confidence,
      onEnable,
      onUserMedia,
      onUserMediaError,
      size = 'desktop',
      footer,
    },
    ref,
  ) => {
    if (permission === 'granted') {
      return (
        <Card className="p-3 flex flex-col gap-3" style={{ minHeight: size === 'desktop' ? 440 : 360 }}>
          <WebcamView
            ref={ref}
            isActive={isActive}
            currentLetter={currentLetter}
            confidence={confidence}
            onUserMedia={onUserMedia}
            onUserMediaError={onUserMediaError}
          />
          {footer}
        </Card>
      );
    }

    const denied = permission === 'denied' || permission === 'error';
    const title = denied ? 'Permiso denegado' : 'requerido';
    const desc = denied
      ? 'Habilita el acceso a la cámara desde la configuración de tu navegador para usar Signa.'
      : 'Para iniciar la traducción del alfabeto ASL, otorga permiso a Signa para acceder a tu cámara. Los frames se descartan tras la inferencia — solo se guarda el texto.';

    return (
      <Card
        className="flex items-center justify-center relative overflow-hidden"
        style={{ minHeight: size === 'desktop' ? 440 : 360 }}
      >
        <div className="flex flex-col items-center gap-6 max-w-[420px] text-center px-4">
          <div className="relative" style={{ width: size === 'desktop' ? 180 : 150, height: size === 'desktop' ? 180 : 150 }}>
            <div className="absolute inset-0 rounded-full border border-dashed border-ink5" />
            <div
              className="absolute bg-surface2 border border-border rounded-20 flex items-center justify-center text-ink4"
              style={{ inset: size === 'desktop' ? 22 : 18 }}
            >
              <IcCameraOff s={size === 'desktop' ? 42 : 32} w={1.4} />
            </div>
          </div>
          <div>
            <h2 className="font-sans font-semibold text-ink mb-[10px] tracking-tighter1" style={{ fontSize: size === 'desktop' ? 22 : 18 }}>
              Acceso a cámara{' '}
              <span className="font-serif italic font-normal">{title}</span>
            </h2>
            <p className="font-sans text-ink3 leading-[1.55] max-w-[360px]" style={{ fontSize: size === 'desktop' ? 14 : 13 }}>
              {desc}
            </p>
          </div>
          <div className="flex flex-col items-center gap-[10px] w-full">
            <Button
              variant="primary"
              size="md"
              icon={<IcCamera s={15} w={1.7} />}
              onClick={onEnable}
              className={size === 'mobile' ? 'w-full' : ''}
            >
              {denied ? 'Reintentar' : 'Habilitar cámara'}
            </Button>
            <div className="flex items-center gap-[6px] text-ink4">
              <IcLock s={11} w={1.6} />
              <SectionLabel>Sin almacenar frames · solo texto</SectionLabel>
            </div>
          </div>
        </div>
      </Card>
    );
  },
);
CameraCard.displayName = 'CameraCard';
