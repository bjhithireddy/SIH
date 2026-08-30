import React, { useState } from 'react';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { FilterBar } from '../components/common/FilterBar';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { CORRIDORS_DATA } from '../data/corridorsData';
import { RiskBadge } from '../components/common/RiskBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { AIBadge } from '../components/common/AIBadge';
import { Navigation, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LiveMapPage: React.FC = () => {
  const { 
    selectedState, 
    selectedCorridor, 
    setSelectedCorridor, 
    searchQuery 
  } = useAppState();
  const { t } = useLanguage();
  const [showCorridorList, setShowCorridorList] = useState(true);
  const navigate = useNavigate();

  const filteredCorridors = CORRIDORS_DATA.filter((c) => {
    const matchesState = selectedState === 'All' || c.originState === selectedState || c.destinationState === selectedState;
    const matchesSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.origin.toLowerCase().includes(searchQuery.toLowerCase()) || c.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('map.title', 'Interactive Geospatial Command Map')}
            </h1>
            <AIBadge label="Real-Time GIS" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('map.subtitle', 'Live multi-layer intelligence spanning 8 North Eastern states • Sensor telemetry, fault zones, and arterial status')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCorridorList(!showCorridorList)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              showCorridorList
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-white text-navy-900 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{showCorridorList ? `Hide ${t('map.corridorIndex', 'Corridors')}` : `Show ${t('map.corridorIndex', 'Corridors')}`}</span>
          </button>

          <button
            onClick={() => navigate('/routes')}
            className="px-3.5 py-1.5 rounded-lg bg-govblue-700 hover:bg-govblue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-subtle"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t('nav.routeIntelligence', 'AI Route Optimizer')}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar showTimeframe={false} showSearch={true} showStateSelect={true} />

      {/* Map + Side Corridor Selector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Side Quick Corridor Index (if open) */}
        {showCorridorList && (
          <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200/90 p-4 shadow-card flex flex-col h-[680px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider">
                  {t('map.corridorIndex', 'Arterial Corridors')} ({filteredCorridors.length})
                </h3>
                <span className="text-[11px] text-slate-400">Click to focus & inspect</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredCorridors.map((c) => {
                const isSelected = selectedCorridor?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCorridor(c)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all text-xs ${
                      isSelected
                        ? 'border-govblue-600 bg-govblue-50/50 ring-1 ring-govblue-500 shadow-subtle'
                        : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-mono text-[10px] font-bold text-govblue-800 bg-govblue-100/70 px-1.5 py-0.2 rounded">
                        {c.highwayCode}
                      </span>
                      <RiskBadge level={c.riskLevel} />
                    </div>

                    <div className="font-bold text-navy-950 text-xs line-clamp-1">
                      {c.origin} → {c.destination}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 pt-1.5 border-t border-slate-100">
                      <span>{c.distanceKm} km</span>
                      <span className={c.delayMinutes > 45 ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                        {c.estimatedTimeStr} (+{c.delayMinutes}m)
                      </span>
                      <StatusBadge status={c.status} label="" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Map Container */}
        <div className={`${showCorridorList ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          <InteractiveMap height="h-[680px]" showDetailsPanel={true} />
        </div>
      </div>
    </div>
  );
};
