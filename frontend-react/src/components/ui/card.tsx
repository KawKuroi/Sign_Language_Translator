import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('bg-surface border border-border rounded-16 p-6', className)}
      {...rest}
    />
  ),
);
Card.displayName = 'Card';
