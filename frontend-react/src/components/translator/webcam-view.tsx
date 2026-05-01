import { forwardRef } from 'react';
import Webcam from 'react-webcam';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WebcamViewProps {
  isActive: boolean;
  currentLetter?: string | null;
  confidence?: number;
  className?: string;
  onUserMediaError?: (e: string | DOMException) => void;
  onUserMedia?: (stream: MediaStream) => void;
}

export const WebcamView = forwardRef<Webcam, WebcamViewProps>(
  (
    { isActive, currentLetter, confidence = 0, className, onUserMediaError, onUserMedia },
    ref,
  ) => (
    <div
      className={cn(
        'relative w-full aspect-[4/3] rounded-16 overflow-hidden bg-black',
        className,
      )}
    >
      <Webcam
        ref={ref}
        audio={false}
        mirrored
        className="w-full h-full object-cover"
        screenshotFormat="image/jpeg"
        screenshotQuality={0.8}
        videoConstraints={{ facingMode: 'user', width: 640, height: 480 }}
        onUserMediaError={onUserMediaError}
        onUserMedia={onUserMedia}
      />
      {isActive && (
        <div className="absolute top-3 left-3 flex items-center gap-[6px] bg-white/8 backdrop-blur-md border border-white/12 rounded-full px-[9px] py-1">
          <span className="w-[5px] h-[5px] rounded-full bg-ok pulse-dot" aria-hidden="true" />
          <span className="font-mono text-9 font-medium text-white tracking-wide3">EN VIVO</span>
        </div>
      )}
      {currentLetter && (
        <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-lg border border-white/8 rounded-8 px-[14px] py-[10px] flex items-center justify-between">
          <div>
            <p className="font-mono text-9 text-white/50 mb-[4px] tracking-wide3">DETECTADO</p>
            <p className="font-serif italic text-white text-32 leading-none">{currentLetter}</p>
          </div>
          <Badge variant="outline_white">
            {(confidence * 100).toFixed(0)}%
          </Badge>
        </div>
      )}
    </div>
  ),
);
WebcamView.displayName = 'WebcamView';
