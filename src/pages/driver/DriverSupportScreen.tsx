import React from 'react';
import { 
  Headphones, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Radio, 
  Clock, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ListenButton } from '../../components/driver/ListenButton';
import { useToast } from '../../context/ToastContext';
import { speakText } from '../../utils/speechUtils';

export const DriverSupportScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();

  const handleCallDispatcher = () => {
    speakText('Calling central logistics dispatcher Guwahati hub.', language);
    addToast('Connecting Dispatcher', 'Dialing Central Logistics Operations Control...', 'info');
    setTimeout(() => {
      window.location.href = 'tel:1800123456';
    }, 1000);
  };

  const handleCallBro = () => {
    speakText('Connecting to Border Roads Organisation Highway Helpline.', language);
    addToast('Connecting BRO', 'Calling BRO Roadside Clearance Support...', 'info');
    setTimeout(() => {
      window.location.href = 'tel:1077';
    }, 1000);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md md:max-w-2xl mx-auto px-4 pt-3 font-sans">
      {/* Top Header Card */}
      <div className="bg-navy-950 text-white rounded-2xl p-5 shadow-lg border border-navy-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-govblue-600/30 border border-govblue-400 text-sky-400">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">
              24/7 Driver Support
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              North Eastern Logistics & Highway Assistance
            </p>
          </div>
        </div>

        <ListenButton
          textToSpeak="Driver support center. Call central logistics dispatcher, BRO highway helpline, or emergency roadside assistance."
          label={t('driver.listen', 'LISTEN')}
          size="sm"
          variant="secondary"
        />
      </div>

      {/* Primary Helplines Grid */}
      <div className="space-y-3">
        {/* Dispatcher Card */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-govblue-100 text-govblue-700 shrink-0 mt-0.5">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-navy-950">
                Central Logistics Dispatcher
              </h4>
              <p className="text-xs text-slate-500 font-semibold">
                Guwahati Hub • Active Fleet Desk #04
              </p>
              <div className="mt-1">
                <ListenButton
                  textToSpeak="Central Logistics Dispatcher at Guwahati Hub is available 24 hours on toll free 1800 123 456."
                  label="LISTEN"
                  size="sm"
                  variant="outline"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCallDispatcher}
            className="p-3 rounded-xl bg-govblue-600 hover:bg-govblue-700 text-white shadow-sm flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer"
            title="Call Dispatcher"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>

        {/* BRO Highway Helpline */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-navy-950">
                Border Roads Organisation (BRO)
              </h4>
              <p className="text-xs text-slate-500 font-semibold">
                Mountain Clearance & Tow Helpline (1077)
              </p>
              <div className="mt-1">
                <ListenButton
                  textToSpeak="Border Roads Organisation helpline 1077 for emergency landslide clearance and heavy vehicle towing."
                  label="LISTEN"
                  size="sm"
                  variant="outline"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCallBro}
            className="p-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer"
            title="Call BRO Helpline"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Driver Safety & Offline Guidelines Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-black text-navy-950 uppercase tracking-wide">
            Mountain Driving Protocol
          </span>
          <ListenButton
            textToSpeak="Mountain driving protocol: In poor visibility or heavy monsoon, turn on hazard lights, maintain 40 meter braking distance, and do not overtake on blind curves."
            label="LISTEN"
            size="sm"
            variant="outline"
          />
        </div>

        <ul className="space-y-2 text-xs text-slate-700 font-medium">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Engage low gear on steep mountain downgrades (NH-13 / NH-10).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Check brake air pressure and wheel chocks at every designated rest bay.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Keep emergency rations, water, and warm blankets in driver cabin.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
