import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SupportedLanguage } from '../../data/translations';
import { 
  Sparkles, 
  Mic, 
  Globe, 
  LayoutDashboard, 
  User, 
  Truck, 
  Radio
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { VoiceAssistantModal } from './VoiceAssistantModal';

export const DriverHeader: React.FC = () => {
  const { language, setLanguage, languages, t } = useLanguage();
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const location = useLocation();

  const isCommandCenter = !location.pathname.startsWith('/driver');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-md md:max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          {/* Left: Driver Avatar & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-govblue-700 to-sky-500 border-2 border-white shadow flex items-center justify-center text-white font-black text-xs shrink-0">
              <span>👤</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-navy-950 font-sans">
                  Logi<span className="text-govblue-600">Drive</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  SIH 2026
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Driver: Rajesh Deka (Assam-Tawang Fleet)</span>
              </div>
            </div>
          </div>

          {/* Right: Working Microphone Button & Language Quick-Pills & Portal Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Real Voice Input Microphone Button */}
            <button
              type="button"
              onClick={() => setVoiceModalOpen(true)}
              className="p-2 rounded-xl bg-govblue-50 text-govblue-700 hover:bg-govblue-100 border border-govblue-200 shadow-sm transition-transform active:scale-95 flex items-center gap-1 cursor-pointer group"
              title="Voice Assistant (Tap to Speak)"
              aria-label="Voice Assistant"
            >
              <Mic className="w-4 h-4 text-govblue-600 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-extrabold hidden xs:inline uppercase tracking-wider">Voice</span>
            </button>

            {/* Portal Switcher (For SIH Judges & Admin) */}
            <Link
              to="/dashboard"
              className="px-2.5 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-[11px] font-bold transition-colors flex items-center gap-1 shadow-sm shrink-0"
              title="Switch to Full Admin Intelligence Command Portal"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-sky-300" />
              <span className="hidden sm:inline">Admin Portal</span>
            </Link>
          </div>
        </div>

        {/* Language Quick Switcher Bar (Directly matching Stitch Screen [EN] [HI] [AS] [BN] [MN]) */}
        <div className="bg-slate-50/90 border-t border-slate-200/80 px-4 py-1.5">
          <div className="max-w-md md:max-w-4xl mx-auto flex items-center justify-between gap-1 overflow-x-auto">
            <div className="flex items-center gap-1 text-[11px] font-extrabold text-slate-500 font-mono shrink-0 pr-1">
              <Globe className="w-3.5 h-3.5 text-govblue-600" />
              <span>{t('driver.translate', 'Translate')}:</span>
            </div>

            <div className="flex items-center gap-1">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-govblue-600 text-white shadow-sm ring-1 ring-govblue-400 scale-105'
                        : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                    }`}
                  >
                    {lang.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Real Speech-to-Text Voice Modal */}
      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />
    </>
  );
};
