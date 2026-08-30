import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { FilterBar } from '../components/common/FilterBar';
import { ChartCard } from '../components/common/ChartCard';
import { KPICard } from '../components/common/KPICard';
import { AIBadge } from '../components/common/AIBadge';
import { ANALYTICS_DATA } from '../data/analyticsData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Clock, 
  Truck, 
  Fuel, 
  AlertTriangle, 
  IndianRupee,
  FileSpreadsheet
} from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';
import { useToast } from '../context/ToastContext';

export const AnalyticsPage: React.FC = () => {
  const { selectedTimeframe } = useAppState();
  const { t } = useLanguage();
  const { addToast } = useToast();

  const data = ANALYTICS_DATA[selectedTimeframe] || ANALYTICS_DATA.today;

  const handleExport = () => {
    exportToCSV(`NE_Logistics_Volume_${selectedTimeframe}`, data.stateVolume);
    addToast('Report Exported', `Logistics performance figures for ${selectedTimeframe} downloaded.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('analytics.title', 'Logistics Performance Analytics')}
            </h1>
            <AIBadge label="Supply Chain Intelligence" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('analytics.subtitle', 'Freight velocity, transit delay variances, fuel surcharge penalties, and historical disruption metrics.')}
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-govblue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-subtle cursor-pointer"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Export Analytics Dataset</span>
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar showTimeframe={true} showSearch={false} showStateSelect={true} />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={t('dashboard.kpi.delay', 'Average Delivery Time')}
          value={`${data.kpis.avgDeliveryTimeHrs}h`}
          trend="up"
          trendValue={`+${data.kpis.avgDeliveryVariancePct}%`}
          trendLabel="delay variance"
          statusText={t('map.delayed', 'Delayed')}
          statusLevel="warning"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
        />

        <KPICard
          title="Regional Freight Volume"
          value={data.kpis.freightVolumeTons.toLocaleString('en-IN')}
          unit="Tons"
          trend="up"
          trendValue={`+${data.kpis.freightVolumeTrendPct}%`}
          trendLabel="period gain"
          statusText={t('common.optimal', 'Optimal')}
          statusLevel="normal"
          icon={<Truck className="w-5 h-5 text-govblue-600" />}
        />

        <KPICard
          title={t('routes.fuelCost', 'Fuel Cost & Detour Index')}
          value={`${data.kpis.fuelCostIndex}`}
          unit="pts"
          trend="up"
          trendValue={`+${data.kpis.fuelCostTrendPct}%`}
          trendLabel="mountain surcharge"
          statusText={t('map.highRisk', 'Elevated')}
          statusLevel="high"
          icon={<Fuel className="w-5 h-5 text-rose-600" />}
        />

        <KPICard
          title={t('dashboard.kpi.disruptions', 'Disruption Incidents')}
          value={data.kpis.disruptionIncidentsCount}
          trend="down"
          trendValue={`${data.kpis.disruptionIncidentsTrendPct}%`}
          trendLabel="vs previous cycle"
          statusText="Active Watch"
          statusLevel="moderate"
          icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}
        />
      </div>

      {/* Two Main Charts: Line Chart & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Delivery Time Trend */}
        <ChartCard
          title={t('analytics.deliveryTrend', 'Delivery Time Trend vs Baseline')}
          subtitle="Average hours spent in transit compared with optimal weather standards"
        >
          <ResponsiveContainer width="100%" height={290}>
            <LineChart data={data.deliveryTrends} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="timeLabel" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[0, 12]} stroke="#94a3b8" fontSize={11} unit="h" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                formatter={(value: number) => [`${value} hrs`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="avgHours" name="Actual Transit Time" stroke="#EF4444" strokeWidth={2.5} />
              <Line type="monotone" dataKey="normalHours" name="Ideal Baseline" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2: State-wise Freight Volume */}
        <ChartCard
          title={t('analytics.volumeByState', 'State-wise Freight Volume Dispatched')}
          subtitle="Tons of essential rations, POL, and commerce delivered by state"
        >
          <ResponsiveContainer width="100%" height={290}>
            <BarChart data={data.stateVolume} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="state" stroke="#94a3b8" fontSize={10} angle={-20} textAnchor="end" />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                formatter={(value: number) => [`${value.toLocaleString()} Tons`, 'Freight Delivered']}
              />
              <Bar dataKey="freightTons" name="Delivered (Tons)" fill="#1E3E62" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Two Secondary Charts: Area Chart Disruption History & Donut Chart Disruption Types */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Disruption Trend Area Chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title={t('analytics.disruptionHours', 'Disruption Frequency & Road Blockage Hours')}
            subtitle="Cumulative hours of road gridlock and clearance timelines"
          >
            <ResponsiveContainer width="100%" height={270}>
              <AreaChart data={data.disruptionHistory} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="delayGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="timeLabel" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                  formatter={(value: number) => [`${value} Hours`, 'Total Delay Hours']}
                />
                <Area type="monotone" dataKey="totalDelayHours" stroke="#F59E0B" strokeWidth={2.5} fill="url(#delayGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Donut Chart: Disruption Cause Breakdown */}
        <div className="lg:col-span-1">
          <ChartCard
            title={t('analytics.rootCauses', 'Disruption Root Causes')}
            subtitle="Categorized breakdown of bottlenecks"
          >
            <ResponsiveContainer width="100%" height={270}>
              <PieChart>
                <Pie
                  data={data.disruptionTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.disruptionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Fuel Surcharge & Detour Penalty Table */}
      <div className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-card">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
              {t('analytics.economicImpact', 'Corridor Fuel Surcharge & Detour Economic Impact')}
            </h3>
            <p className="text-xs text-slate-500">Extra fuel consumption incurred from mountain detours</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px] bg-slate-50">
                <th className="py-2.5 px-4">Highway Corridor</th>
                <th className="py-2.5 px-4">Fuel Burn Excess (%)</th>
                <th className="py-2.5 px-4">Avg Cost Penalty / Trip</th>
                <th className="py-2.5 px-4">Carbon Overhead</th>
                <th className="py-2.5 px-4 text-right">Economic Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {data.fuelImpact.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-navy-950">{item.corridor}</td>
                  <td className="py-3 px-4 font-mono text-rose-600 font-bold">+{item.fuelExcessPct}%</td>
                  <td className="py-3 px-4 font-mono flex items-center">
                    <IndianRupee className="w-3 h-3 text-slate-400" />
                    <span>{item.costSurchargeInr.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">+{item.carbonImpactKg} kg CO₂</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      High Surcharge
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
