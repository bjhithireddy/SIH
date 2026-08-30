import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SupportedLanguage } from '../../data/translations';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'compact' | 'drawer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'navbar',
  className = '' 
}) => {
  const { language, setLanguage, languages, currentLanguageOption, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  if (variant === 'drawer') {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono px-1">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>{t('common.language', 'Language')}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-govblue-700 text-white border-govblue-500 shadow-sm'
                    : 'bg-navy-900 text-slate-300 border-navy-800 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-sky-300" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 text-white border border-navy-700/80 rounded-lg px-2.5 py-1.5 text-xs font-semibold shadow-subtle transition-all cursor-pointer group"
        title="Change language / ভাষা সলনি কৰক / भाषा बदलें / ভাষা পরিবর্তন করুন"
        aria-label="Select Language"
      >
        <span className="text-sm leading-none">{currentLanguageOption.flag}</span>
        <Globe className="w-3.5 h-3.5 text-sky-400 group-hover:text-sky-300" />
        <span className="font-bold text-xs">{currentLanguageOption.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-navy-950 text-slate-200 rounded-xl shadow-2xl border border-navy-800 py-1.5 z-[9999] animate-in fade-in slide-in-from-top-2">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-navy-800 mb-1 flex items-center gap-1.5 font-mono">
            <Globe className="w-3 h-3 text-sky-400" />
            <span>Select Language</span>
          </div>

          <div className="space-y-0.5 px-1">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors text-left ${
                    isSelected
                      ? 'bg-govblue-700 text-white font-bold'
                      : 'hover:bg-navy-900 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div>
                      <div className="text-xs">{lang.nativeName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{lang.name}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-300 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
