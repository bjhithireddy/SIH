import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { FilterBar } from '../components/common/FilterBar';
import { AlertCard } from '../components/common/AlertCard';
import { AIBadge } from '../components/common/AIBadge';
import { 
  Bell, 
  CheckCheck
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

type AlertTab = 'all' | 'critical' | 'warning' | 'info' | 'resolved';

export const AlertsPage: React.FC = () => {
  const { 
    selectedState, 
    alerts, 
    markAlertAsRead, 
    searchQuery 
  } = useAppState();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<AlertTab>('all');
  const { addToast } = useToast();

  const filteredAlerts = alerts.filter((a) => {
    const matchesState = selectedState === 'All' || a.state === selectedState;
    const matchesSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.message.toLowerCase().includes(searchQuery.toLowerCase()) || a.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'resolved') {
      return Boolean(a.isResolved) && matchesState && matchesSearch;
    }
    if (a.isResolved) {
      return false;
    }

    if (activeTab === 'critical') return a.severity === 'critical' && matchesState && matchesSearch;
    if (activeTab === 'warning') return a.severity === 'warning' && matchesState && matchesSearch;
    if (activeTab === 'info') return a.severity === 'info' && matchesState && matchesSearch;

    return matchesState && matchesSearch;
  });

  const criticalCount = alerts.filter((a) => !a.isResolved && a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => !a.isResolved && a.severity === 'warning').length;
  const infoCount = alerts.filter((a) => !a.isResolved && a.severity === 'info').length;
  const resolvedCount = alerts.filter((a) => a.isResolved).length;

  const handleMarkAllRead = () => {
    alerts.forEach((a) => markAlertAsRead(a.id));
    addToast('Alerts Acknowledged', 'All active alerts marked as acknowledged.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('alerts.title', 'Real-Time Emergency Alert Center')}
            </h1>
            <AIBadge label="Emergency Broadcast" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('alerts.subtitle', 'Critical road washouts, flood warnings, checkpost closures, and alternate corridor advisories across the 8 NE States.')}
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-navy-900 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-subtle cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5 text-govblue-600" />
          <span>{t('alerts.markAll', 'Mark All as Acknowledged')}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar showTimeframe={false} showSearch={true} showStateSelect={true} />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
          }`}
        >
          <span>{t('alerts.tabAll', 'All Active Alerts')}</span>
          <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${activeTab === 'all' ? 'bg-navy-800 text-sky-300' : 'bg-slate-200 text-slate-700'}`}>
            {alerts.filter((a) => !a.isResolved).length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('critical')}
          className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'critical'
              ? 'bg-rose-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-rose-700 hover:bg-rose-50'
          }`}
        >
          <span>{t('alerts.tabCritical', 'Critical Severity')}</span>
          {criticalCount > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] rounded-full font-mono bg-rose-900 text-white">
              {criticalCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('warning')}
          className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'warning'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
          }`}
        >
          <span>{t('alerts.tabWarning', 'Warnings')}</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded-full font-mono bg-slate-200 text-slate-700">
            {warningCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('info')}
          className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'info'
              ? 'bg-govblue-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-govblue-700 hover:bg-sky-50'
          }`}
        >
          <span>{t('alerts.tabInfo', 'Information & Advisory')}</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded-full font-mono bg-slate-200 text-slate-700">
            {infoCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('resolved')}
          className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'resolved'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          <span>{t('alerts.tabResolved', 'Resolved Incidents')}</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded-full font-mono bg-slate-200 text-slate-700">
            {resolvedCount}
          </span>
        </button>
      </div>

      {/* Alert Cards List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center text-slate-500">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <div className="font-bold text-navy-950 text-sm">No Active Alerts In This View</div>
            <p className="text-xs text-slate-400 mt-1">All incidents in this category are monitored or resolved.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
            />
          ))
        )}
      </div>
    </div>
  );
};
