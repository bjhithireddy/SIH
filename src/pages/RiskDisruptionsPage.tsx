import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { FilterBar } from '../components/common/FilterBar';
import { ChartCard } from '../components/common/ChartCard';
import { DataTable, Column } from '../components/common/DataTable';
import { RiskBadge } from '../components/common/RiskBadge';
import { AIBadge } from '../components/common/AIBadge';
import { DisruptionIncident, DisruptionType } from '../types';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { 
  Sparkles, 
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export const RiskDisruptionsPage: React.FC = () => {
  const { 
    selectedState, 
    disruptions, 
    updateDisruptionStatus, 
    searchQuery 
  } = useAppState();
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const navigate = useNavigate();
  const { addToast } = useToast();

  const timelineData = [
    { time: '00:00', probability: 42, activeDisruptions: 12 },
    { time: '04:00', probability: 56, activeDisruptions: 14 },
    { time: '08:00', probability: 78, activeDisruptions: 18 },
    { time: '12:00', probability: 84, activeDisruptions: 21 },
    { time: '16:00', probability: 72, activeDisruptions: 17 },
    { time: '20:00', probability: 64, activeDisruptions: 15 },
    { time: '24:00 (Pred)', probability: 68, activeDisruptions: 16 },
  ];

  const riskCategories: { type: DisruptionType; label: string; count: number; icon: string }[] = [
    { type: 'landslide', label: 'Landslides & Slips', count: 6, icon: '⚠️' },
    { type: 'flood', label: 'Flash Floods', count: 3, icon: '🌊' },
    { type: 'heavy_rain', label: 'Heavy Monsoonal Rain', count: 2, icon: '🌧️' },
    { type: 'road_closure', label: 'Road Closures', count: 2, icon: '⛔' },
    { type: 'bridge_damage', label: 'Bridge Scour/Damage', count: 2, icon: '🌉' },
    { type: 'traffic', label: 'Checkpoint Congestion', count: 1, icon: '🚛' },
    { type: 'earthquake', label: 'Seismic Micro-Tremors', count: 1, icon: '📈' },
    { type: 'infrastructure_failure', label: 'Subgrade Failures', count: 0, icon: '🛠️' },
  ];

  const filteredDisruptions = disruptions.filter((d) => {
    const matchesState = selectedState === 'All' || d.state === selectedState;
    const matchesSearch = !searchQuery || d.location.toLowerCase().includes(searchQuery.toLowerCase()) || d.corridor.toLowerCase().includes(searchQuery.toLowerCase()) || d.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || d.type === selectedType;
    const matchesSev = selectedSeverity === 'All' || d.severity === selectedSeverity;
    return matchesState && matchesSearch && matchesType && matchesSev;
  });

  const handleUpdateStatus = (id: string, newStatus: DisruptionIncident['status']) => {
    updateDisruptionStatus(id, newStatus);
    addToast('Incident Updated', `Disruption status updated to "${newStatus}".`, 'success');
  };

  const columns: Column<DisruptionIncident>[] = [
    {
      header: 'Location & Corridor',
      accessor: 'location',
      render: (item) => (
        <div>
          <div className="font-bold text-navy-950 text-xs">{item.location}</div>
          <div className="text-[11px] text-slate-400 font-medium">
            {item.corridor} • <strong className="text-slate-600">{item.state}</strong>
          </div>
        </div>
      ),
    },
    {
      header: 'Hazard Type',
      accessor: 'type',
      render: (item) => (
        <span className="capitalize font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
          {item.type.replace('_', ' ')}
        </span>
      ),
    },
    {
      header: 'Severity Level',
      accessor: 'severity',
      render: (item) => <RiskBadge level={item.severity} />,
    },
    {
      header: 'AI Disruption Risk',
      accessor: 'probability',
      render: (item) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
            <span className={item.probability > 70 ? 'text-rose-600' : 'text-amber-600'}>
              {item.probability}% Probability
            </span>
            <span className="text-[10px] text-slate-400">({item.confidenceScore}% conf)</span>
          </div>
          <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${item.probability > 70 ? 'bg-rose-500' : 'bg-amber-500'}`}
              style={{ width: `${item.probability}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Detected / Duration',
      accessor: 'detectedAt',
      render: (item) => (
        <div className="text-xs">
          <div className="text-slate-600 font-mono">{item.detectedAt}</div>
          <div className="text-[11px] text-slate-400 font-mono">Est: {item.predictedDuration}</div>
        </div>
      ),
    },
    {
      header: 'Status & Action',
      accessor: 'status',
      align: 'right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <select
            value={item.status}
            onChange={(e) => handleUpdateStatus(item.id, e.target.value as DisruptionIncident['status'])}
            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-navy-900 cursor-pointer"
          >
            <option value="Active">Active</option>
            <option value="Under Clearance">Under Clearance</option>
            <option value="Monitored">Monitored</option>
            <option value="Resolved">Resolved</option>
          </select>

          <button
            onClick={() => navigate('/map')}
            className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Inspect on live map"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('risk.title', 'Risk & Disruption Intelligence Center')}
            </h1>
            <AIBadge label="Predictive Hazard Modeling" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('risk.subtitle', 'Real-time causal disruption forecasting, geological hazard tracking, and road closure timeline intelligence.')}
          </p>
        </div>

        <button
          onClick={() => navigate('/ai-insights')}
          className="px-3.5 py-1.5 rounded-lg bg-govblue-700 hover:bg-govblue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-subtle"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('nav.aiInsights', 'View Neural AI Recommendations')}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar showTimeframe={true} showSearch={true} showStateSelect={true} />

      {/* Featured AI Prediction Card */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-xl border border-navy-800 p-5 shadow-elevated">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-navy-800 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-bold font-mono uppercase tracking-wide text-rose-400">
              {t('risk.featuredTitle', 'High Confidence Hazard Prediction #01')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-navy-800 px-2 py-0.5 rounded border border-navy-700">
              Confidence: 87%
            </span>
            <span className="text-xs font-mono text-slate-400">Temporal Horizon: Next 24 Hours</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-black text-white font-sans">
              NH-10 Disruption Probability: <span className="text-rose-400">72% within next 24 hours</span>
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <strong>Multi-factor causality:</strong> Heavy monsoonal precipitation (142mm/24h) + acute subsurface soil saturation (88%) + historical failure signatures along Teesta shear fault.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400 font-mono">
              <span>Location: 29th Mile / Likhuveer (Sikkim Lifeline)</span>
              <span>•</span>
              <span>Potential Closure Window: 8–14 Hours</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-navy-900/90 border border-navy-800 flex flex-col justify-center gap-2 text-xs">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
              {t('map.aiRecommendation', 'Recommended Action')}
            </span>
            <p className="text-xs text-slate-200 leading-snug">
              Pre-position earthmoving assets at Sevoke depot; initiate immediate convoy diversion via Lava-Reshi alternate corridor.
            </p>
            <button
              onClick={() => navigate('/routes')}
              className="mt-1 w-full py-1.5 rounded bg-govblue-600 hover:bg-govblue-500 text-white font-semibold text-xs transition-colors"
            >
              {t('map.viewAlternatives', 'Simulate Reroute Detour')} →
            </button>
          </div>
        </div>
      </div>

      {/* 8 Risk Categories Bar */}
      <div>
        <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider font-mono mb-2.5">
          {t('risk.activeCategories', 'Active Hazard Categories Across North East')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {riskCategories.map((cat) => (
            <div
              key={cat.type}
              onClick={() => setSelectedType(selectedType === cat.type ? 'All' : cat.type)}
              className={`p-3 rounded-lg border cursor-pointer transition-all text-xs ${
                selectedType === cat.type
                  ? 'bg-govblue-50 border-govblue-600 ring-1 ring-govblue-500'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-card'
              }`}
            >
              <div className="text-lg mb-1">{cat.icon}</div>
              <div className="font-bold text-navy-950 truncate">{cat.label}</div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                {cat.count} {t('common.active', 'Active')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Chart */}
      <ChartCard
        title={t('risk.timelineTitle', 'Disruption Probability Timeline & Intensity Forecast')}
        subtitle="24-hour predictive probability trajectory factoring diurnal precipitation cycles"
      >
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={timelineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
            <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
            <Tooltip
              contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
              formatter={(value: number) => [`${value}%`, 'Disruption Probability']}
            />
            <Area type="monotone" dataKey="probability" stroke="#EF4444" strokeWidth={2.5} fill="url(#riskGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Disruption Incident Table */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
            {t('risk.tableTitle', 'Live Disruption & Hazard Incident Log')} ({filteredDisruptions.length})
          </h2>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Severity:</span>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-navy-900 cursor-pointer"
              >
                <option value="All">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="warning">Warning / Moderate</option>
                <option value="normal">Normal</option>
              </select>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredDisruptions}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
};
