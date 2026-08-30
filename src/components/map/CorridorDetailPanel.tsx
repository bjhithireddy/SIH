import React from 'react';
import { CorridorRoute } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { StatusBadge } from '../common/StatusBadge';
import { AIBadge } from '../common/AIBadge';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  X,
  Compass
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface CorridorDetailPanelProps {
  corridor: CorridorRoute;
  onClose?: () => void;
}

export const CorridorDetailPanel: React.FC<CorridorDetailPanelProps> = ({
  corridor,
  onClose,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addToast } = useToast();

  const handleViewAlternatives = () => {
    navigate('/routes');
    addToast(
      'Navigated to Route Intelligence',
      `Loaded alternatives for ${corridor.origin} → ${corridor.destination}`,
      'info'
    );
  };

  const handleAnalyzeRoute = () => {
    navigate('/routes');
    addToast(
      'AI Analysis Triggered',
      `Performing deep multi-factor simulation for ${corridor.name}`,
      'success'
    );
  };

  return (
    <div className="w-full sm:w-96 bg-white/98 backdrop-blur-md rounded-xl border border-slate-200/90 p-5 shadow-2xl flex flex-col gap-4 text-xs max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-govblue-50 text-govblue-800 border border-govblue-200">
              {corridor.highwayCode}
            </span>
            <RiskBadge level={corridor.riskLevel} />
          </div>
          <h3 className="text-base font-extrabold text-navy-950 font-sans leading-tight">
            {corridor.origin} → {corridor.destination}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">{corridor.name}</p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 font-mono">
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">
            {t('map.distance', 'Distance')}
          </div>
          <div className="text-sm font-bold text-navy-950 mt-0.5">{corridor.distanceKm} km</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">
            {t('nav.accessibility', 'Accessibility')}
          </div>
          <div className="text-sm font-bold text-navy-950 mt-0.5">{corridor.accessibilityScore}%</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">
            {t('map.estTime', 'Estimated Time')}
          </div>
          <div className="text-sm font-bold text-navy-950 mt-0.5">{corridor.estimatedTimeStr}</div>
          <div className="text-[10px] text-slate-400 font-sans">{t('map.normalTime', 'Normal')}: {corridor.normalTimeStr}</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">
            {t('map.delayImpact', 'Delay Impact')}
          </div>
          <div className={`text-sm font-bold mt-0.5 ${corridor.delayMinutes > 60 ? 'text-rose-600' : 'text-amber-600'}`}>
            +{Math.floor(corridor.delayMinutes / 60)}h {corridor.delayMinutes % 60}m
          </div>
          <div className="text-[10px] text-slate-400 font-sans">Max Elev: {corridor.elevationMaxM}m</div>
        </div>
      </div>

      {/* Corridor Status Badge */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-slate-100/70 rounded-md border border-slate-200">
        <span className="text-slate-600 font-medium">{t('map.corridorHealth', 'Corridor Health')}:</span>
        <StatusBadge status={corridor.status} label={corridor.statusLabel} />
      </div>

      {/* Risk Factors */}
      <div>
        <div className="text-[11px] font-bold text-navy-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
          <span>{t('map.riskFactors', 'Active Risk Factors')}</span>
        </div>
        <div className="space-y-1.5">
          {corridor.riskFactors.map((factor, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-700 bg-white p-2 rounded border border-slate-100 leading-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1" />
              <span className="text-[11px]">{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="p-3.5 rounded-lg bg-govblue-50/80 border border-govblue-200">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="text-[11px] font-bold text-govblue-950 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-govblue-600" />
            <span>{t('map.aiRecommendation', 'AI Recommendation')}</span>
          </div>
          <AIBadge label={t('routes.tagRecommended', 'Optimal Reroute')} size="sm" />
        </div>
        <p className="text-[11px] text-navy-900 font-medium leading-relaxed mt-1">
          “{corridor.aiRecommendation}”
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={handleViewAlternatives}
          className="w-full py-2 px-3 rounded-md font-semibold text-xs text-white bg-govblue-700 hover:bg-govblue-800 transition-colors flex items-center justify-center gap-2 shadow-subtle cursor-pointer"
        >
          <span>{t('map.viewAlternatives', 'View Alternative Routes')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleAnalyzeRoute}
          className="w-full py-2 px-3 rounded-md font-semibold text-xs text-navy-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-govblue-600" />
          <span>{t('map.analyzeRoute', 'Analyze Route In-Depth')}</span>
        </button>
      </div>
    </div>
  );
};
