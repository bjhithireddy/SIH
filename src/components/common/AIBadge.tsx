import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIBadgeProps {
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const AIBadge: React.FC<AIBadgeProps> = ({ 
  label = 'AI Powered', 
  className = '',
  size = 'sm' 
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 font-medium bg-gradient-to-r from-govblue-50 to-indigo-50 text-govblue-700 border border-govblue-200/80 rounded-full shadow-subtle ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs tracking-wide'
      } ${className}`}
    >
      <Sparkles className={size === 'sm' ? 'w-3 h-3 text-govblue-600 animate-pulse' : 'w-3.5 h-3.5 text-govblue-600 animate-pulse'} />
      <span>{label}</span>
    </span>
  );
};
