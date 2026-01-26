import React from 'react';

interface BadgeProps {
  variant: 'success' | 'warning' | 'danger' | 'default';
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

const variants = {
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  default: 'bg-muted text-muted-foreground border-border'
};

const dotColors = {
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  danger: 'bg-red-400',
  default: 'bg-muted-foreground'
};

export const Badge = ({ variant, children, dot = false, className = '' }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
};
