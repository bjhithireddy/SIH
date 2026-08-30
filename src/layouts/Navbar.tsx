import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { NEState } from '../types';
import { 
  Bell, 
  Search, 
  MapPin, 
  Menu, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar: () => void;
}

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

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { selectedState, setSelectedState, alerts, searchQuery, setSearchQuery } = useAppState();
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const unreadAlerts = alerts.filter((a) => !a.isRead && !a.isResolved);

  return (
    <header className="sticky top-0 z-40 bg-navy-950 text-white border-b border-navy-800 shadow-md">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Hamburger & Brand */}
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-900 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-govblue-600 border border-govblue-400 flex items-center justify-center text-white shadow-subtle group-hover:bg-govblue-500 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white font-sans">
                  NE-Logi<span className="text-sky-400">AI</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-navy-800 text-[10px] font-mono font-semibold text-sky-300 border border-navy-700 hidden sm:inline">
                  SIH 2026
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                {t('app.tagline', 'North Eastern Logistics & Accessibility Intelligence')}
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Search & Region Selector */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-lg mx-4">
          {/* Region Selector */}
          <div className="flex items-center gap-1.5 bg-navy-900 border border-navy-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value as NEState)}
              aria-label="Select North Eastern State Region"
              className="bg-transparent font-semibold text-white focus:outline-none cursor-pointer pr-1 text-xs"
            >
              {NE_STATES.map((st) => (
                <option key={st} value={st} className="bg-navy-900 text-white">
                  {st === 'All' ? t('app.allStates', 'All 8 NE States') : st}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search', 'Search highway, corridor, district, or node...')}
              className="w-full pl-9 pr-3 py-1.5 bg-navy-900 border border-navy-800 rounded-lg text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 transition-colors"
            />
          </div>
        </div>

        {/* Right: Language Selector, Live Telemetry Indicator, Notifications & User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 🌐 Visible Multi-Language Selector */}
          <LanguageSelector variant="navbar" />

          {/* Live telemetry pill */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-[11px] font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t('app.telemetryActive', 'AI Telemetry Active')}</span>
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-900 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadAlerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center border border-navy-950">
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-navy-950 rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-950">
                      {t('alerts.title', 'Real-Time Emergency Alert Center')}
                    </span>
                    <span className="px-2 py-0.2 text-[10px] font-bold rounded-full bg-rose-100 text-rose-800">
                      {unreadAlerts.length} {t('common.critical', 'Critical')}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/alerts');
                    }}
                    className="text-xs font-semibold text-govblue-600 hover:underline"
                  >
                    {t('dashboard.viewAll', 'View All')}
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {alerts.slice(0, 4).map((alt) => (
                    <div
                      key={alt.id}
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/alerts');
                      }}
                      className="p-3 hover:bg-slate-50 cursor-pointer transition-colors text-xs"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded ${
                          alt.severity === 'critical' ? 'bg-rose-100 text-rose-800' :
                          alt.severity === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-govblue-100 text-govblue-800'
                        }`}>
                          {alt.severity}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{alt.timestamp}</span>
                      </div>
                      <div className="font-bold text-navy-950 line-clamp-1">{alt.title}</div>
                      <div className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">{alt.message}</div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/alerts');
                    }}
                    className="w-full py-1 text-xs font-semibold text-govblue-700 hover:text-govblue-900"
                  >
                    {t('alerts.title', 'Emergency Alert Center')} →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-navy-800">
            <div className="w-8 h-8 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center text-sky-400 font-bold text-xs">
              NEC
            </div>
            <div className="hidden 2xl:block text-left">
              <div className="text-xs font-bold text-white leading-tight">North Eastern Council</div>
              <div className="text-[10px] text-slate-400">Logistics & DM Cell</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
