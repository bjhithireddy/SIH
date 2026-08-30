import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { CORRIDORS_DATA } from '../../data/corridorsData';
import { MAP_POINTS_DATA } from '../../data/mapPointsData';
import { useAppState } from '../../context/AppStateContext';
import { MapLegend } from './MapLegend';
import { MapLayerControls } from './MapLayerControls';
import { CorridorDetailPanel } from './CorridorDetailPanel';
import { CorridorRoute, MapPointOfInterest, NEState } from '../../types';
import { getStatusColor } from '../../utils/formatters';
import { 
  Crosshair, 
  Layers, 
  X, 
  Info 
} from 'lucide-react';

// Fix leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Helper component to programmatically pan/zoom map
const MapController: React.FC<{ selectedCorridor: CorridorRoute | null; selectedState: NEState }> = ({
  selectedCorridor,
  selectedState,
}) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCorridor && selectedCorridor.coordinates.length > 0) {
      const bounds = L.latLngBounds(selectedCorridor.coordinates);
      map.flyToBounds(bounds, { padding: [40, 40], duration: 1.2 });
    }
  }, [selectedCorridor, map]);

  useEffect(() => {
    const stateCoordinates: Record<NEState, [number, number, number]> = {
      'All': [26.2006, 92.9376, 7],
      'Assam': [26.2006, 92.9376, 7],
      'Arunachal Pradesh': [27.5000, 93.6000, 7],
      'Meghalaya': [25.5788, 91.8933, 8],
      'Manipur': [24.8170, 93.9368, 8],
      'Mizoram': [23.7271, 92.7176, 8],
      'Nagaland': [25.6751, 94.1086, 8],
      'Tripura': [23.8315, 91.2868, 8],
      'Sikkim': [27.5330, 88.5122, 9],
    };

    if (selectedState && stateCoordinates[selectedState]) {
      const [lat, lng, zoom] = stateCoordinates[selectedState];
      map.flyTo([lat, lng], zoom, { duration: 1.2 });
    }
  }, [selectedState, map]);

  return null;
};

// Custom DivIcon generator for map points
const createCustomMarkerIcon = (point: MapPointOfInterest) => {
  let bgColor = 'bg-slate-700';
  let borderColor = 'border-slate-500';
  let innerIcon = '📍';

  switch (point.category) {
    case 'landslide':
      bgColor = 'bg-rose-600';
      borderColor = 'border-rose-300';
      innerIcon = '⚠️';
      break;
    case 'flood':
      bgColor = 'bg-sky-600';
      borderColor = 'border-sky-300';
      innerIcon = '🌊';
      break;
    case 'road_closure':
    case 'accident':
      bgColor = 'bg-orange-600';
      borderColor = 'border-orange-300';
      innerIcon = '⛔';
      break;
    case 'bridge':
      bgColor = 'bg-indigo-600';
      borderColor = 'border-indigo-300';
      innerIcon = '🌉';
      break;
    case 'airport':
      bgColor = 'bg-slate-800';
      borderColor = 'border-slate-400';
      innerIcon = '✈️';
      break;
    case 'railway':
      bgColor = 'bg-teal-700';
      borderColor = 'border-teal-300';
      innerIcon = '🚆';
      break;
    case 'warehouse':
      bgColor = 'bg-emerald-700';
      borderColor = 'border-emerald-300';
      innerIcon = '📦';
      break;
    case 'checkpoint':
      bgColor = 'bg-amber-600';
      borderColor = 'border-amber-300';
      innerIcon = '🛡️';
      break;
    case 'relief_center':
      bgColor = 'bg-emerald-600';
      borderColor = 'border-emerald-300';
      innerIcon = '🏥';
      break;
  }

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform duration-200">
      <div class="w-7 h-7 rounded-full ${bgColor} border-2 ${borderColor} shadow-lg flex items-center justify-center text-[12px] text-white">
        <span>${innerIcon}</span>
      </div>
      <div class="absolute -bottom-1 w-2 h-2 ${bgColor} rotate-45"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

interface InteractiveMapProps {
  height?: string;
  showDetailsPanel?: boolean;
  onCorridorSelect?: (corridor: CorridorRoute) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  height = 'h-[420px] sm:h-[540px] lg:h-[640px]',
  showDetailsPanel = true,
  onCorridorSelect,
}) => {
  const {
    selectedState,
    selectedCorridor,
    setSelectedCorridor,
    mapLayers,
    searchQuery,
  } = useAppState();

  const [panelOpen, setPanelOpen] = useState(true);
  const [showMobileLayers, setShowMobileLayers] = useState(false);
  const [showMobileLegend, setShowMobileLegend] = useState(false);

  // Filter corridors based on selected state and search
  const filteredCorridors = CORRIDORS_DATA.filter((corridor) => {
    const matchesState =
      selectedState === 'All' ||
      corridor.originState === selectedState ||
      corridor.destinationState === selectedState;

    const matchesSearch =
      !searchQuery ||
      corridor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      corridor.highwayCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      corridor.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      corridor.destination.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesState && matchesSearch;
  });

  // Filter map points
  const filteredPoints = MAP_POINTS_DATA.filter((point) => {
    const matchesState = selectedState === 'All' || point.state === selectedState;
    const matchesSearch =
      !searchQuery ||
      point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Layer visibility filters
    if (point.category === 'landslide' && !mapLayers.risk) return false;
    if (point.category === 'flood' && !mapLayers.weather) return false;
    if ((point.category === 'checkpoint' || point.category === 'accident') && !mapLayers.traffic) return false;
    if ((point.category === 'warehouse' || point.category === 'relief_center' || point.category === 'hospital' || point.category === 'bridge') && !mapLayers.accessibility) return false;

    return matchesState && matchesSearch;
  });

  const handleCorridorClick = (corridor: CorridorRoute) => {
    setSelectedCorridor(corridor);
    setPanelOpen(true);
    if (onCorridorSelect) {
      onCorridorSelect(corridor);
    }
  };

  return (
    <div className={`relative w-full ${height} rounded-xl overflow-hidden border border-slate-200 shadow-card bg-slate-900 touch-manipulation`}>
      <MapContainer
        center={[26.2006, 92.9376]}
        zoom={7}
        className="w-full h-full z-0"
        scrollWheelZoom={false}
      >
        <MapController selectedCorridor={selectedCorridor} selectedState={selectedState} />

        {/* High performance CartoDB Voyager tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> &copy; OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Polylines for Arterial Corridors */}
        {filteredCorridors.map((corridor) => {
          const isSelected = selectedCorridor?.id === corridor.id;
          const color = getStatusColor(corridor.status);

          return (
            <React.Fragment key={corridor.id}>
              {/* Outer stroke for selected corridor */}
              {isSelected && (
                <Polyline
                  positions={corridor.coordinates}
                  pathOptions={{
                    color: '#0F172A',
                    weight: 10,
                    opacity: 0.8,
                    dashArray: '8, 8',
                    lineCap: 'round',
                  }}
                />
              )}

              {/* Main colored route line */}
              <Polyline
                positions={corridor.coordinates}
                eventHandlers={{
                  click: () => handleCorridorClick(corridor),
                }}
                pathOptions={{
                  color,
                  weight: isSelected ? 6 : 4,
                  opacity: isSelected ? 1 : 0.85,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              >
                <Tooltip sticky direction="top">
                  <div className="text-xs p-1">
                    <div className="font-bold text-navy-950">{corridor.name}</div>
                    <div className="text-slate-500 font-mono text-[10px]">
                      {corridor.highwayCode} • {corridor.distanceKm} km • {corridor.statusLabel}
                    </div>
                  </div>
                </Tooltip>
              </Polyline>
            </React.Fragment>
          );
        })}

        {/* Points of Interest Markers */}
        {filteredPoints.map((point) => (
          <Marker
            key={point.id}
            position={point.coordinates}
            icon={createCustomMarkerIcon(point)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-1 max-w-[240px] sm:max-w-xs text-xs font-sans">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-navy-950 font-mono text-[11px] uppercase">
                    {point.category.replace('_', ' ')}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    point.severity === 'critical' ? 'bg-rose-100 text-rose-800' :
                    point.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    point.severity === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {point.severity}
                  </span>
                </div>
                <div className="font-bold text-navy-900 text-xs sm:text-sm mb-1 leading-snug">
                  {point.name}
                </div>
                <div className="text-slate-500 text-[10px] sm:text-[11px] mb-1.5 flex items-center gap-1">
                  <span>📍 {point.locationName}, {point.state}</span>
                </div>
                <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed mb-2">
                  {point.description}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
                  <span>Status: <strong className="text-navy-900">{point.status}</strong></span>
                  {point.estimatedClearance && (
                    <span className="text-rose-700 font-medium">{point.estimatedClearance}</span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Layer Controls (Top Left on desktop, collapsible on mobile) */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-2">
        <div className="hidden sm:block max-w-[200px]">
          <MapLayerControls />
        </div>
        <button
          onClick={() => setShowMobileLayers(!showMobileLayers)}
          className="sm:hidden p-2 rounded-lg bg-white/95 text-navy-950 border border-slate-200 shadow-md font-semibold text-xs flex items-center gap-1.5"
          aria-label="Toggle map layers"
        >
          <Layers className="w-4 h-4 text-govblue-600" />
          <span className="text-[11px]">Layers</span>
        </button>
        {showMobileLayers && (
          <div className="sm:hidden max-w-[220px] animate-in fade-in">
            <MapLayerControls />
          </div>
        )}
      </div>

      {/* Floating Map Legend (Bottom Left on desktop, icon toggle on mobile) */}
      <div className="absolute bottom-3 left-3 z-[1000]">
        <div className="hidden sm:block max-w-[260px]">
          <MapLegend />
        </div>
        <button
          onClick={() => setShowMobileLegend(!showMobileLegend)}
          className="sm:hidden p-2 rounded-lg bg-white/95 text-navy-950 border border-slate-200 shadow-md font-semibold text-xs flex items-center gap-1.5"
          aria-label="Toggle map legend"
        >
          <Info className="w-4 h-4 text-govblue-600" />
          <span className="text-[11px]">Legend</span>
        </button>
        {showMobileLegend && (
          <div className="sm:hidden absolute bottom-10 left-0 max-w-[280px] animate-in fade-in">
            <MapLegend />
          </div>
        )}
      </div>

      {/* Floating Selected Corridor Detail Panel (Top Right on desktop, responsive slide-up on mobile) */}
      {showDetailsPanel && selectedCorridor && panelOpen && (
        <div className="absolute inset-x-2 bottom-2 sm:inset-auto sm:top-3 sm:right-3 z-[1000] max-w-full sm:max-w-sm">
          <CorridorDetailPanel
            corridor={selectedCorridor}
            onClose={() => setPanelOpen(false)}
          />
        </div>
      )}

      {/* Re-open panel button if closed */}
      {showDetailsPanel && selectedCorridor && !panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          className="absolute top-3 right-3 z-[1000] px-3 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold shadow-elevated flex items-center gap-1.5 hover:bg-govblue-700 transition-colors"
        >
          <Crosshair className="w-3.5 h-3.5" />
          <span className="text-[11px] truncate max-w-[150px] sm:max-w-none">
            {selectedCorridor.origin} → {selectedCorridor.destination}
          </span>
        </button>
      )}
    </div>
  );
};
