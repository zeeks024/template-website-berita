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
    case 'cyan': return 'text-cyan-400 group-hover:text-cyan-300';
    case 'emerald': return 'text-emerald-400 group-hover:text-emerald-300';
    case 'purple': return 'text-purple-400 group-hover:text-purple-300';
    case 'amber': return 'text-amber-400 group-hover:text-amber-300';
    case 'red': return 'text-red-400 group-hover:text-red-300';
    case 'blue': return 'text-blue-400 group-hover:text-blue-300';
    default: return 'text-cyan-400 group-hover:text-cyan-300';
  }
};

export const QuickActions = ({ actions }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Link key={index} href={action.href} className="block group">
          <Card className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center hover:scale-[1.02] hover:border-white/20 hover:bg-admin-surface-hover transition-all duration-300 cursor-pointer">
            <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${getColorClasses(action.color)}`}>
              {action.icon}
            </div>
            <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
              {action.label}
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
};
