import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, subtitle, action, className = '' }: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 ${className}`}>
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/40 text-sm font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};
