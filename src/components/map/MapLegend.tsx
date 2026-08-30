import React from 'react';
import { Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MapLegend: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg border border-slate-200 p-3 shadow-card text-xs">
      <div className="flex items-center gap-1.5 font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-2.5 pb-1.5 border-b border-slate-100">
        <Layers className="w-3.5 h-3.5 text-govblue-600" />
        <span>{t('map.legend', 'Map Legend')}</span>
      </div>

      {/* Corridor Status */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          {t('map.corridorHealth', 'Corridor Route Health')}
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-1 bg-emerald-500 rounded-full"></span>
            <span>{t('map.normalFlow', 'Normal Flow')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-1 bg-amber-500 rounded-full"></span>
            <span>{t('map.delayed', 'Delayed')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-1 bg-orange-500 rounded-full"></span>
            <span>{t('map.highRisk', 'High Risk')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-1 bg-rose-600 rounded-full"></span>
            <span>{t('map.blocked', 'Blocked / Critical')}</span>
          </div>
        </div>
      </div>

      {/* Infrastructure & Incident Markers */}
      <div>
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          {t('map.nodesIncidents', 'Nodes & Incidents')}
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span>Landslide / Slide</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span>Flood Zone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Checkpoint</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>Strategic Bridge</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Relief Hub / Buffer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-700"></span>
            <span>Airport / Rail</span>
          </div>
        </div>
      </div>
    </div>
  );
};
