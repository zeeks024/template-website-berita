import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  icon: React.ReactNode;
  iconColor: 'cyan' | 'emerald' | 'purple' | 'amber' | 'red' | 'blue';
  value: string | number;
  label: string;
  trend?: { value: number; isUp: boolean };
}

const colorMap = {
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20'
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20'
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20'
  },
  red: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/20'
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20'
  }
};

export const StatCard = ({ icon, iconColor, value, label, trend }: StatCardProps) => {
  const colors = colorMap[iconColor] || colorMap.cyan;

  return (
    <Card className="relative overflow-hidden group hover:border-border transition-colors duration-300">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
          <h3 className="text-3xl font-black text-foreground tracking-tight">{value}</h3>
          
          {trend && (
            <div className={`flex items-center gap-2 mt-2 text-sm font-medium ${trend.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend.isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{trend.value}%</span>
              <span className="text-muted-foreground text-xs font-normal uppercase">vs last month</span>
            </div>
          )}
        </div>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colors.bg} ${colors.text} ${colors.border}`}>
          {icon}
        </div>
      </div>

      <div className={`absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-5 transition-opacity duration-500 transform group-hover:scale-110 ${colors.text}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 96, strokeWidth: 1 })}
      </div>
    </Card>
  );
};
