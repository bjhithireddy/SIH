import React, { useState } from 'react';
import { 
  Truck, 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  ShieldCheck, 
  Check, 
  Package, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ListenButton } from '../../components/driver/ListenButton';
import { useToast } from '../../context/ToastContext';
import { speakText } from '../../utils/speechUtils';

export const DriverDeliveryScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();

  // Delivery Step State: 0 = not started, 1 = started/in transit, 2 = arrived, 3 = completed
  const [deliveryStep, setDeliveryStep] = useState<number>(1);

  const handleStartDelivery = () => {
    setDeliveryStep(1);
    const msg = "Delivery started for ABC Warehouse Guwahati. Distance remaining: 2.5 kilometers. Follow Highway 27 bypass.";
    speakText(msg, language);
    addToast('Delivery In Transit', msg, 'info');
  };

  const handleArrived = () => {
    setDeliveryStep(2);
    const msg = "Arrival confirmed at ABC Warehouse, Guwahati Industrial Estate. Proceed to Bay 4 for unloading.";
    speakText(msg, language);
    addToast('Arrived at Destination', msg, 'success');
  };

  const handleDeliveryCompleted = () => {
    setDeliveryStep(3);
    const msg = "Delivery successfully completed! Digital proof of delivery verified and synced with North Eastern Logistics Command.";
    speakText(msg, language);
    addToast('Delivery Complete ✓', msg, 'success');
  };

  return (
    <div className="space-y-4 pb-24 max-w-md md:max-w-2xl mx-auto px-4 pt-3 font-sans">
      {/* 1. ACTIVE ROUTE HEADER WITH ON-TIME STATUS */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono">
            {t('driver.activeRoute', 'ACTIVE ROUTE')}
          </span>
          <h2 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
            {t('driver.delivery', 'Delivery')}
          </h2>
        </div>

        <span className="px-3.5 py-1 rounded-full bg-govblue-100 text-govblue-800 font-black text-xs uppercase tracking-wider border border-govblue-300 shadow-sm">
          {t('driver.onTime', 'ON TIME')}
        </span>
      </div>

      {/* 2. WAREHOUSE CARD (Exact Stitch Design) */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm space-y-4">
        {/* Warehouse Title & Listen Button */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-govblue-100 text-govblue-700 shrink-0 mt-0.5">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-navy-950">
                {t('driver.warehouse', 'ABC Warehouse')}
              </h3>
              <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-govblue-600" />
                <span>{t('driver.warehouseLocation', 'Guwahati Industrial Estate')}</span>
              </p>
            </div>
          </div>

          <ListenButton
            textToSpeak="ABC Warehouse located at Guwahati Industrial Estate. 2.5 kilometers remaining. Estimated arrival 14:30."
            label={t('driver.listen', 'LISTEN')}
            size="sm"
            variant="primary"
          />
        </div>

        {/* Distance Remaining & Estimated Arrival Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
          {/* Distance Remaining */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                {t('driver.distanceRemaining', 'Distance Remaining')}
              </span>
              <ListenButton
                textToSpeak="Distance remaining: 2.5 kilometers."
                label="🔊"
                size="sm"
                variant="outline"
                className="!p-1 !text-[10px]"
              />
            </div>
            <div className="text-2xl font-black text-navy-950 font-mono">
              {t('driver.distRemainingValue', '2.5 km')}
            </div>
          </div>

          {/* Estimated Arrival */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                {t('driver.estArrival', 'Est. Arrival')}
              </span>
              <ListenButton
                textToSpeak="Estimated arrival time is 14:30."
                label="🔊"
                size="sm"
                variant="outline"
                className="!p-1 !text-[10px]"
              />
            </div>
            <div className="text-2xl font-black text-navy-950 font-mono">
              {t('driver.estArrivalValue', '14:30')}
            </div>
          </div>
        </div>
      </div>

      {/* 3. ROUTE PREVIEW CONTAINER */}
      <div className="rounded-2xl border-2 border-slate-200 overflow-hidden bg-slate-100 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-black text-navy-950 uppercase tracking-wide">
            <Navigation className="w-4 h-4 text-govblue-600" />
            <span>Guwahati Terminal Link (NH-27)</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Live GPS Tracking
          </span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-govblue-600" />
            <span className="font-bold text-navy-950">Cargo: PDS Essential Ration Buffer (18T)</span>
          </div>
          <span className="font-mono text-[11px] font-bold text-slate-500">Seal #NE-8492</span>
        </div>
      </div>

      {/* 4. 3 BIG SEQUENTIAL DELIVERY STEP BUTTONS (Exact Stitch Design) */}
      <div className="space-y-3 pt-2">
        {/* Step 1: START DELIVERY */}
        <button
          type="button"
          onClick={handleStartDelivery}
          className={`w-full py-4 px-6 rounded-2xl font-black text-base uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95 cursor-pointer ${
            deliveryStep >= 1
              ? 'bg-govblue-700 text-white ring-2 ring-govblue-400'
              : 'bg-white text-navy-950 border-2 border-slate-300'
          }`}
        >
          <Truck className="w-6 h-6 text-sky-300" />
          <span>{t('driver.startDeliveryBtn', 'START DELIVERY')}</span>
          {deliveryStep >= 1 && <Check className="w-5 h-5 text-emerald-300" />}
        </button>

        {/* Step 2: ARRIVED */}
        <button
          type="button"
          onClick={handleArrived}
          className={`w-full py-4 px-6 rounded-2xl font-black text-base uppercase tracking-wider shadow-sm flex items-center justify-center gap-3 transition-transform active:scale-95 cursor-pointer ${
            deliveryStep >= 2
              ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 shadow-md'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-300'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>{t('driver.arrivedBtn', 'ARRIVED')}</span>
          {deliveryStep >= 2 && <Check className="w-5 h-5 text-white" />}
        </button>

        {/* Step 3: DELIVERY COMPLETED */}
        <button
          type="button"
          onClick={handleDeliveryCompleted}
          className={`w-full py-4 px-6 rounded-2xl font-black text-base uppercase tracking-wider shadow-sm flex items-center justify-center gap-3 transition-transform active:scale-95 cursor-pointer ${
            deliveryStep === 3
              ? 'bg-emerald-700 text-white ring-4 ring-emerald-300 shadow-xl'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-400 border border-slate-300'
          }`}
        >
          <CheckCircle2 className="w-6 h-6 text-white" />
          <span>{t('driver.deliveryCompletedBtn', 'DELIVERY COMPLETED')}</span>
        </button>
      </div>
    </div>
  );
};
