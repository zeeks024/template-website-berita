import React from 'react';
import Link from 'next/link';
import { Card } from './Card';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  href: string;
  color?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const getColorClasses = (color?: string) => {
  switch (color) {
    case 'cyan': return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white dark:group-hover:text-cyan-950';
    case 'emerald': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:text-emerald-950';
    case 'purple': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white dark:group-hover:text-purple-950';
    case 'amber': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white dark:group-hover:text-amber-950';
    case 'red': return 'bg-red-500/10 text-red-600 dark:text-red-400 group-hover:bg-red-500 group-hover:text-white dark:group-hover:text-red-950';
    case 'blue': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white dark:group-hover:text-blue-950';
    default: return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white dark:group-hover:text-cyan-950';
  }
};

export const QuickActions = ({ actions }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Link key={index} href={action.href} className="block group">
          <Card className="h-full flex flex-col items-center justify-center gap-4 p-6 text-center hover:border-cyan-500/30 dark:hover:border-cyan-400/30 hover:bg-muted/50 dark:hover:bg-[hsl(var(--admin-surface-hover))] hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${getColorClasses(action.color)}`}>
              {action.icon}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {action.label}
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
};
