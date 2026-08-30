import React from 'react';

interface StatusBadgeProps {
  status: 'normal' | 'delayed' | 'high_risk' | 'blocked' | 'active' | 'clearing' | 'operational' | 'congested' | 'monitored' | 'resolved';
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className = '' }) => {
  const normalizedStatus = status.toLowerCase();

  const getStyle = () => {
    switch (normalizedStatus) {
      case 'normal':
      case 'operational':
      case 'resolved':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          text: label || (status === 'resolved' ? 'Resolved' : status === 'operational' ? 'Operational' : 'Normal')
        };
      case 'delayed':
      case 'warning':
      case 'clearing':
      case 'congested':
      case 'monitored':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          text: label || (status === 'delayed' ? 'Delayed' : status === 'clearing' ? 'Clearing Debris' : status === 'congested' ? 'Congested' : 'Monitored')
        };
      case 'high_risk':
      case 'high':
        return {
          bg: 'bg-orange-50 text-orange-800 border-orange-200',
          dot: 'bg-orange-500',
          text: label || 'High Risk'
        };
      case 'blocked':
      case 'critical':
      case 'active':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          text: label || (status === 'blocked' ? 'Blocked' : 'Active Disruption')
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-500',
          text: label || status
        };
    }
  };

  const style = getStyle();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.bg} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
      <span>{style.text}</span>
    </span>
  );
};
