import { forwardRef, type LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...rest }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block font-mono text-10 text-ink4 mb-2 uppercase tracking-wide2',
        className,
      )}
      {...rest}
    />
  ),
);
Label.displayName = 'Label';
