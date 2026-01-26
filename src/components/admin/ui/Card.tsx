import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-card border border-border rounded-[2rem] p-6 shadow-2xl shadow-black/10 dark:shadow-black/50 ${className}`}>
      {children}
    </div>
  );
};
