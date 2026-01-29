"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    fullWidth?: boolean;
    pill?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30',
    secondary: 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground',
    ghost: 'bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20',
    outline: 'bg-transparent border border-border hover:bg-muted text-foreground',
    gradient: 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-2 text-xs gap-1.5',
    md: 'px-4 py-3 text-sm gap-2',
    lg: 'px-6 py-3.5 text-sm gap-2',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            loading = false,
            iconLeft,
            iconRight,
            fullWidth = false,
            pill = false,
            disabled,
            className = '',
            children,
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || loading;

        const baseStyles = [
            'inline-flex items-center justify-center font-bold transition-all',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-background',
            pill ? 'rounded-full' : 'rounded-xl',
            fullWidth ? 'w-full' : '',
            variantStyles[variant],
            sizeStyles[size],
            className,
        ].filter(Boolean).join(' ');

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={baseStyles}
                {...props}
            >
                {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : iconLeft ? (
                    iconLeft
                ) : null}
                {children}
                {!loading && iconRight}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
