import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Volume2, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  CornerUpRight,
  Compass,
  Layers,
  Fuel
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ListenButton } from '../../components/driver/ListenButton';
import { InteractiveMap } from '../../components/map/InteractiveMap';
import { speakText } from '../../utils/speechUtils';

export const DriverRouteScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentTurn, setCurrentTurn] = useState({
    title: 'NEXT TURN',
    direction: 'Right In 500m',
    instruction: 'Turn right in 500 metres towards NH-27 Guwahati bypass.',
  });

  const handleSpeakerClick = () => {
    speakText(currentTurn.instruction, language);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md md:max-w-4xl mx-auto px-4 pt-2 font-sans">
      {/* 1. MAP VIEW WITH STATUS OVERLAYS (Exact Stitch Screen 3) */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md">
        {/* Top Status Badges on Map */}
        <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-emerald-600/95 text-white font-black text-xs uppercase tracking-wide shadow-md flex items-center gap-1.5 border border-emerald-400">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{t('driver.routeClear', 'ROUTE CLEAR')}</span>
          </div>
        </div>

        {/* Floating Speaker Icon on Map */}
        <div className="absolute top-3 right-3 z-[1000]">
          <ListenButton
            textToSpeak="Navigation update: Route is clear on National Highway 27. Next turn right in 500 metres."
            label="LISTEN"
            variant="icon"
            className="shadow-lg"
          />
        </div>

        {/* Embedded Leaflet Map */}
        <InteractiveMap height="h-[340px] sm:h-[420px]" showDetailsPanel={false} />
      </div>

      {/* 2. CHECKPOINTS AHEAD CARD (Exact Stitch Design) */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-govblue-600" />
            <h3 className="text-sm font-black text-navy-950 uppercase tracking-wide">
              {t('driver.checkpointsAhead', 'Checkpoints Ahead')}
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-500 font-mono">2 Enroute</span>
        </div>

        {/* Checkpoint 1 */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <div>
              <div className="font-extrabold text-navy-950 text-xs">
                {t('driver.checkpoint1', 'Assam Border Toll')}
              </div>
              <div className="text-[11px] text-slate-500 font-mono font-semibold">
                {t('driver.checkpoint1Dist', '22 km')} • Avg wait 4 mins
              </div>
            </div>
          </div>

          <ListenButton
            textToSpeak="Assam Border Toll is 22 kilometers ahead. Average wait time is 4 minutes."
            label={t('driver.listen', 'LISTEN')}
            size="sm"
            variant="outline"
          />
        </div>

        {/* Checkpoint 2 */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-govblue-600 text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <div>
              <div className="font-extrabold text-navy-950 text-xs">
                {t('driver.checkpoint2', 'IndianOil Depot')}
              </div>
              <div className="text-[11px] text-slate-500 font-mono font-semibold">
                {t('driver.checkpoint2Dist', '45 km')} • POL Fuel & Rest Area
              </div>
            </div>
          </div>

          <ListenButton
            textToSpeak="IndianOil Depot is 45 kilometers ahead. Fuel station and driver rest area available."
            label={t('driver.listen', 'LISTEN')}
            size="sm"
            variant="outline"
          />
        </div>
      </div>

      {/* 3. FLOATING BOTTOM TURN BANNER (Blue High-Contrast Card Stitch Design) */}
      <div className="bg-govblue-700 text-white rounded-2xl p-5 shadow-xl border-2 border-govblue-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-white/15 text-sky-200">
            <CornerUpRight className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-sky-200 font-mono">
              {t('driver.nextTurn', 'NEXT TURN')}
            </div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-0.5">
              {t('driver.rightIn500m', 'Right In 500m')}
            </div>
            <div className="text-[11px] text-sky-100 font-medium mt-0.5">
              Towards NH-27 Guwahati bypass
            </div>
          </div>
        </div>

        <ListenButton
          textToSpeak={t('driver.turnInstruction', 'Turn right in 500 metres towards NH-27 Guwahati bypass.')}
          label={t('driver.listen', 'LISTEN')}
          size="md"
          variant="secondary"
        />
      </div>
    </div>
  );
};
