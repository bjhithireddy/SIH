import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  badge,
  actions,
  children,
  className = '',
  minHeight = 'min-h-[300px]',
}) => {
  return (
    <div className={`bg-white rounded-lg border border-slate-200/90 p-5 shadow-card ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
              {title}
            </h3>
            {badge}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      <div className={`w-full ${minHeight}`}>
        {children}
      </div>
    </div>
  );
};
