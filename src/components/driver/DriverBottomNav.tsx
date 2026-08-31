import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Map, 
  Truck, 
  Headphones, 
  ShieldAlert, 
  Asterisk
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DriverBottomNav: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const tabs = [
    {
      to: '/driver',
      exact: true,
      label: t('tab.home', 'Home'),
      icon: <Home className="w-5 h-5" />,
      badge: null,
      color: 'text-slate-600',
      activeColor: 'text-govblue-600 font-black',
    },
    {
      to: '/driver/route',
      label: t('tab.route', 'Route'),
      icon: <Map className="w-5 h-5" />,
      badge: null,
      color: 'text-slate-600',
      activeColor: 'text-govblue-600 font-black',
    },
    {
      to: '/driver/delivery',
      label: t('tab.delivery', 'Delivery'),
      icon: <Truck className="w-5 h-5" />,
      badge: 'Live',
      color: 'text-slate-600',
      activeColor: 'text-govblue-600 font-black',
    },
    {
      to: '/driver/support',
      label: t('tab.support', 'Support'),
      icon: <Headphones className="w-5 h-5" />,
      badge: null,
      color: 'text-slate-600',
      activeColor: 'text-govblue-600 font-black',
    },
    {
      to: '/driver/sos',
      label: t('tab.sos', 'SOS'),
      icon: <Asterisk className="w-5 h-5 animate-pulse" />,
      badge: '!',
      color: 'text-rose-600',
      activeColor: 'text-rose-600 font-black scale-105',
      isSos: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl safe-area-pb">
      <div className="max-w-md md:max-w-4xl mx-auto px-2 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = tab.exact 
            ? location.pathname === tab.to || location.pathname === '/driver/home'
            : location.pathname.startsWith(tab.to);

          if (tab.isSos) {
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md font-black ring-2 ring-rose-300'
                    : 'text-rose-600 hover:bg-rose-50'
                }`}
              >
                <div className="relative">
                  <ShieldAlert className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                </div>
                <span className="text-[10px] uppercase font-black tracking-wider mt-0.5">
                  {tab.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-150 relative ${
                isActive
                  ? 'bg-govblue-50 text-govblue-700 font-extrabold shadow-sm'
                  : 'text-slate-500 hover:text-navy-950 hover:bg-slate-50'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-emerald-500 text-[8px] font-bold text-white font-mono">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold tracking-tight mt-0.5">
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
