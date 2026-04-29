import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...rest }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'w-full h-[42px] px-[14px] rounded-8 border border-border bg-bg text-14 text-ink placeholder:text-ink4',
        'outline-none transition-colors duration-150',
        'focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'aria-[invalid=true]:border-danger aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger/15',
        className,
      )}
      {...rest}
    />
  ),
);
Input.displayName = 'Input';
