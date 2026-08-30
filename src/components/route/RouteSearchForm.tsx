import React, { useState } from 'react';
import { Truck, Package, MapPin, Navigation, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface RouteSearchFormProps {
  onAnalyze: (params: { origin: string; destination: string; vehicle: string; cargo: string }) => void;
  isLoading: boolean;
  initialOrigin?: string;
  initialDestination?: string;
}

const ORIGINS = [
  'Guwahati (Assam Hub)',
  'Siliguri (North Bengal Gateway)',
  'Dibrugarh (Upper Assam)',
  'Shillong (Meghalaya)',
  'Dimapur (Nagaland Railhead)',
  'Silchar (Barak Valley)',
  'Agartala (Tripura Capital)',
  'Tezpur (Transit Base)',
];

const DESTINATIONS = [
  'Tawang (Arunachal Strategic)',
  'Gangtok (Sikkim Lifeline)',
  'Imphal (Manipur Valley)',
  'Aizawl (Mizoram Highlands)',
  'Kohima (Nagaland Capital)',
  'Itanagar (Papum Pare)',
  'Moreh (India-Myanmar Border)',
  'Chungthang (North Sikkim)',
  'Sabroom (Maitri Bridge)',
];

const VEHICLE_TYPES = [
  { id: 'truck', label: 'Heavy Truck (12-16 Wheeler)', desc: 'Max 28T Gross Weight' },
  { id: 'medium', label: 'Medium Freight (6-Wheeler)', desc: 'Max 12T Gross Weight' },
  { id: 'trailer', label: 'Multi-Axle Heavy Trailer', desc: 'Max 45T Heavy Freight' },
  { id: 'convoy', label: 'Emergency Relief Convoy', desc: 'Priority Armed Escort' },
  { id: 'light', label: 'Light 4x4 Supply Carrier', desc: 'Mountain High-Mobility' },
];

const CARGO_TYPES = [
  'Essential Medical & Hospital Supplies',
  'PDS Food Grains & Ration Buffer',
  'Petroleum, Oil & Lubricants (POL)',
  'High Altitude Military Gear & Bailey Spans',
  'Perishable Produce & Dairy',
  'General Industrial Hardware',
];

export const RouteSearchForm: React.FC<RouteSearchFormProps> = ({
  onAnalyze,
  isLoading,
  initialOrigin = 'Guwahati (Assam Hub)',
  initialDestination = 'Tawang (Arunachal Strategic)',
}) => {
  const { t } = useLanguage();
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [vehicle, setVehicle] = useState(VEHICLE_TYPES[0].label);
  const [cargo, setCargo] = useState(CARGO_TYPES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({
      origin: origin.split(' (')[0],
      destination: destination.split(' (')[0],
      vehicle,
      cargo,
    });
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-card mb-6"
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-navy-900 text-white">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
              {t('routes.title', 'Route Query & Terrain Parameters')}
            </h2>
            <p className="text-xs text-slate-500">{t('routes.subtitle', 'Specify origin, destination node, and cargo risk profile')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Origin */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('routes.origin', 'Origin Point')}</span>
          </label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-navy-950 focus:outline-none focus:ring-1 focus:ring-govblue-600 focus:bg-white cursor-pointer"
          >
            {ORIGINS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>{t('routes.destination', 'Destination Node')}</span>
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-navy-950 focus:outline-none focus:ring-1 focus:ring-govblue-600 focus:bg-white cursor-pointer"
          >
            {DESTINATIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-govblue-600" />
            <span>{t('routes.vehicle', 'Vehicle Classification')}</span>
          </label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-navy-950 focus:outline-none focus:ring-1 focus:ring-govblue-600 focus:bg-white cursor-pointer"
          >
            {VEHICLE_TYPES.map((v) => (
              <option key={v.id} value={v.label}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        {/* Cargo Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('routes.cargo', 'Cargo & Priority Profile')}</span>
          </label>
          <select
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-navy-950 focus:outline-none focus:ring-1 focus:ring-govblue-600 focus:bg-white cursor-pointer"
          >
            {CARGO_TYPES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={handleSwap}
          className="text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors flex items-center gap-1"
        >
          <span>⇄ Reverse Route Points</span>
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-md font-semibold text-xs text-white bg-govblue-700 hover:bg-govblue-800 disabled:opacity-50 transition-all flex items-center gap-2 shadow-subtle cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>{t('routes.analyzingBtn', 'Simulating AI Multi-Factor Matrix...')}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>{t('routes.analyzeBtn', 'Analyze Route & Predict Vulnerabilities')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
