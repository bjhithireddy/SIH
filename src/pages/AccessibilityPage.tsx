import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { FilterBar } from '../components/common/FilterBar';
import { ChartCard } from '../components/common/ChartCard';
import { DataTable, Column } from '../components/common/DataTable';
import { AIBadge } from '../components/common/AIBadge';
import { 
  STATE_ACCESSIBILITY_SCORES, 
  ACCESSIBILITY_TREND_30_DAYS, 
  INFRASTRUCTURE_CATEGORY_BREAKDOWN, 
  DISTRICT_ACCESSIBILITY_DATA 
} from '../data/accessibilityData';
import { DistrictAccessibility } from '../types';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { exportToCSV } from '../utils/exportUtils';
import { useToast } from '../context/ToastContext';

export const AccessibilityPage: React.FC = () => {
  const { selectedState, searchQuery } = useAppState();
  const { t } = useLanguage();
  const [selectedVulnerability, setSelectedVulnerability] = useState<string>('All');
  const { addToast } = useToast();

  // Filter districts
  const filteredDistricts = DISTRICT_ACCESSIBILITY_DATA.filter((d) => {
    const matchesState = selectedState === 'All' || d.state === selectedState;
    const matchesSearch = !searchQuery || d.district.toLowerCase().includes(searchQuery.toLowerCase()) || d.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVuln = selectedVulnerability === 'All' || d.vulnerabilityStatus === selectedVulnerability;
    return matchesState && matchesSearch && matchesVuln;
  });

  const handleExportCSV = () => {
    exportToCSV('NE_Accessibility_District_Audit', filteredDistricts);
    addToast('Audit Exported', 'District accessibility dataset downloaded as CSV.', 'success');
  };

  const columns: Column<DistrictAccessibility>[] = [
    {
      header: 'District & State',
      accessor: 'district',
      render: (item) => (
        <div>
          <div className="font-bold text-navy-950 text-xs">{item.district}</div>
          <div className="text-[11px] text-slate-400 font-medium">{item.state}</div>
        </div>
      ),
    },
    {
      header: t('nav.accessibility', 'Overall Accessibility'),
      accessor: 'score',
      render: (item) => {
        const isLow = item.score < 60;
        const isMed = item.score >= 60 && item.score < 75;
        const color = isLow ? 'text-rose-600' : isMed ? 'text-amber-600' : 'text-emerald-600';
        return (
          <div className="flex items-center gap-2">
            <span className={`font-mono font-bold text-xs ${color}`}>{item.score}%</span>
            <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden hidden sm:block">
              <div
                className={`h-full ${isLow ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      header: 'Road Index',
      accessor: 'roadScore',
      render: (item) => (
        <span className="font-mono text-xs">{item.roadScore}/100</span>
      ),
    },
    {
      header: 'Bridge Index',
      accessor: 'bridgeScore',
      render: (item) => (
        <span className="font-mono text-xs">{item.bridgeScore}/100</span>
      ),
    },
    {
      header: 'Supply Reach Window',
      accessor: 'essentialSupplyReachDays',
      render: (item) => (
        <span className={`font-mono font-semibold text-xs ${item.essentialSupplyReachDays > 3 ? 'text-rose-700' : 'text-slate-700'}`}>
          {item.essentialSupplyReachDays} {item.essentialSupplyReachDays === 1 ? t('common.days', 'Day') : t('common.days', 'Days')}
        </span>
      ),
    },
    {
      header: 'Isolation Vulnerability',
      accessor: 'vulnerabilityStatus',
      align: 'right',
      render: (item) => {
        const styles = {
          Safe: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          Moderate: 'bg-amber-100 text-amber-800 border-amber-300',
          Vulnerable: 'bg-orange-100 text-orange-800 border-orange-300',
          Critical: 'bg-rose-100 text-rose-800 border-rose-300',
        };
        return (
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border uppercase tracking-wider ${styles[item.vulnerabilityStatus]}`}>
            {item.vulnerabilityStatus}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('access.title', 'Regional Accessibility Intelligence')}
            </h1>
            <AIBadge label="Multi-District Telemetry" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('access.subtitle', 'Real-time isolation risk index, bridge passability, and essential supply transit lead-times across North Eastern India.')}
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-govblue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-subtle cursor-pointer"
        >
          <span>{t('access.exportBtn', 'Export Accessibility Audit (CSV)')}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar showTimeframe={true} showSearch={true} showStateSelect={true} />

      {/* 8 State Accessibility Cards Grid with Progress Bars */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider font-mono">
            {t('access.scorecard', 'State-Wise Accessibility Scorecard')}
          </h2>
          <span className="text-xs text-slate-500 font-mono">Regional Avg: <strong>72.4%</strong></span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATE_ACCESSIBILITY_SCORES.map((item) => {
            const isGood = item.score >= 75;
            const isWarn = item.score >= 60 && item.score < 75;
            const isCritical = item.score < 60;
            const barBg = isGood ? 'bg-emerald-500' : isWarn ? 'bg-amber-500' : 'bg-rose-500';

            return (
              <div
                key={item.state}
                className="bg-white rounded-lg border border-slate-200/90 p-4 shadow-card hover:shadow-elevated transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-navy-950">{item.state}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isGood ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    isWarn ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-2xl font-black text-navy-950 font-mono">
                    {item.score}%
                  </span>
                  <span className={`text-xs font-mono font-semibold ${item.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {item.change}
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${barBg}`} style={{ width: `${item.score}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Main Charts: Trend 30 Days & State Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: 30-Day Accessibility Trend */}
        <ChartCard
          title={t('access.trendTitle', 'Accessibility Trend — Last 30 Days')}
          subtitle="Longitudinal accessibility trajectory across key North Eastern terrain corridors"
        >
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={ACCESSIBILITY_TREND_30_DAYS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[40, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                formatter={(value: number) => [`${value}%`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="Assam" stroke="#10B981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Tripura" stroke="#06B6D4" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Meghalaya" stroke="#F59E0B" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Arunachal" stroke="#F97316" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Sikkim" stroke="#EF4444" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="overall" name="Regional Average" stroke="#3B82F6" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2: Accessibility by State Benchmark */}
        <ChartCard
          title={t('access.rankTitle', 'Accessibility by State (Ranked)')}
          subtitle="Comparative score analysis against national disaster resilience benchmark"
        >
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={STATE_ACCESSIBILITY_SCORES} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="state" stroke="#94a3b8" fontSize={10} angle={-25} textAnchor="end" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                formatter={(value: number) => [`${value}%`, 'Accessibility Index']}
              />
              <Bar dataKey="score" fill="#1E3E62" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Infrastructure Category Health Cards */}
      <div className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-card">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider font-mono">
              {t('access.infraTitle', 'Infrastructure Category Health (7 Key Classes)')}
            </h3>
            <p className="text-xs text-slate-500">Operational uptime across regional facilities</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {INFRASTRUCTURE_CATEGORY_BREAKDOWN.map((cat) => (
            <div key={cat.category} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
              <div className="font-bold text-navy-950 truncate mb-1">{cat.category}</div>
              <div className="text-lg font-black text-navy-900 font-mono">{cat.healthPct}%</div>
              <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                <span>{cat.operational} {t('common.active', 'Active')}</span>
                <span className="text-rose-600 font-semibold">{cat.blocked} Blocked</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District Level Isolation Vulnerability Table */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
            {t('access.districtTableTitle', 'District-Level Accessibility & Isolation Risk Matrix')} ({filteredDistricts.length} Districts)
          </h2>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Filter Vulnerability:</span>
            <select
              value={selectedVulnerability}
              onChange={(e) => setSelectedVulnerability(e.target.value)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-semibold text-navy-900 cursor-pointer"
            >
              <option value="All">All Severity Levels</option>
              <option value="Safe">Safe</option>
              <option value="Moderate">Moderate</option>
              <option value="Vulnerable">Vulnerable</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredDistricts}
          keyExtractor={(item) => item.district}
        />
      </div>
    </div>
  );
};
