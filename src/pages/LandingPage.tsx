import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Navigation, 
  Activity, 
  AlertOctagon, 
  BarChart3, 
  ArrowRight, 
  ShieldCheck, 
  Mountain,
  Compass
} from 'lucide-react';
import { NE_STATES_DATA } from '../data/statesData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/common/LanguageSelector';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: <Navigation className="w-6 h-6 text-govblue-600" />,
      title: t('landing.feat1.title', 'AI Route Intelligence'),
      desc: t('landing.feat1.desc', 'Dynamic multi-factor route scoring incorporating slope gradient, soil moisture, bridge tonnage, and realtime bottleneck data.'),
      to: '/routes'
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-600" />,
      title: t('landing.feat2.title', 'Accessibility Monitoring'),
      desc: t('landing.feat2.desc', 'District-level isolation risk matrix and critical infrastructure tracking across roads, bridges, railheads, and airfields.'),
      to: '/accessibility'
    },
    {
      icon: <AlertOctagon className="w-6 h-6 text-rose-600" />,
      title: t('landing.feat3.title', 'Risk Prediction'),
      desc: t('landing.feat3.desc', 'Early warning neural hazard engine forecasting landslide, flood overtopping, and rockfall probabilities up to 48 hours in advance.'),
      to: '/risk'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-amber-600" />,
      title: t('landing.feat4.title', 'Logistics Optimization'),
      desc: t('landing.feat4.desc', 'End-to-end freight throughput metrics, fuel burn penalties, detour cost simulation, and essential supply chain buffers.'),
      to: '/analytics'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-navy-950 font-sans flex flex-col selection:bg-govblue-600 selection:text-white">
      {/* Top Government-Style Header */}
      <header className="bg-navy-950 text-white border-b border-navy-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-govblue-600 flex items-center justify-center text-white shadow-sm font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white">
                NE-Logi<span className="text-sky-400">AI</span>
              </span>
              <span className="ml-2 px-2 py-0.5 rounded bg-navy-800 text-[10px] font-mono text-sky-300 border border-navy-700 hidden sm:inline">
                {t('app.sihTag', 'Smart India Hackathon 2026')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 🌐 Visible Multi-Language Selector */}
            <LanguageSelector variant="navbar" />

            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-govblue-700 hover:bg-govblue-600 text-white text-xs font-bold transition-colors shadow-subtle flex items-center gap-1.5"
            >
              <span>{t('landing.launchBtn', 'Launch Intelligence Dashboard')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle Map Inspired Background Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-govblue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-navy-700 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('app.tagline', 'AI-Based Smart Logistics & Accessibility Intelligence Platform')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {t('landing.heroTitle', 'AI-Powered Logistics Intelligence for')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-govblue-400">
              {t('landing.heroRegion', 'North Eastern India')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            {t('landing.heroSubtitle', 'Predict disruptions, optimize routes, and improve accessibility across the North Eastern Region with real-time geospatial telemetry and explainable AI models.')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-lg bg-govblue-600 hover:bg-govblue-500 text-white text-sm font-bold transition-all shadow-elevated flex items-center gap-2"
            >
              <span>{t('landing.launchBtn', 'Launch Intelligence Dashboard')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/map"
              className="px-6 py-3 rounded-lg bg-navy-800/90 hover:bg-navy-800 text-slate-200 border border-navy-700 text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>{t('landing.exploreMapBtn', 'Explore Interactive Live Map')}</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14 pt-8 border-t border-navy-800/80 text-left">
            <div className="p-3 bg-navy-900/60 rounded-lg border border-navy-800">
              <div className="text-slate-400 text-xs">{t('dashboard.kpi.accessibility', 'Accessibility Index')}</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">78.4%</div>
              <div className="text-[11px] text-slate-400">{t('app.allStates', 'Across 8 States')}</div>
            </div>
            <div className="p-3 bg-navy-900/60 rounded-lg border border-navy-800">
              <div className="text-slate-400 text-xs">{t('dashboard.kpi.corridors', 'Arterial Corridors')}</div>
              <div className="text-2xl font-bold text-white font-mono mt-0.5">12 Routes</div>
              <div className="text-[11px] text-slate-400">{t('app.telemetryActive', 'Sensors Active')}</div>
            </div>
            <div className="p-3 bg-navy-900/60 rounded-lg border border-navy-800">
              <div className="text-slate-400 text-xs">{t('dashboard.kpi.aiPredicted', 'Disruption Predictions')}</div>
              <div className="text-2xl font-bold text-sky-400 font-mono mt-0.5">8 Predicted</div>
              <div className="text-[11px] text-slate-400">Next 24 Hours</div>
            </div>
            <div className="p-3 bg-navy-900/60 rounded-lg border border-navy-800">
              <div className="text-slate-400 text-xs">{t('dashboard.kpi.infraAccess', 'Infrastructure Access')}</div>
              <div className="text-2xl font-bold text-white font-mono mt-0.5">91.0%</div>
              <div className="text-[11px] text-slate-400">Lifeline Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Cards Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Enterprise Decision Support Platform
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Engineered specifically for disaster management authorities, military logistics convoys, state PWDs, and essential supply supply-chain operators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(feat.to)}
              className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-card hover:shadow-elevated hover:border-govblue-400 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 w-fit mb-4 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-navy-950 mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-govblue-700 group-hover:text-govblue-900 gap-1">
                <span>Explore Feature</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Built for the Unique Challenges Section */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-navy-800 text-sky-400 text-xs font-mono mb-3">
                <Mountain className="w-3.5 h-3.5" />
                <span>Geographical Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {t('landing.uniqueChallengeTitle', 'Built for the unique geographical and logistical challenges of the North Eastern Region.')}
              </h2>
              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                {t('landing.uniqueChallengeDesc', 'The North Eastern Region faces unique terrain constraints including monsoonal cloudbursts, severe landslide shear zones along the young fold Himalayas, high-altitude passes like Sela (4,170m), and single arterial chokepoints like the Siliguri corridor and NH-10.')}
              </p>

              <div className="mt-8">
                <Link
                  to="/routes"
                  className="px-5 py-2.5 rounded-lg bg-govblue-600 hover:bg-govblue-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                >
                  <span>{t('landing.testRouteEngine', 'Test AI Route Engine')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* State Grid */}
            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 font-mono">
                {t('access.scorecard', 'State Accessibility Index (8 States)')}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {NE_STATES_DATA.map((state) => (
                  <div
                    key={state.name}
                    onClick={() => navigate('/accessibility')}
                    className="p-3 rounded-lg bg-navy-900/90 border border-navy-800 hover:border-govblue-500 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{state.name}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {state.accessibilityScore}%
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>{state.activeDisruptions} Disruptions</span>
                      <span className="text-sky-300 font-mono">{state.rainfall24hMm}mm rain</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-navy-800 py-8 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>NE-LogiAI Platform • {t('app.sihTag', 'Smart India Hackathon 2026')}</span>
          </div>
          <div className="text-slate-500">
            {t('app.orgName', 'North Eastern Council (NEC) & National Disaster Management Authority Intelligence System')}
          </div>
        </div>
      </footer>
    </div>
  );
};
