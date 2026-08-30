import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { 
  LayoutDashboard, 
  Map, 
  Navigation, 
  Activity, 
  AlertOctagon, 
  BarChart3, 
  Sparkles, 
  Bell, 
  FileText, 
  Settings, 
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  to: string;
  labelKey: string;
  defaultLabel: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?: string;
  isAi?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { alerts, insights } = useAppState();
  const { t } = useLanguage();
  const location = useLocation();

  const criticalAlertsCount = alerts.filter((a) => !a.isResolved && a.severity === 'critical').length;
  const activeInsightsCount = insights.filter((i) => i.status === 'active').length;

  const navItems: NavItem[] = [
    {
      to: '/dashboard',
      labelKey: 'nav.overview',
      defaultLabel: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      to: '/map',
      labelKey: 'nav.liveMap',
      defaultLabel: 'Live Map',
      icon: <Map className="w-4 h-4" />,
      badge: t('common.live', 'Live'),
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      to: '/routes',
      labelKey: 'nav.routeIntelligence',
      defaultLabel: 'Route Intelligence',
      icon: <Navigation className="w-4 h-4" />,
      isAi: true,
    },
    {
      to: '/accessibility',
      labelKey: 'nav.accessibility',
      defaultLabel: 'Accessibility',
      icon: <Activity className="w-4 h-4" />,
    },
    {
      to: '/risk',
      labelKey: 'nav.riskDisruptions',
      defaultLabel: 'Risk & Disruptions',
      icon: <AlertOctagon className="w-4 h-4" />,
      badge: `17 ${t('common.active', 'Active')}`,
      badgeColor: 'bg-orange-600 text-white',
    },
    {
      to: '/analytics',
      labelKey: 'nav.analytics',
      defaultLabel: 'Logistics Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      to: '/ai-insights',
      labelKey: 'nav.aiInsights',
      defaultLabel: 'AI Insights',
      icon: <Sparkles className="w-4 h-4 text-sky-400" />,
      badge: `${activeInsightsCount}`,
      badgeColor: 'bg-govblue-600 text-white',
      isAi: true,
    },
    {
      to: '/alerts',
      labelKey: 'nav.alerts',
      defaultLabel: 'Alerts',
      icon: <Bell className="w-4 h-4" />,
      badge: criticalAlertsCount > 0 ? `${criticalAlertsCount} Crit` : undefined,
      badgeColor: 'bg-rose-600 text-white',
    },
    {
      to: '/reports',
      labelKey: 'nav.reports',
      defaultLabel: 'Reports',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      to: '/settings',
      labelKey: 'nav.settings',
      defaultLabel: 'Settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-navy-950 text-slate-300 border-r border-navy-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand in Sidebar */}
        <div>
          <div className="h-16 flex items-center justify-between px-5 border-b border-navy-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-govblue-600 flex items-center justify-center text-white shadow-sm font-bold text-sm">
                NE
              </div>
              <div className="font-extrabold text-white text-base tracking-tight font-sans">
                NE-Logi<span className="text-sky-400">AI</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-navy-900 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-4 px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {/* Mobile Language Selector inside drawer */}
            <div className="md:hidden pb-3 mb-2 border-b border-navy-800/80 px-1">
              <LanguageSelector variant="drawer" />
            </div>

            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              {t('nav.operationalIntel', 'Operational Intelligence')}
            </div>

            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              const label = t(item.labelKey, item.defaultLabel);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group ${
                    isActive
                      ? 'bg-govblue-700 text-white shadow-subtle'
                      : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'}`}>
                      {item.icon}
                    </span>
                    <span>{label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${item.badgeColor || 'bg-navy-800 text-slate-300'}`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-sky-300" />}
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer: System Status */}
        <div className="p-4 border-t border-navy-800 bg-navy-900/40">
          <div className="p-3 rounded-lg bg-navy-900/90 border border-navy-800 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                {t('nav.platformStatus', 'Platform Status')}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {t('nav.online', '99.8% Online')}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 leading-snug">
              Smart India Hackathon 2026<br />
              <span className="text-slate-500 font-mono text-[10px]">Model: NER-GeoNeuro v2.6</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
