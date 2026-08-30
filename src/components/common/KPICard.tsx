import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  trendLabel?: string;
  statusText?: string;
  statusLevel?: 'normal' | 'moderate' | 'warning' | 'high' | 'critical' | 'info';
  icon: React.ReactNode;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  trend,
  trendValue,
  trendLabel,
  statusText,
  statusLevel = 'normal',
  icon,
  subtitle,
  onClick,
  className = '',
}) => {
  const getStatusBadge = () => {
    if (!statusText) return null;
    const styles = {
      normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      moderate: 'bg-amber-50 text-amber-700 border-amber-200',
      warning: 'bg-amber-100 text-amber-800 border-amber-300',
      high: 'bg-orange-50 text-orange-700 border-orange-200',
      critical: 'bg-rose-50 text-rose-700 border-rose-200',
      info: 'bg-govblue-50 text-govblue-700 border-govblue-200',
    };
    return (
      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${styles[statusLevel]}`}>
        {statusText}
      </span>
    );
  };

  const renderTrend = () => {
    if (!trend && !trendValue) return null;
    const isGood = (trend === 'up' && statusLevel !== 'critical') || (trend === 'down' && (title.includes('Delay') || title.includes('Disruption')));
    const color = isGood ? 'text-emerald-600' : trend === 'stable' ? 'text-slate-500' : 'text-rose-600';

    return (
      <div className={`flex items-center gap-1 text-xs font-medium ${color}`}>
        {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
        {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
        {trend === 'stable' && <Minus className="w-3.5 h-3.5" />}
        <span>{trendValue}</span>
        {trendLabel && <span className="text-slate-400 font-normal ml-0.5">{trendLabel}</span>}
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-slate-200/90 p-4 shadow-card hover:shadow-elevated transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-govblue-300' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider line-clamp-1">{title}</span>
        <div className="p-2 rounded-md bg-slate-50 text-navy-800 border border-slate-100 shrink-0">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-2xl lg:text-3xl font-extrabold text-navy-950 tracking-tight font-sans">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-slate-500">{unit}</span>}
      </div>

      <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100">
        <div>{renderTrend()}</div>
        <div>{getStatusBadge()}</div>
      </div>

      {subtitle && <div className="text-[11px] text-slate-400 mt-1">{subtitle}</div>}
    </div>
  );
};
