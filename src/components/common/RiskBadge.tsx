import React from 'react';
import { SeverityLevel } from '../../types';

interface RiskBadgeProps {
  level: SeverityLevel;
  className?: string;
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className = '' }) => {
  const getStyle = () => {
    switch (level.toLowerCase()) {
      case 'critical':
        return 'bg-rose-100/90 text-rose-800 border-rose-300';
      case 'high':
        return 'bg-orange-100/90 text-orange-800 border-orange-300';
      case 'warning':
      case 'moderate':
        return 'bg-amber-100/90 text-amber-800 border-amber-300';
      case 'low':
      case 'normal':
        return 'bg-emerald-100/90 text-emerald-800 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider border ${getStyle()} ${className}`}>
      {level}
    </span>
  );
};
