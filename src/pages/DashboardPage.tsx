import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { KPICard } from '../components/common/KPICard';
import { FilterBar } from '../components/common/FilterBar';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { AIInsightCard } from '../components/common/AIInsightCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { RiskBadge } from '../components/common/RiskBadge';
import { AIBadge } from '../components/common/AIBadge';
import { NE_STATES_DATA } from '../data/statesData';
import { 
  Activity, 
  AlertOctagon, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Building2, 
  ArrowRight, 
  MapPin, 
  Layers, 
  Compass
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { 
    selectedState, 
    insights, 
    disruptions, 
    actionInsight
  } = useAppState();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Filter state specific data if selected
  const activeDisruptionsList = disruptions.filter((d) => 
    selectedState === 'All' || d.state === selectedState
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('dashboard.title', 'North Eastern Region Intelligence')}
            </h1>
            <AIBadge label="Live AI Stream" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('dashboard.subtitle', 'Live regional logistics overview • Geospatial telemetry and predictive disruption matrix')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/routes"
            className="px-3.5 py-1.5 rounded-lg bg-govblue-700 hover:bg-govblue-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t('nav.routeIntelligence', 'AI Route Engine')}</span>
          </Link>
          <Link
            to="/map"
            className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-navy-900 text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-govblue-600" />
            <span>{t('dashboard.fullscreenMap', 'Fullscreen Map')}</span>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar showTimeframe={true} showSearch={true} showStateSelect={true} />

      {/* Top 6 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. Regional Accessibility Score */}
        <KPICard
          title={t('dashboard.kpi.accessibility', 'Regional Accessibility Score')}
          value="78.4%"
          trend="down"
          trendValue="-1.2%"
          trendLabel="vs last week"
          statusText={t('common.moderate', 'Moderate')}
          statusLevel="moderate"
          icon={<Activity className="w-5 h-5 text-emerald-600" />}
          onClick={() => navigate('/accessibility')}
        />

        {/* 2. Active Route Disruptions */}
        <KPICard
          title={t('dashboard.kpi.disruptions', 'Active Route Disruptions')}
          value={activeDisruptionsList.length || 17}
          trend="up"
          trendValue="+3 today"
          trendLabel=""
          statusText={`4 ${t('common.critical', 'Critical')}`}
          statusLevel="critical"
          icon={<AlertOctagon className="w-5 h-5 text-rose-600" />}
          onClick={() => navigate('/risk')}
        />

        {/* 3. Average Travel Delay */}
        <KPICard
          title={t('dashboard.kpi.delay', 'Average Travel Delay')}
          value="+34"
          unit={t('common.mins', 'min')}
          trend="up"
          trendValue="+8 min"
          trendLabel="monsoon impact"
          statusText={t('map.delayed', 'Delayed')}
          statusLevel="warning"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          onClick={() => navigate('/analytics')}
        />

        {/* 4. High Risk Corridors */}
        <KPICard
          title={t('dashboard.kpi.corridors', 'High Risk Corridors')}
          value="12"
          trend="stable"
          trendValue="Monitored"
          statusText={t('map.highRisk', 'High Risk')}
          statusLevel="high"
          icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}
          onClick={() => navigate('/map')}
        />

        {/* 5. AI Predicted Disruptions */}
        <KPICard
          title={t('dashboard.kpi.aiPredicted', 'AI Predicted Disruptions')}
          value="8"
          trend="up"
          trendValue="Next 24h"
          statusText="87% Conf."
          statusLevel="info"
          icon={<Sparkles className="w-5 h-5 text-govblue-600" />}
          onClick={() => navigate('/ai-insights')}
        />

        {/* 6. Critical Infrastructure Access */}
        <KPICard
          title={t('dashboard.kpi.infraAccess', 'Critical Infra Access')}
          value="91%"
          trend="stable"
          trendValue="0.0%"
          statusText={t('common.optimal', 'Optimal')}
          statusLevel="normal"
          icon={<Building2 className="w-5 h-5 text-indigo-600" />}
          onClick={() => navigate('/accessibility')}
        />
      </div>

      {/* Main Interactive Map Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
              {t('map.title', 'Live Regional Logistics Map')}
            </h2>
            <span className="text-xs text-slate-400">
              • {t('map.subtitle', 'Click any corridor or marker to inspect telemetry')}
            </span>
          </div>
          <Link
            to="/map"
            className="text-xs font-semibold text-govblue-700 hover:text-govblue-900 flex items-center gap-1 hover:underline"
          >
            <span>{t('landing.exploreMapBtn', 'Open Dedicated Map View')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <InteractiveMap height="h-[520px]" showDetailsPanel={true} />
      </div>

      {/* State-wise Accessibility Quick Snapshot */}
      <div className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-card">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
              {t('dashboard.stateHealthTitle', 'State Accessibility Health (8 NE States)')}
            </h3>
            <p className="text-xs text-slate-500">{t('dashboard.stateHealthSubtitle', 'Live operational index by state')}</p>
          </div>
          <Link
            to="/accessibility"
            className="text-xs font-semibold text-govblue-700 hover:text-govblue-900 flex items-center gap-1"
          >
            <span>{t('dashboard.deepDive', 'Deep Dive Analytics')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {NE_STATES_DATA.map((st) => {
            const isCritical = st.accessibilityScore < 60;
            const isWarn = st.accessibilityScore >= 60 && st.accessibilityScore < 75;
            const isGood = st.accessibilityScore >= 75;
            const barColor = isGood ? 'bg-emerald-500' : isWarn ? 'bg-amber-500' : 'bg-rose-500';

            return (
              <div
                key={st.code}
                onClick={() => navigate('/accessibility')}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-govblue-300 hover:bg-slate-100/60 cursor-pointer transition-all text-xs"
              >
                <div className="flex items-center justify-between font-bold text-navy-950 mb-1">
                  <span>{st.code}</span>
                  <span className="font-mono text-xs">{st.accessibilityScore}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${st.accessibilityScore}%` }} />
                </div>
                <div className="text-[10px] text-slate-500 truncate">{st.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: Top AI Insights & Recent Disruptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
                {t('dashboard.highPriorityInsights', 'High Priority AI Insights')}
              </h2>
              <AIBadge label="Neural Model" size="sm" />
            </div>
            <Link
              to="/ai-insights"
              className="text-xs font-semibold text-govblue-700 hover:text-govblue-900 flex items-center gap-1"
            >
              <span>{t('dashboard.viewAll', 'View All Insights')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {insights.slice(0, 2).map((ins) => (
              <AIInsightCard
                key={ins.id}
                insight={ins}
                onAction={actionInsight}
                onViewAnalysis={() => navigate('/ai-insights')}
              />
            ))}
          </div>
        </div>

        {/* Active Disruptions Table Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
                {t('dashboard.activeHazards', 'Active Corridor Hazards')}
              </h2>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                {activeDisruptionsList.length} {t('common.active', 'Active')}
              </span>
            </div>
            <Link
              to="/risk"
              className="text-xs font-semibold text-govblue-700 hover:text-govblue-900 flex items-center gap-1"
            >
              <span>{t('risk.title', 'View Risk Center')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-slate-200/90 shadow-card overflow-hidden">
            <div className="divide-y divide-slate-100">
              {activeDisruptionsList.slice(0, 4).map((d) => (
                <div key={d.id} className="p-3.5 hover:bg-slate-50 transition-colors text-xs">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-950">{d.location}</span>
                      <RiskBadge level={d.severity} />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{d.detectedAt}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Corridor: {d.corridor} ({d.state})
                  </div>
                  <p className="text-slate-600 text-xs mt-1 leading-snug">
                    {d.reason}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-500">
                      <span>{t('map.estTime', 'Duration')}: <strong className="text-navy-900">{d.predictedDuration}</strong></span>
                      <span>•</span>
                      <span>Risk: <strong className="text-navy-900">{d.probability}%</strong></span>
                    </div>
                    <button
                      onClick={() => navigate('/map')}
                      className="text-govblue-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{t('dashboard.viewMap', 'Inspect Map')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
