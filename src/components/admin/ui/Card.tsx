import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-[#0a1214] border border-white/5 rounded-[2rem] p-6 shadow-2xl shadow-black/50 ${className}`}>
      {children}
    </div>
  );
};
