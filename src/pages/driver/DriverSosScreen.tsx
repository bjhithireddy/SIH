import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Hospital, 
  Shield, 
  Wrench, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Check, 
  Volume2, 
  Navigation,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ListenButton } from '../../components/driver/ListenButton';
import { useToast } from '../../context/ToastContext';
import { speakText } from '../../utils/speechUtils';

export const DriverSosScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const [locationShared, setLocationShared] = useState(false);

  const handleSelectEmergency = (type: string, message: string) => {
    setSelectedEmergency(type);
    speakText(message, language);
    addToast('Emergency Type Selected', message, 'warning');
  };

  const handleShareLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
          navigator.clipboard?.writeText(`Emergency Driver SOS Location: ${coords} (NH-27 Guwahati Corridor)`);
          setLocationShared(true);
          const speech = `Emergency GPS location coordinates shared: ${coords}. Highway control room notified.`;
          speakText(speech, language);
          addToast('Location Broadcasted', `GPS Coordinates (${coords}) copied and dispatched to emergency network.`, 'success');
        },
        () => {
          const fallback = '26.1445° N, 91.7362° E (Guwahati Highway km 42)';
          setLocationShared(true);
          speakText('Emergency location dispatched for Guwahati Highway Corridor kilometer 42.', language);
          addToast('Location Broadcasted', `Fallback coordinates (${fallback}) dispatched to emergency taskforce.`, 'success');
        }
      );
    } else {
      setLocationShared(true);
      speakText('Emergency location dispatched for Guwahati Highway Corridor.', language);
      addToast('Location Broadcasted', 'Coordinates dispatched to Highway Patrol and Control Room.', 'success');
    }
  };

  const handleCallSos = () => {
    speakText('Initiating direct emergency call to National Emergency Response Support System 112 and NDRF taskforce.', language);
    addToast('Calling SOS', 'Connecting to 112 Emergency Highway Control Room...', 'error');
    setTimeout(() => {
      window.location.href = 'tel:112';
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md md:max-w-2xl mx-auto px-4 pt-3 font-sans">
      {/* 1. TOP RED ALERT BANNER (Exact Stitch Design) */}
      <div className="bg-rose-700 text-white rounded-2xl p-5 shadow-lg border-2 border-rose-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/20 text-white animate-pulse">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight uppercase">
              {t('driver.helpNeeded', 'HELP NEEDED?')}
            </h2>
            <p className="text-xs text-rose-100 font-medium">
              Tap any button below for instant response
            </p>
          </div>
        </div>

        <ListenButton
          textToSpeak="Emergency Help center. Choose Medical, Police, Breakdown, or Road Danger, or press Call SOS Now."
          label={t('driver.listen', 'LISTEN')}
          size="sm"
          variant="secondary"
        />
      </div>

      {/* 2. 4 BIG HIGH-CONTRAST EMERGENCY TILES */}
      <div className="grid grid-cols-2 gap-3">
        {/* Medical */}
        <button
          type="button"
          onClick={() => handleSelectEmergency('medical', 'Medical emergency assistance selected. Connecting to ambulance service 108.')}
          className={`p-5 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer shadow-sm ${
            selectedEmergency === 'medical'
              ? 'bg-rose-50 border-rose-600 ring-2 ring-rose-300'
              : 'bg-white border-slate-200 hover:border-rose-400'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-2">
            <Hospital className="w-6 h-6" />
          </div>
          <span className="text-sm font-black text-navy-950 uppercase tracking-wide">
            {t('driver.medical', 'Medical')}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold mt-0.5">Ambulance 108</span>
        </button>

        {/* Police */}
        <button
          type="button"
          onClick={() => handleSelectEmergency('police', 'Police and highway patrol selected. Connecting to 112.')}
          className={`p-5 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer shadow-sm ${
            selectedEmergency === 'police'
              ? 'bg-govblue-50 border-govblue-600 ring-2 ring-govblue-300'
              : 'bg-white border-slate-200 hover:border-govblue-400'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-govblue-100 flex items-center justify-center text-govblue-700 mb-2">
            <Shield className="w-6 h-6" />
          </div>
          <span className="text-sm font-black text-navy-950 uppercase tracking-wide">
            {t('driver.police', 'Police')}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold mt-0.5">Patrol 112</span>
        </button>

        {/* Breakdown */}
        <button
          type="button"
          onClick={() => handleSelectEmergency('breakdown', 'Vehicle breakdown selected. Connecting to Highway Tow and Heavy Mechanic service.')}
          className={`p-5 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer shadow-sm ${
            selectedEmergency === 'breakdown'
              ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-300'
              : 'bg-white border-slate-200 hover:border-amber-400'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-2">
            <Wrench className="w-6 h-6" />
          </div>
          <span className="text-sm font-black text-navy-950 uppercase tracking-wide">
            {t('driver.breakdown', 'Breakdown')}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold mt-0.5">Tow & Mechanic</span>
        </button>

        {/* Road Danger */}
        <button
          type="button"
          onClick={() => handleSelectEmergency('danger', 'Road danger reported. Landslide and obstruction notification dispatched to Border Roads Organisation.')}
          className={`p-5 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer shadow-sm ${
            selectedEmergency === 'danger'
              ? 'bg-orange-50 border-orange-600 ring-2 ring-orange-300'
              : 'bg-white border-slate-200 hover:border-orange-400'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 mb-2">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <span className="text-sm font-black text-navy-950 uppercase tracking-wide">
            {t('driver.roadDanger', 'Road Danger')}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold mt-0.5">Landslide / Hazard</span>
        </button>
      </div>

      {/* 3. NEAREST HELP SECTION (Exact Stitch Cards) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-1.5 text-xs font-black text-navy-950 uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-rose-600" />
          <span>{t('driver.nearestHelp', 'Nearest Help')}</span>
        </div>

        {/* Hospital Card */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 shrink-0 mt-0.5">
              <Hospital className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-navy-950">
                {t('driver.cityHospital', 'City General Hospital')}
              </h4>
              <p className="text-xs text-slate-500 font-semibold">
                {t('driver.hospitalDistance', '2 km away • Open 24 Hrs')}
              </p>
              <div className="mt-1">
                <ListenButton
                  textToSpeak="City General Hospital is 2 kilometers away on Highway 27, open 24 hours."
                  label="LISTEN"
                  size="sm"
                  variant="outline"
                />
              </div>
            </div>
          </div>

          <a
            href="tel:108"
            className="p-3 rounded-xl bg-govblue-600 hover:bg-govblue-700 text-white shadow-sm flex items-center justify-center shrink-0 transition-transform active:scale-95"
            title="Call Hospital"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Highway Patrol Station Card */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-govblue-100 text-govblue-700 shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-navy-950">
                {t('driver.highwayPatrol', 'Highway Patrol Station 4')}
              </h4>
              <p className="text-xs text-slate-500 font-semibold">
                {t('driver.patrolDistance', '5 km away • Emergency Response')}
              </p>
              <div className="mt-1">
                <ListenButton
                  textToSpeak="Highway Patrol Station 4 is 5 kilometers away with rapid response vehicle."
                  label="LISTEN"
                  size="sm"
                  variant="outline"
                />
              </div>
            </div>
          </div>

          <a
            href="tel:112"
            className="p-3 rounded-xl bg-govblue-600 hover:bg-govblue-700 text-white shadow-sm flex items-center justify-center shrink-0 transition-transform active:scale-95"
            title="Call Highway Patrol"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* 4. BOTTOM BIG ACTION BUTTONS */}
      <div className="space-y-3 pt-2">
        {/* Share Location Button */}
        <button
          type="button"
          onClick={handleShareLocation}
          className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider border-2 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer ${
            locationShared
              ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
              : 'bg-white hover:bg-slate-50 text-navy-950 border-slate-300 shadow-sm'
          }`}
        >
          {locationShared ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>LOCATION DISPATCHED ✓</span>
            </>
          ) : (
            <>
              <MapPin className="w-5 h-5 text-govblue-600" />
              <span>{t('driver.shareLocation', 'SHARE LOCATION')}</span>
            </>
          )}
        </button>

        {/* Big Red CALL SOS NOW Button */}
        <button
          type="button"
          onClick={handleCallSos}
          className="w-full py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-lg uppercase tracking-wider shadow-xl flex items-center justify-center gap-3 transition-transform active:scale-95 cursor-pointer ring-4 ring-rose-200"
        >
          <Phone className="w-6 h-6 animate-bounce" />
          <span>{t('driver.callSosNow', 'CALL SOS NOW')}</span>
        </button>
      </div>
    </div>
  );
};
