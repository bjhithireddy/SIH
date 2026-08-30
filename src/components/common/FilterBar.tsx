import React from 'react';
import { NEState } from '../../types';
import { useAppState } from '../../context/AppStateContext';
import { Search, Filter, RefreshCw, X, MapPin } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface FilterBarProps {
  showTimeframe?: boolean;
  showSearch?: boolean;
  showStateSelect?: boolean;
  searchPlaceholder?: string;
  extraControls?: React.ReactNode;
  onRefresh?: () => void;
}

const NE_STATES: NEState[] = [
  'All',
  'Assam',
  'Arunachal Pradesh',
  'Meghalaya',
  'Manipur',
  'Mizoram',
  'Nagaland',
  'Tripura',
  'Sikkim'
];

export const FilterBar: React.FC<FilterBarProps> = ({
  showTimeframe = true,
  showSearch = true,
  showStateSelect = true,
  searchPlaceholder = 'Search corridor, district, or incident...',
  extraControls,
  onRefresh,
}) => {
  const {
    selectedState,
    setSelectedState,
    selectedTimeframe,
    setSelectedTimeframe,
    searchQuery,
    setSearchQuery,
  } = useAppState();
  const { addToast } = useToast();

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      addToast('Data Refreshed', 'Telemetry and AI predictions updated with latest sensor feeds.', 'info');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200/90 p-3 shadow-card flex flex-wrap items-center justify-between gap-3 mb-5">
      <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
        {/* State / Region Selector */}
        {showStateSelect && (
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-navy-900">
            <MapPin className="w-3.5 h-3.5 text-govblue-600 shrink-0" />
            <span className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider hidden sm:inline">Region:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value as NEState)}
              aria-label="Filter by North Eastern state region"
              className="bg-transparent font-bold text-navy-900 focus:outline-none cursor-pointer pr-2 text-xs"
            >
              {NE_STATES.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All 8 NE States' : st}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Input */}
        {showSearch && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-govblue-500 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {extraControls}
      </div>

      <div className="flex items-center gap-2">
        {/* Timeframe selector */}
        {showTimeframe && (
          <div className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold">
            {(['today', '7d', '30d', '90d'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedTimeframe === tf
                    ? 'bg-navy-900 text-white shadow-subtle'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                }`}
              >
                {tf === 'today' ? 'Today' : tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        )}

        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-navy-900 transition-colors"
          title="Refresh intelligence feeds"
          aria-label="Refresh intelligence feeds"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
