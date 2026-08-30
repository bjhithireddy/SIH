import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, CloudRain, ShieldCheck, Activity } from 'lucide-react';

export const MapLayerControls: React.FC = () => {
  const { mapLayers, toggleMapLayer } = useAppState();
  const { t } = useLanguage();

  const layers = [
    {
      id: 'risk' as const,
      label: t('map.riskLayer', 'Risk Layer'),
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />,
      active: mapLayers.risk,
    },
    {
      id: 'weather' as const,
      label: t('map.weatherLayer', 'Weather Layer'),
      icon: <CloudRain className="w-3.5 h-3.5 text-sky-600" />,
      active: mapLayers.weather,
    },
    {
      id: 'accessibility' as const,
      label: t('map.accessLayer', 'Accessibility Layer'),
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
      active: mapLayers.accessibility,
    },
    {
      id: 'traffic' as const,
      label: t('map.trafficLayer', 'Traffic Layer'),
      icon: <Activity className="w-3.5 h-3.5 text-amber-600" />,
      active: mapLayers.traffic,
    },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg border border-slate-200 p-2.5 shadow-card flex flex-col gap-1 text-xs">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1 pb-1 border-b border-slate-100 mb-0.5">
        {t('map.layers', 'Map Intelligence Layers')}
      </div>
      {layers.map((layer) => (
        <button
          key={layer.id}
          type="button"
          onClick={() => toggleMapLayer(layer.id)}
          className={`flex items-center justify-between gap-3 px-2 py-1.5 rounded transition-colors text-left ${
            layer.active ? 'bg-slate-100 font-bold text-navy-950' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            {layer.icon}
            <span className="text-xs">{layer.label}</span>
          </div>
          <span
            className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] border transition-colors ${
              layer.active ? 'bg-govblue-600 border-govblue-700 text-white' : 'border-slate-300 bg-white'
            }`}
          >
            {layer.active && '✓'}
          </span>
        </button>
      ))}
    </div>
  );
};
