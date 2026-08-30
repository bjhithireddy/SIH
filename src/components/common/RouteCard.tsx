import React from 'react';
import { RouteOption } from '../../types';
import { RiskBadge } from './RiskBadge';
import { Check, AlertCircle, Fuel, Clock, MapPin, IndianRupee, ShieldCheck } from 'lucide-react';

interface RouteCardProps {
  route: RouteOption;
  isSelected: boolean;
  onSelect: (route: RouteOption) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  route,
  isSelected,
  onSelect,
}) => {
  const getTagStyle = () => {
    switch (route.tag) {
      case 'Recommended':
        return 'bg-govblue-600 text-white border-govblue-600';
      case 'Safest':
        return 'bg-emerald-600 text-white border-emerald-600';
      case 'Fastest':
        return 'bg-amber-600 text-white border-amber-600';
      default:
        return 'bg-slate-600 text-white border-slate-600';
    }
  };

  return (
    <div
      onClick={() => onSelect(route)}
      className={`relative bg-white rounded-lg border-2 p-5 cursor-pointer transition-all duration-200 shadow-card ${
        isSelected
          ? 'border-govblue-600 ring-2 ring-govblue-100 shadow-elevated'
          : route.isRecommended
          ? 'border-govblue-300 hover:border-govblue-400'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded shadow-sm ${getTagStyle()}`}>
            {route.tag} {route.isRecommended ? '★ AI Choice' : ''}
          </span>
          <span className="text-xs font-bold text-slate-500 font-mono">
            ROUTE {route.code}
          </span>
        </div>
        <RiskBadge level={route.riskLevel} />
      </div>

      {/* Route Title & Reason */}
      <h3 className="text-base font-bold text-navy-950 line-clamp-1 mb-1">
        {route.name}
      </h3>
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        {route.reason}
      </p>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50 rounded-lg border border-slate-100 mb-4">
        <div>
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Est. Time</span>
          </div>
          <div className="text-sm font-extrabold text-navy-950 mt-0.5 font-mono">
            {route.timeStr}
          </div>
          {route.delayMinutes > 0 && (
            <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
              +{route.delayMinutes}m delay
            </div>
          )}
        </div>

        <div>
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>Distance</span>
          </div>
          <div className="text-sm font-extrabold text-navy-950 mt-0.5 font-mono">
            {route.distanceKm} km
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {route.viaCities.length} checkpoints
          </div>
        </div>

        <div>
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-slate-400" />
            <span>Accessibility</span>
          </div>
          <div className="text-sm font-extrabold text-navy-950 mt-0.5 font-mono">
            {route.accessibilityScore}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Risk: {route.riskScore}/100
          </div>
        </div>

        <div>
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Fuel className="w-3 h-3 text-slate-400" />
            <span>Fuel & Cost</span>
          </div>
          <div className="text-sm font-extrabold text-navy-950 mt-0.5 font-mono flex items-center">
            <span>{route.estimatedFuelLiters} L</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 flex items-center">
            <IndianRupee className="w-2.5 h-2.5" />
            <span>{route.estimatedCostInr.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-4">
        <div className="space-y-1">
          {route.pros.slice(0, 2).map((pro, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-emerald-800">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{pro}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {route.cons.slice(0, 2).map((con, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-rose-700">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{con}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selection state */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="text-[11px] text-slate-400 font-mono">
          Via: {route.viaCities.slice(0, 4).join(' → ')}...
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(route);
          }}
          className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            isSelected
              ? 'bg-govblue-700 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-navy-900'
          }`}
        >
          {isSelected && <Check className="w-3.5 h-3.5" />}
          <span>{isSelected ? 'Selected Corridor' : 'Select Corridor'}</span>
        </button>
      </div>
    </div>
  );
};
