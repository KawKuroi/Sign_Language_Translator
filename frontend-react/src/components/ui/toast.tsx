import * as ToastPrimitive from '@radix-ui/react-toast';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant?: 'default' | 'error' | 'success';
}

interface ToastContextValue {
  toast: (t: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((t: Omit<ToastItem, 'id'>) => {
    setItems((prev) => [...prev, { ...t, id: Date.now() + Math.random() }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={4000}>
        {children}
        {items.map((it) => (
          <ToastPrimitive.Root
            key={it.id}
            onOpenChange={(open) => {
              if (!open) setItems((prev) => prev.filter((p) => p.id !== it.id));
            }}
            className={cn(
              'bg-surface border border-border rounded-12 p-4 shadow-lg',
              'data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full',
              it.variant === 'error' && 'border-danger/40',
              it.variant === 'success' && 'border-ok/40',
            )}
          >
            <ToastPrimitive.Title className="font-sans text-14 font-semibold text-ink">
              {it.title}
            </ToastPrimitive.Title>
            {it.description && (
              <ToastPrimitive.Description className="font-sans text-13 text-ink3 mt-1">
                {it.description}
              </ToastPrimitive.Description>
            )}
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport
          className="fixed bottom-4 right-4 flex flex-col gap-2 w-[360px] max-w-[calc(100vw-2rem)] z-[100] outline-none"
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx;
}
