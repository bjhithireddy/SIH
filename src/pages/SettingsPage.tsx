import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { AppSettings, NEState } from '../types';
import { AIBadge } from '../components/common/AIBadge';
import { 
  User, 
  Bell, 
  Cpu, 
  Save, 
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const NE_STATES: NEState[] = [
  'All',
  'Assam',
  'Arunachal Pradesh',
  'Meghalaya',
  'Manipur',
  'Mizoram',
  'Nagaland',
  'Tripura',
  'Sikkim'
];

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAppState();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [saved, setSaved] = useState(false);
  const { addToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    addToast('Configuration Updated', 'System parameters and telemetry thresholds successfully saved.', 'success');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('settings.title', 'Platform Configuration & Thresholds')}
            </h1>
            <AIBadge label="Admin Console" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('settings.subtitle', 'Configure telemetry polling frequencies, neural hazard sensitivity thresholds, and emergency alert channels.')}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-govblue-700 hover:bg-govblue-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-subtle cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{t('settings.saveBtn', 'Save Configurations')}</span>
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Settings saved successfully! All telemetry thresholds updated across platform services.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Profile & Authority Identity */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-card">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 font-bold text-navy-950 text-sm uppercase tracking-wide">
            <User className="w-4 h-4 text-govblue-600" />
            <span>{t('settings.profileTitle', 'Authority & Operator Profile')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Operator / Official Name</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-navy-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-govblue-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Designation & Role</label>
              <input
                type="text"
                value={formData.userRole}
                onChange={(e) => setFormData({ ...formData, userRole: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-navy-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-govblue-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Governing Agency / Department</label>
              <input
                type="text"
                value={formData.agencyName}
                onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-navy-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-govblue-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: AI Sensitivity & Hazard Thresholds */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-card">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 font-bold text-navy-950 text-sm uppercase tracking-wide">
            <Cpu className="w-4 h-4 text-govblue-600" />
            <span>{t('settings.aiParamsTitle', 'AI Hazard Engine & Telemetry Parameters')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-semibold text-navy-950">
                  AI Confidence Threshold Cutoff: <strong className="font-mono text-govblue-700">{formData.aiConfidenceThreshold}%</strong>
                </label>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Only predictions matching or exceeding this statistical confidence level will trigger critical SITREPs.
              </p>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={formData.aiConfidenceThreshold}
                onChange={(e) => setFormData({ ...formData, aiConfidenceThreshold: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-govblue-700"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-semibold text-navy-950">
                  Landslide Rainfall Trigger: <strong className="font-mono text-rose-600">{formData.landslideRainfallThresholdMm} mm / 24h</strong>
                </label>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Cumulative monsoonal rainfall threshold that automatically elevates mountain corridors to High Risk.
              </p>
              <input
                type="range"
                min="40"
                max="160"
                step="10"
                value={formData.landslideRainfallThresholdMm}
                onChange={(e) => setFormData({ ...formData, landslideRainfallThresholdMm: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-950 mb-1">Telemetry Sensor Polling Interval</label>
              <select
                value={formData.refreshIntervalSeconds}
                onChange={(e) => setFormData({ ...formData, refreshIntervalSeconds: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-navy-950 focus:bg-white focus:outline-none"
              >
                <option value={15}>15 Seconds (Rapid Live Telemetry)</option>
                <option value={30}>30 Seconds (Standard Operational)</option>
                <option value={60}>1 Minute (Low Bandwidth Mode)</option>
                <option value={300}>5 Minutes (Eco Polling)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-navy-950 mb-1">{t('app.region', 'Default Regional Scope')}</label>
              <select
                value={formData.defaultState}
                onChange={(e) => setFormData({ ...formData, defaultState: e.target.value as NEState })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-navy-950 focus:bg-white focus:outline-none"
              >
                {NE_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st === 'All' ? t('app.allStates', 'All 8 North Eastern States') : st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Notification Broadcast Channels */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-card">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 font-bold text-navy-950 text-sm uppercase tracking-wide">
            <Bell className="w-4 h-4 text-govblue-600" />
            <span>{t('settings.broadcastTitle', 'Emergency Broadcast Channels')}</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.criticalAlertPush}
                onChange={(e) => setFormData({ ...formData, criticalAlertPush: e.target.checked })}
                className="w-4 h-4 text-govblue-700 rounded border-slate-300 focus:ring-govblue-500 mt-0.5"
              />
              <div>
                <div className="font-bold text-navy-950">Critical Disruption Web Push Notifications</div>
                <div className="text-slate-500 text-[11px]">Instant high-priority sound & toast for road washouts and bridge failures.</div>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.smsEmergencyNotification}
                onChange={(e) => setFormData({ ...formData, smsEmergencyNotification: e.target.checked })}
                className="w-4 h-4 text-govblue-700 rounded border-slate-300 focus:ring-govblue-500 mt-0.5"
              />
              <div>
                <div className="font-bold text-navy-950">Emergency SMS Gateway for Highway Task Forces (BRO & PWD)</div>
                <div className="text-slate-500 text-[11px]">Automated dispatch of coordinates to standby earthmoving crews.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Save Footer */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-govblue-700 hover:bg-govblue-800 text-white text-xs font-bold transition-colors shadow-subtle flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{t('settings.saveBtn', 'Save & Apply Settings')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
