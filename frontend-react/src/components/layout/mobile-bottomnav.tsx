import { Link, useLocation } from 'react-router-dom';
import {
  IcDictionary,
  IcHistory,
  IcSettings,
  IcTranslator,
} from '@/components/brand/icons';
import { cn } from '@/lib/utils';
import type { ComponentType, SVGProps } from 'react';

interface Tab {
  to: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { s?: number; w?: number }>;
  match: (p: string) => boolean;
}

const tabs: Tab[] = [
  { to: '/app', label: 'Traductor', Icon: IcTranslator, match: (p) => p.startsWith('/app') },
  { to: '/history', label: 'Historial', Icon: IcHistory, match: (p) => p.startsWith('/history') },
  { to: '/dictionary', label: 'Dicc.', Icon: IcDictionary, match: (p) => p.startsWith('/dictionary') },
  { to: '/about', label: 'Más', Icon: IcSettings, match: (p) => p.startsWith('/about') || p.startsWith('/settings') },
];

export function MobileBottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="bg-surface border-t border-border flex shrink-0 pb-4">
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        const Icon = tab.Icon;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={cn(
              'flex-1 flex flex-col items-center pt-3 gap-1',
              active ? 'text-ink' : 'text-ink4',
            )}
          >
            <Icon s={20} w={active ? 1.8 : 1.5} />
            <span
              className={cn(
                'font-mono text-9 uppercase tracking-wide2',
                active ? 'font-semibold' : 'font-medium',
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
