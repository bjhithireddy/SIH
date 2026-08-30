import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  // Generate breadcrumb items
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const map: Record<string, string> = {
      '/dashboard': t('nav.overview', 'Overview'),
      '/map': t('nav.liveMap', 'Interactive Live Map'),
      '/routes': t('nav.routeIntelligence', 'AI Route Intelligence'),
      '/accessibility': t('nav.accessibility', 'Regional Accessibility'),
      '/risk': t('nav.riskDisruptions', 'Risk & Disruption Predictions'),
      '/analytics': t('nav.analytics', 'Logistics Performance Analytics'),
      '/ai-insights': t('nav.aiInsights', 'AI Logistics Insights'),
      '/alerts': t('nav.alerts', 'Real-Time Emergency Alerts'),
      '/reports': t('nav.reports', 'Strategic Reports & SITREPs'),
      '/settings': t('nav.settings', 'Platform Settings'),
    };
    return map[path] || t('nav.commandCenter', 'Command Center');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-navy-950 font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
          {/* Breadcrumb Header */}
          <div className="bg-white border-b border-slate-200/80 px-4 lg:px-8 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link to="/dashboard" className="flex items-center gap-1 hover:text-navy-900 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>{t('nav.commandCenter', 'Command Center')}</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-navy-950">{getBreadcrumbs()}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{t('app.allStates', '8 States Connected')}</span>
            </div>
          </div>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};
