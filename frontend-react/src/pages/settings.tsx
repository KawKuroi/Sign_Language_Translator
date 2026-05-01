import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { MobileHeader } from '@/components/layout/mobile-header';
import { MobileBottomNav } from '@/components/layout/mobile-bottomnav';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Divider } from '@/components/ui/divider';
import { useIsMobile } from '@/hooks/use-media-query';
import { useAuth } from '@/lib/auth';
import { localHistory } from '@/lib/local-history';
import { useToast } from '@/components/ui/toast';

function SettingsContent() {
  const navigate = useNavigate();
  const { user, logout, deleteAccount } = useAuth();
  const { toast } = useToast();

  const [localCount, setLocalCount] = useState(() => localHistory.list().length);
  const [confirmStep, setConfirmStep] = useState<'idle' | 'typing'>('idle');
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleClearLocal = () => {
    localHistory.clear();
    setLocalCount(0);
    toast({ title: 'Historial local eliminado', variant: 'success' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = async () => {
    if (typed !== user?.email) return;
    setDeleting(true);
    try {
      await deleteAccount();
      toast({ title: 'Cuenta eliminada', description: 'Todos tus datos han sido borrados.', variant: 'success' });
      navigate('/');
    } catch {
      toast({ title: 'No se pudo eliminar la cuenta', description: 'Intenta de nuevo más tarde.', variant: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl flex flex-col gap-5">
      {/* Cuenta */}
      <div className="bg-surface border border-border rounded-12 p-6">
        <SectionLabel emphasized>Cuenta</SectionLabel>
        <p className="font-mono text-10 text-ink4 tracking-wide2 uppercase mt-5 mb-1">Correo</p>
        <p className="font-sans text-15 text-ink">{user?.email}</p>
        <Divider className="my-5" />
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      {/* Datos locales */}
      <div className="bg-surface border border-border rounded-12 p-6">
        <SectionLabel emphasized>Datos locales</SectionLabel>
        <p className="font-sans text-14 text-ink3 mt-3 leading-[1.6]">
          Tu navegador puede guardar hasta 200 traducciones cuando estás sin sesión activa.
          Puedes borrarlas en cualquier momento — no afecta tu historial sincronizado.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4"
          onClick={handleClearLocal}
          disabled={localCount === 0}
        >
          {localCount > 0 ? `Limpiar historial local (${localCount})` : 'Sin datos locales'}
        </Button>
      </div>

      {/* Zona peligrosa */}
      <div className="bg-surface border border-danger/40 rounded-12 p-6">
        <SectionLabel emphasized className="text-danger">Zona peligrosa</SectionLabel>
        <h3 className="font-sans text-18 font-semibold text-ink mt-3">
          Eliminar <span className="font-serif italic font-normal">cuenta</span>
        </h3>
        <p className="font-sans text-14 text-ink3 mt-2 leading-[1.6]">
          Esta acción es permanente e irreversible. Se eliminarán tu cuenta y todo el historial
          sincronizado en el servidor.
        </p>

        {confirmStep === 'idle' && (
          <Button
            variant="danger"
            size="sm"
            className="mt-4"
            onClick={() => setConfirmStep('typing')}
          >
            Eliminar cuenta
          </Button>
        )}

        {confirmStep === 'typing' && (
          <div className="mt-4 flex flex-col gap-3">
            <p className="font-sans text-13 text-ink3">
              Escribe tu correo <span className="font-semibold text-ink">{user?.email}</span> para confirmar:
            </p>
            <Input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={user?.email}
              className="max-w-sm"
            />
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setConfirmStep('idle'); setTyped(''); }}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                size="sm"
                disabled={typed !== user?.email || deleting}
                onClick={handleDelete}
              >
                {deleting ? 'Eliminando…' : 'Confirmar eliminación'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SettingsPage(): ReactNode {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-bg overflow-hidden">
        <MobileHeader />
        <div className="flex-1 overflow-auto px-4 py-4">
          <SettingsContent />
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Ajustes" />
        <div className="flex-1 p-6 overflow-auto bg-bg">
          <SettingsContent />
        </div>
      </main>
    </div>
  );
}
