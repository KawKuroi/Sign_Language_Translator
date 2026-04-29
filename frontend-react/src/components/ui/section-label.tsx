import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionLabelProps extends HTMLAttributes<HTMLSpanElement> {
  emphasized?: boolean;
}

export function SectionLabel({ className, emphasized, ...rest }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-mono font-medium text-11 uppercase tracking-wide2',
        emphasized ? 'text-ink' : 'text-ink4',
        className,
      )}
      {...rest}
    />
  );
}
