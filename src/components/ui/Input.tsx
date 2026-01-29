"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-4 py-3.5 text-base',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            iconLeft,
            iconRight,
            size = 'md',
            fullWidth = true,
            className = '',
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || props.name || `input-${Math.random().toString(36).slice(2, 9)}`;

        const inputStyles = [
            'bg-muted border rounded-xl text-foreground placeholder:text-muted-foreground',
            'focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20',
            'transition-all',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border',
            iconLeft ? 'pl-10' : '',
            iconRight ? 'pr-10' : '',
            fullWidth ? 'w-full' : '',
            sizeStyles[size],
            className,
        ].filter(Boolean).join(' ');

        return (
            <div className={fullWidth ? 'w-full' : ''}>
                {label && (
                    <label 
                        htmlFor={inputId}
                        className="block text-sm font-medium text-foreground mb-1.5"
                    >
                        {label}
                    </label>
                )}
                
                <div className="relative">
                    {iconLeft && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                            {iconLeft}
                        </div>
                    )}
                    
                    <input
                        ref={ref}
                        id={inputId}
                        className={inputStyles}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                        {...props}
                    />
                    
                    {iconRight && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {iconRight}
                        </div>
                    )}
                </div>

                {error && (
                    <p 
                        id={`${inputId}-error`}
                        className="mt-1.5 text-sm text-red-500 font-medium"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
                
                {!error && helperText && (
                    <p 
                        id={`${inputId}-helper`}
                        className="mt-1.5 text-sm text-muted-foreground"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
