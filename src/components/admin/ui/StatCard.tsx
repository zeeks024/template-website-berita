import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  icon: React.ReactNode;
  iconColor: 'cyan' | 'emerald' | 'purple' | 'amber' | 'red' | 'blue';
  value: string | number;
  label: string;
  trend?: { value: number; isUp: boolean };
  loading?: boolean;
}

const colorMap = {
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/20',
    glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]'
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/20',
    glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]'
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/20',
    glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]'
  },
  red: {
    bg: 'bg-red-500/10',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-500/20',
    glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]'
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20',
    glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]'
  }
};

export const StatCard = ({ icon, iconColor, value, label, trend, loading = false }: StatCardProps) => {
  const colors = colorMap[iconColor] || colorMap.cyan;
  const iconElement = icon as React.ReactElement<{ size?: number; strokeWidth?: number }>;

  if (loading) {
    return (
      <Card className="h-full">
        <div className="animate-pulse flex items-start justify-between">
          <div className="space-y-3 w-full">
            <div className="h-3 w-20 bg-muted rounded-full"></div>
            <div className="h-8 w-16 bg-muted rounded-lg"></div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-muted"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`relative overflow-hidden group hover:border-muted-foreground/20 transition-all duration-300 ${colors.glow}`}>
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-2">{label}</p>
          <h3 className="text-4xl font-black text-foreground tracking-tighter">{value}</h3>
          
          {trend && (
            <div className={`flex items-center gap-2 mt-3 text-sm font-bold ${trend.isUp ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
              <div className={`p-1 rounded-full ${trend.isUp ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              </div>
              <span>{trend.value}%</span>
              <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-wide">vs bulan lalu</span>
            </div>
          )}
        </div>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${colors.bg} ${colors.text} ${colors.border}`}>
          {icon}
        </div>
      </div>

      <div className={`absolute -right-6 -bottom-6 opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.07] transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12 ${colors.text}`}>
        {React.cloneElement(iconElement, { size: 120, strokeWidth: 1 })}
      </div>
    </Card>
  );
};
