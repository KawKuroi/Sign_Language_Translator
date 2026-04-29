import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function AppTranslatorPage() {
  const isMobile = useIsMobile();
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [permission, setPermission] = useState<CameraPermission>('idle');
  const [requested, setRequested] = useState(false);
  const [saving, setSaving] = useState(false);

  const translator = useTranslator({ webcamRef });

  const handleEnable = useCallback(async () => {
    setRequested(true);
    if (!navigator.mediaDevices?.getUserMedia) {
      setPermission('error');
      toast({ title: 'Cámara no disponible', description: 'Tu navegador no soporta acceso a cámara.', variant: 'error' });
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      stream.getTracks().forEach((t) => t.stop());
      setPermission('granted');
    } catch (err) {
      const name = (err as DOMException)?.name;
      if (name === 'NotAllowedError') {
        setPermission('denied');
        toast({ title: 'Permiso denegado', description: 'Habilita la cámara en la configuración del navegador.', variant: 'error' });
      } else {
        setPermission('error');
        toast({ title: 'No se pudo acceder a la cámara', variant: 'error' });
      }
    }
  }, [toast]);

  useEffect(() => {
    if (permission === 'granted' && !translator.isActive && requested) {
      translator.start();
    }
    if (permission !== 'granted' && translator.isActive) {
      translator.stop();
    }
  }, [permission, translator, requested]);

  useEffect(() => {
    if (translator.engineStatus === 'error' && translator.error) {
      toast({ title: 'Error de traducción', description: translator.error, variant: 'error' });
    }
  }, [translator.engineStatus, translator.error, toast]);

  const handleSave = async () => {
    if (!translator.word) return;
    setSaving(true);
    try {
      await historyApi.save(translator.word);
      toast({ title: 'Traducción guardada', variant: 'success' });
      translator.reset();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast({ title: 'Sesión expirada', description: 'Inicia sesión de nuevo.', variant: 'error' });
        navigate('/login', { state: { from: { pathname: '/app' } } });
      } else {
        toast({ title: 'No se pudo guardar', variant: 'error' });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleLoginPrompt = () => {
    navigate('/login', { state: { from: { pathname: '/app' } } });
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
            isAuthenticated={!!user}
            onSave={handleSave}
            onClear={translator.reset}
            onLoginPrompt={handleLoginPrompt}
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
            isAuthenticated={!!user}
            onSave={handleSave}
            onClear={translator.reset}
            onLoginPrompt={handleLoginPrompt}
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
