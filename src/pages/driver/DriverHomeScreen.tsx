import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  Volume2, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  CloudSun, 
  ShieldAlert, 
  Radio, 
  CheckCircle2, 
  Truck,
  Layers
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ListenButton } from '../../components/driver/ListenButton';
import { useToast } from '../../context/ToastContext';
import { speakText } from '../../utils/speechUtils';

export const DriverHomeScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleListenAlerts = () => {
    const alertMessage = "All clear on current route. Highway 27 traffic is moving smoothly. Guwahati Checkpoint is 15 minutes away with no delays.";
    speakText(alertMessage, language);
    addToast('Playing Voice Alert', alertMessage, 'info');
  };

  return (
    <div className="space-y-4 pb-20 max-w-md md:max-w-2xl mx-auto px-4 pt-3 font-sans">
      {/* 1. CURRENT TRIP CARD (Exact Stitch Design) */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 font-mono">
            {t('driver.currentTrip', 'CURRENT TRIP')}
          </span>
          <ListenButton
            textToSpeak="Current trip. Destination is Guwahati. Distance remaining: 18 kilometers. Estimated arrival in 45 minutes. Status is on time."
            label={t('driver.listen', 'LISTEN')}
            size="sm"
            variant="primary"
          />
        </div>

        {/* Big Destination Header */}
        <h2 className="text-2xl font-black text-navy-950 tracking-tight mb-4">
          Destination:<br />
          <span className="text-govblue-700 text-3xl font-extrabold">
            {t('driver.destinationCity', 'Guwahati')}
          </span>
        </h2>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 mb-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              {t('driver.distanceLeft', 'Distance Left')}
            </div>
            <div className="text-2xl font-black text-navy-950 font-mono mt-0.5">
              18 km
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              {t('driver.eta', 'ETA')}
            </div>
            <div className="text-2xl font-black text-navy-950 font-mono mt-0.5">
              45 mins
            </div>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
            {t('driver.status', 'Status')}
          </span>
          <span className="px-3.5 py-1 rounded-full bg-govblue-100 text-govblue-800 font-black text-xs uppercase tracking-wider border border-govblue-300">
            {t('driver.onTime', 'ON TIME')}
          </span>
        </div>
      </div>

      {/* 2. NEXT STOP CARD (Dark Card Stitch Design) */}
      <div className="bg-navy-950 text-white rounded-2xl p-5 shadow-md border border-navy-800">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 font-mono">
            {t('driver.nextStop', 'NEXT STOP')}
          </span>
          <ListenButton
            textToSpeak="Next stop is Guwahati Checkpoint, 15 minutes away."
            label={t('driver.listen', 'LISTEN')}
            size="sm"
            variant="dark"
          />
        </div>

        <h3 className="text-xl font-black text-white mb-2">
          {t('driver.checkpointName', 'Guwahati Checkpoint')}
        </h3>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900 border border-navy-800 text-xs font-bold text-sky-300 font-mono">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>{t('driver.minsAway', '15 mins away')}</span>
        </div>
      </div>

      {/* 3. ROUTE CONDITIONS (3 Big Touch Buttons + Listen to Alerts) */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm">
        <div className="text-xs font-black text-navy-950 uppercase tracking-wider mb-3">
          {t('driver.routeConditions', 'Route Conditions')}
        </div>

        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {/* Traffic */}
          <button
            type="button"
            onClick={() => speakText("Traffic condition: Smooth moving on Highway 27. Average speed 48 kilometers per hour.", language)}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-govblue-500 flex flex-col items-center justify-center text-center transition-transform active:scale-95 cursor-pointer group"
          >
            <div className="text-2xl mb-1">🚦</div>
            <div className="text-xs font-black text-navy-950">{t('driver.traffic', 'Traffic')}</div>
            <div className="text-[10px] text-emerald-700 font-bold mt-0.5">Smooth</div>
          </button>

          {/* Weather */}
          <button
            type="button"
            onClick={() => speakText("Weather condition: Clear skies. 26 degrees Celsius. Light breeze, good visibility.", language)}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-govblue-500 flex flex-col items-center justify-center text-center transition-transform active:scale-95 cursor-pointer group"
          >
            <div className="text-2xl mb-1">🌤️</div>
            <div className="text-xs font-black text-navy-950">{t('driver.weather', 'Weather')}</div>
            <div className="text-[10px] text-sky-700 font-bold mt-0.5">Clear 26°C</div>
          </button>

          {/* Blocked */}
          <button
            type="button"
            onClick={() => speakText("Road block alert: No active roadblocks on your assigned corridor.", language)}
            className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 hover:border-rose-400 flex flex-col items-center justify-center text-center transition-transform active:scale-95 cursor-pointer group"
          >
            <div className="text-2xl mb-1">🚫</div>
            <div className="text-xs font-black text-rose-900">{t('driver.blocked', 'Blocked')}</div>
            <div className="text-[10px] text-rose-700 font-bold mt-0.5">0 Active</div>
          </button>
        </div>

        {/* Big Wide Listen to Alerts Button */}
        <button
          type="button"
          onClick={handleListenAlerts}
          className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-300 shadow-sm transition-transform active:scale-95 cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-govblue-700" />
          <span>{t('driver.listenToAlerts', 'LISTEN TO ALERTS')}</span>
        </button>
      </div>

      {/* 4. PRIMARY ACTIONS (Big Blue Go To Map + Outline Start Delivery) */}
      <div className="space-y-3 pt-1">
        <button
          type="button"
          onClick={() => navigate('/driver/route')}
          className="w-full py-4 px-6 rounded-2xl bg-govblue-700 hover:bg-govblue-800 text-white font-black text-base uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95 cursor-pointer"
        >
          <Navigation className="w-6 h-6 text-sky-300" />
          <span>{t('driver.goToMap', 'Go to Map')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/driver/delivery')}
          className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-navy-950 font-black text-sm uppercase tracking-wider border-2 border-slate-300 shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
        >
          <Truck className="w-5 h-5 text-govblue-600" />
          <span>{t('driver.startDelivery', 'Start Delivery')}</span>
        </button>
      </div>
    </div>
  );
};
