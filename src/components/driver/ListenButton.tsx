import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { speakText } from '../../utils/speechUtils';
import { useLanguage } from '../../context/LanguageContext';

interface ListenButtonProps {
  textToSpeak: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ListenButton: React.FC<ListenButtonProps> = ({
  textToSpeak,
  label = 'LISTEN',
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { language } = useLanguage();

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    speakText(textToSpeak, language).finally(() => {
      setIsSpeaking(false);
    });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-govblue-600 hover:bg-govblue-700 text-white shadow-sm';
      case 'secondary':
        return 'bg-white/90 hover:bg-white text-navy-950 shadow-sm border border-slate-200';
      case 'dark':
        return 'bg-navy-900 hover:bg-navy-800 text-white shadow-sm border border-navy-700';
      case 'outline':
        return 'bg-transparent border-2 border-govblue-600 text-govblue-600 hover:bg-govblue-50';
      case 'icon':
        return 'bg-govblue-600 hover:bg-govblue-700 text-white p-2 rounded-full shadow-md';
      default:
        return 'bg-govblue-600 hover:bg-govblue-700 text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2.5 py-1 text-[11px] font-bold rounded-lg gap-1.5';
      case 'lg':
        return 'px-4 py-2.5 text-sm font-black rounded-xl gap-2';
      case 'md':
      default:
        return 'px-3 py-1.5 text-xs font-extrabold rounded-lg gap-1.5';
    }
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleSpeak}
        className={`inline-flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${getVariantStyles()} ${className}`}
        title="Listen to this instruction aloud"
        aria-label="Listen aloud"
      >
        {isSpeaking ? (
          <VolumeX className="w-5 h-5 animate-pulse text-sky-200" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center justify-center font-sans uppercase tracking-wide transition-all active:scale-95 cursor-pointer ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      title="Listen to this instruction aloud"
      aria-label="Listen aloud"
    >
      {isSpeaking ? (
        <>
          <Volume2 className="w-4 h-4 text-sky-300 animate-bounce" />
          <span className="animate-pulse">{label} • Speaking...</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
