import { SeverityLevel } from '../types';

export const formatPercent = (val: number): string => {
  return `${val.toFixed(1)}%`;
};

export const formatDelay = (minutes: number): string => {
  if (minutes === 0) return 'On Time';
  if (minutes < 60) return `+${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `+${hrs}h ${mins}m` : `+${hrs}h`;
};

export const getSeverityBadgeStyle = (severity: SeverityLevel): { bg: string; text: string; border: string; dot: string } => {
  switch (severity) {
    case 'critical':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        dot: 'bg-rose-600',
      };
    case 'high':
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        dot: 'bg-orange-600',
      };
    case 'warning':
    case 'moderate':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'low':
    case 'normal':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-600',
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        dot: 'bg-slate-500',
      };
  }
};

export const getStatusColor = (status: 'normal' | 'delayed' | 'high_risk' | 'blocked'): string => {
  switch (status) {
    case 'normal':
      return '#10B981'; // Green
    case 'delayed':
      return '#F59E0B'; // Yellow / Amber
    case 'high_risk':
      return '#F97316'; // Orange
    case 'blocked':
      return '#EF4444'; // Red
  }
};
