import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white dark:bg-[hsl(var(--admin-surface))] border border-border dark:border-white/5 rounded-[2rem] p-6 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};
