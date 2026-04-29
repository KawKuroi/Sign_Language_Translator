import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonStyles = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-sans font-semibold tracking-tight05 rounded-8 border border-transparent transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-white hover:bg-black',
        secondary: 'bg-surface text-ink border-border hover:bg-surface2',
        ghost: 'bg-transparent text-ink2 hover:bg-surface2',
        white: 'bg-white text-ink hover:bg-surface2',
        outline_white: 'bg-transparent text-white border-white/20 hover:bg-white/10',
        danger: 'bg-danger text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-[34px] px-[14px] text-13 gap-[6px]',
        md: 'h-[42px] px-[18px] text-14 gap-[8px]',
        lg: 'h-[52px] px-[24px] text-15 gap-[10px]',
        icon: 'h-[34px] w-[34px] p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, iconRight, children, type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonStyles({ variant, size }), className)}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  ),
);
Button.displayName = 'Button';
