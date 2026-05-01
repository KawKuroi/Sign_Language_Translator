import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { MobileHeader } from '@/components/layout/mobile-header';
import { MobileBottomNav } from '@/components/layout/mobile-bottomnav';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';
import { IcHistory } from '@/components/brand/icons';
import { useIsMobile } from '@/hooks/use-media-query';
import { historyApi, type HistoryItem } from '@/lib/api';
import { localHistory } from '@/lib/local-history';
import { useAuth } from '@/lib/auth';

interface HistoryItemWithOrigin extends HistoryItem {
  _origin: 'local' | 'remote';
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('es', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function HistoryList({
  items,
  loading,
  error,
  onClearLocal,
  hasLocal,
}: {
  items: HistoryItemWithOrigin[];
  loading: boolean;
  error: string | null;
  onClearLocal: () => void;
  hasLocal: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <SectionLabel>Cargando historial…</SectionLabel>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-16">
        <SectionLabel>{error}</SectionLabel>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="w-[120px] h-[120px] rounded-full border border-dashed border-ink5 flex items-center justify-center text-ink4">
          <IcHistory s={36} w={1.4} />
        </div>
        <h3 className="font-sans text-22 font-semibold text-ink tracking-tighter1">
          Sin <span className="font-serif italic font-normal">traducciones</span>
        </h3>
        <p className="font-sans text-14 text-ink3 max-w-sm">
          Cuando guardes una traducción aparecerá aquí.
        </p>
        <Link to="/app">
          <Button variant="primary" size="md">
            Ir al traductor
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {hasLocal && (
        <div className="flex items-center justify-between">
          <SectionLabel>Guardadas localmente</SectionLabel>
          <Button variant="ghost" size="sm" onClick={onClearLocal}>
            Limpiar locales
          </Button>
        </div>
      )}
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={`${item._origin}-${item.id}`}
            className="bg-surface border border-border rounded-12 p-4 flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="font-serif italic text-ink text-20 tracking-tight1 break-all">
                {item.text}
              </p>
              <p className="font-mono text-10 text-ink4 mt-1 tracking-wide1">
                {formatDate(item.savedAt)}
              </p>
            </div>
            <span className="font-mono text-9 text-ink4 tracking-wide2 uppercase shrink-0">
              {item._origin === 'local' ? 'local' : 'sync'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HistoryPage() {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [items, setItems] = useState<HistoryItemWithOrigin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = () => {
    let alive = true;
    setLoading(true);

    const localItems: HistoryItemWithOrigin[] = localHistory.list().map((i) => ({
      ...i,
      _origin: 'local',
    }));

    if (!user) {
      setItems(localItems);
      setLoading(false);
      return () => { alive = false; };
    }

    historyApi
      .list()
      .then((remoteItems) => {
        if (!alive) return;
        const remote: HistoryItemWithOrigin[] = remoteItems.map((i) => ({
          ...i,
          _origin: 'remote',
        }));
        const remoteKeys = new Set(remote.map((i) => `${i.text}|${i.savedAt}`));
        const filteredLocal = localItems.filter(
          (i) => !remoteKeys.has(`${i.text}|${i.savedAt}`),
        );
        const merged = [...remote, ...filteredLocal].sort((a, b) =>
          b.savedAt.localeCompare(a.savedAt),
        );
        setItems(merged);
      })
      .catch(() => {
        if (alive) {
          setError('No se pudo cargar el historial del servidor.');
          setItems(localItems);
        }
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => { alive = false; };
  };

  useEffect(() => {
    const cleanup = loadItems();
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleClearLocal = () => {
    localHistory.clear();
    loadItems();
  };

  const hasLocal = items.some((i) => i._origin === 'local');

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-bg overflow-hidden">
        <MobileHeader />
        <div className="px-5 pt-[14px] flex items-center justify-between">
          <SectionLabel emphasized>Historial</SectionLabel>
          <span className="font-mono text-10 text-ink4 tracking-wide1">{items.length} items</span>
        </div>
        <div className="flex-1 px-4 py-3 overflow-auto">
          <HistoryList
            items={items}
            loading={loading}
            error={error}
            onClearLocal={handleClearLocal}
            hasLocal={hasLocal}
          />
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <AppSidebar historyCount={items.length} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Historial" />
        <div className="flex-1 p-6 overflow-auto bg-bg">
          <HistoryList
            items={items}
            loading={loading}
            error={error}
            onClearLocal={handleClearLocal}
            hasLocal={hasLocal}
          />
        </div>
      </main>
    </div>
  );
}
