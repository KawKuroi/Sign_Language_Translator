import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeStyles = cva(
  'inline-flex items-center gap-[5px] h-6 px-[10px] rounded-full font-mono font-medium text-11 tracking-wide1 whitespace-nowrap',
  {
    variants: {
      variant: {
        dark: 'bg-ink text-white',
        light: 'bg-surface2 text-ink2 border border-border',
        mono: 'bg-surface text-ink3 border border-border',
        outline_white: 'bg-transparent text-white/85 border border-white/20',
        ok: 'bg-ok/15 text-ok',
      },
    },
    defaultVariants: { variant: 'dark' },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStyles> {}

export function Badge({ className, variant, ...rest }: BadgeProps) {
  return <span className={cn(badgeStyles({ variant }), className)} {...rest} />;
}
