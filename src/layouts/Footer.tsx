import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500 mt-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-navy-900">
            <ShieldCheck className="w-4 h-4 text-govblue-600" />
            <span>NE-LogiAI Platform</span>
          </div>
          <span>•</span>
          <span>{t('app.orgName', 'North Eastern Council (NEC) & Disaster Management Intelligence')}</span>
          <span>•</span>
          <span className="hidden sm:inline">{t('app.allStates', 'Covering all 8 North Eastern States')}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t('app.latency', 'Telemetry Latency: 1.4s')}</span>
          </div>
          <span>|</span>
          <span>{t('app.sihTag', 'SIH 2026 Edition')}</span>
        </div>
      </div>
    </footer>
  );
};
