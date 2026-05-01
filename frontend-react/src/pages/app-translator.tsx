import { useCallback, useEffect, useRef, useState } from 'react';
import type Webcam from 'react-webcam';
import axios from 'axios';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AppStatusBar } from '@/components/layout/app-statusbar';
import { MobileHeader } from '@/components/layout/mobile-header';
import { MobileBottomNav } from '@/components/layout/mobile-bottomnav';
import { CameraCard, type CameraPermission } from '@/components/translator/camera-card';
import { TranscriptionPanel } from '@/components/translator/transcription-panel';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useIsMobile } from '@/hooks/use-media-query';
import { useTranslator } from '@/hooks/use-translator';
import { useAuth } from '@/lib/auth';
import { historyApi } from '@/lib/api';
import { localHistory } from '@/lib/local-history';

export default function AppTranslatorPage() {
  const isMobile = useIsMobile();
  const webcamRef = useRef<Webcam>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const [permission, setPermission] = useState<CameraPermission>('idle');
  const [requested, setRequested] = useState(false);
  const [saving, setSaving] = useState(false);

  const translator = useTranslator({ webcamRef });
  const { isActive, start, stop, engineStatus, error } = translator;

  const handleEnable = useCallback(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setPermission('error');
      toast({ title: 'Cámara no disponible', description: 'Tu navegador no soporta acceso a cámara.', variant: 'error' });
      return;
    }
    setRequested(true);
    setPermission('granted'); // let react-webcam handle the actual getUserMedia call
  }, [toast]);

  const handleUserMediaError = useCallback((err: string | DOMException) => {
    const name = typeof err === 'string' ? err : err.name;
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      setPermission('denied');
      toast({ title: 'Permiso denegado', description: 'Habilita la cámara en la configuración del navegador.', variant: 'error' });
    } else {
      setPermission('error');
      toast({ title: 'No se pudo acceder a la cámara', variant: 'error' });
    }
  }, [toast]);

  useEffect(() => {
    if (permission === 'granted' && !isActive && requested) {
      start();
    }
    if (permission !== 'granted' && isActive) {
      stop();
    }
  }, [permission, isActive, requested, start, stop]);

  useEffect(() => {
    if (engineStatus === 'error' && error) {
      toast({ title: 'Error de traducción', description: error, variant: 'error' });
    }
  }, [engineStatus, error, toast]);

  const handleSave = async () => {
    if (!translator.word) return;
    setSaving(true);
    try {
      if (user) {
        await historyApi.save(translator.word);
        toast({ title: 'Traducción guardada', variant: 'success' });
      } else {
        localHistory.save(translator.word);
        toast({ title: 'Guardada localmente', description: 'Inicia sesión para sincronizar.', variant: 'success' });
      }
      translator.reset();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localHistory.save(translator.word);
        toast({ title: 'Sesión expirada — guardada localmente', variant: 'success' });
        translator.reset();
      } else {
        toast({ title: 'No se pudo guardar', variant: 'error' });
      }
    } finally {
      setSaving(false);
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-bg overflow-hidden">
        <MobileHeader />
        <div className="px-5 pt-[14px] flex items-center justify-between">
          <SectionLabel emphasized>Traductor</SectionLabel>
          <span className="font-mono text-10 text-ink4 tracking-wide1">ASL → ES</span>
        </div>
        <div className="flex-1 px-4 py-3 flex flex-col gap-3 overflow-auto">
          <CameraCard
            ref={webcamRef}
            size="mobile"
            permission={permission}
            isActive={translator.isActive}
            currentLetter={translator.currentLetter}
            confidence={translator.confidence}
            onEnable={handleEnable}
            onUserMediaError={handleUserMediaError}
            footer={
              permission === 'granted' && (
                <div className="flex justify-center gap-2 pt-2">
                  <Button
                    variant={translator.isActive ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => (translator.isActive ? translator.stop() : translator.start())}
                  >
                    {translator.isActive ? 'Pausar' : 'Reanudar'}
                  </Button>
                </div>
              )
            }
          />
          <TranscriptionPanel
            word={translator.word}
            status={translator.engineStatus}
            onSave={handleSave}
            onClear={translator.reset}
            onWordChange={translator.setWord}
            saving={saving}
          />
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Traductor" status={translator.isActive ? 'active' : translator.engineStatus === 'error' ? 'error' : 'idle'} />
        <div className="flex-1 p-6 flex flex-col gap-4 overflow-auto bg-bg">
          <CameraCard
            ref={webcamRef}
            size="desktop"
            permission={permission}
            isActive={translator.isActive}
            currentLetter={translator.currentLetter}
            confidence={translator.confidence}
            onEnable={handleEnable}
            onUserMediaError={handleUserMediaError}
            footer={
              permission === 'granted' && (
                <div className="flex justify-center gap-2 pt-2">
                  <Button
                    variant={translator.isActive ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => (translator.isActive ? translator.stop() : translator.start())}
                  >
                    {translator.isActive ? 'Pausar traducción' : 'Reanudar traducción'}
                  </Button>
                </div>
              )
            }
          />
          <TranscriptionPanel
            word={translator.word}
            status={translator.engineStatus}
            onSave={handleSave}
            onClear={translator.reset}
            onWordChange={translator.setWord}
            saving={saving}
          />
        </div>
        <AppStatusBar
          cameraActive={permission === 'granted'}
          modelLoaded={translator.engineStatus !== 'error'}
        />
      </main>
    </div>
  );
}
