import React, { useState } from 'react';
import { 
  Database, 
  Activity, 
  Radio, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Waves, 
  CloudSun, 
  Truck, 
  ShieldAlert, 
  Layers, 
  FileCode, 
  Copy, 
  ExternalLink,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { 
  GOVERNMENT_DATA_SOURCES, 
  HYDROLOGICAL_STATIONS, 
  WEATHER_TELEMETRY_STATIONS, 
  FASTAG_FREIGHT_NODES, 
  EMERGENCY_LIFELINE_DIRECTORY, 
  CROWDSOURCED_INCIDENT_FEED,
  exportRawDatasetJSON 
} from '../../data/collectedDatasets';
import { useToast } from '../../context/ToastContext';

export const DataStreamInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sources' | 'hydro' | 'weather' | 'fastag' | 'lifelines' | 'json'>('sources');
  const [isCopied, setIsCopied] = useState(false);
  const { addToast } = useToast();

  const handleDownloadJSON = () => {
    const dataStr = exportRawDatasetJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NE_LogiAI_SIH2026_Dataset_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('Dataset Downloaded', 'Exported complete North Eastern logistics & hazard dataset (JSON).', 'success');
  };

  const handleCopyJSON = () => {
    const dataStr = exportRawDatasetJSON();
    navigator.clipboard.writeText(dataStr);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
    addToast('Copied to Clipboard', 'Raw JSON schema copied.', 'info');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-5">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-govblue-100 text-govblue-700">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-navy-950">
                Multi-Layer Regional Data Catalog & Live Ingestion Feeds
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Live simulated government API streams, hydrology gauges, and crowdsourced driver telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyJSON}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-300 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-slate-600" />
            <span>{isCopied ? 'Copied ✓' : 'Copy Schema'}</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="px-3.5 py-1.5 rounded-xl bg-govblue-600 hover:bg-govblue-700 text-white text-xs font-bold transition-transform active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-sky-200" />
            <span>Export SIH Dataset (JSON)</span>
          </button>
        </div>
      </div>

      {/* KPI Stream Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Active Streams</div>
          <div className="text-xl font-black text-emerald-700 mt-0.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>6/6 Online</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">100% NER Coverage</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Records Processed / Day</div>
          <div className="text-xl font-black text-navy-950 mt-0.5 font-mono">
            36,538
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">Auto-Refreshed</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Telemetry Latency</div>
          <div className="text-xl font-black text-govblue-700 mt-0.5 font-mono">
            1.4s
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">Sub-second WebSockets</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Validated Lifeline POIs</div>
          <div className="text-xl font-black text-navy-950 mt-0.5 font-mono">
            42 POIs
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">Hospitals, Patrols, BRO</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('sources')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'sources'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🏛️ Government APIs (6)
        </button>

        <button
          onClick={() => setActiveTab('hydro')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'hydro'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🌊 CWC River Gauges (4)
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'weather'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🌧️ IMD Weather Stations (5)
        </button>

        <button
          onClick={() => setActiveTab('fastag')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'fastag'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🚚 FASTag Freight Nodes (4)
        </button>

        <button
          onClick={() => setActiveTab('lifelines')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'lifelines'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🏥 Lifelines & Patrols (7)
        </button>

        <button
          onClick={() => setActiveTab('json')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'json'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📄 Live JSON Payload
        </button>
      </div>

      {/* Tab Content 1: Government Sources */}
      {activeTab === 'sources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {GOVERNMENT_DATA_SOURCES.map((src) => (
            <div key={src.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-black text-navy-950">{src.name}</h4>
                  <p className="text-xs text-govblue-700 font-bold">{src.agency}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {src.status}
                </span>
              </div>

              <div className="font-mono text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200 truncate">
                {src.endpoint}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>Frequency: <strong className="text-navy-900">{src.updateFrequency}</strong></div>
                <div>Latency: <strong className="text-navy-900">{src.dataLatencySec}s</strong></div>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {src.fieldsProvided.map((fld) => (
                  <span key={fld} className="px-1.5 py-0.2 rounded bg-slate-200/80 text-[10px] font-mono text-slate-700">
                    {fld}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 2: Hydrology River Gauges */}
      {activeTab === 'hydro' && (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Gauge Station</th>
                <th className="p-3">River</th>
                <th className="p-3">Current Level</th>
                <th className="p-3">Warning / Danger</th>
                <th className="p-3">Status & Trend</th>
                <th className="p-3">Threatened Corridor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium">
              {HYDROLOGICAL_STATIONS.map((st) => (
                <tr key={st.stationId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-navy-950 font-mono">{st.location}</td>
                  <td className="p-3 text-slate-600">{st.river}</td>
                  <td className="p-3 font-mono font-bold text-navy-950">{st.currentWaterLevelM} m</td>
                  <td className="p-3 font-mono text-slate-500">{st.warningLevelM}m / {st.dangerLevelM}m</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      st.status === 'Normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {st.status} ({st.trend})
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-[11px]">{st.threatenedHighways.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content 3: Weather Telemetry */}
      {activeTab === 'weather' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {WEATHER_TELEMETRY_STATIONS.map((w) => (
            <div key={w.stationCode} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-500">{w.stationCode}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  w.landslideAlert === 'Red' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  w.landslideAlert === 'Yellow' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  Risk: {w.landslideAlert}
                </span>
              </div>
              <h4 className="text-sm font-black text-navy-950">{w.location}</h4>
              <p className="text-[11px] text-slate-500">{w.state}</p>
              
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs font-mono">
                <div>24h Rain: <strong className="text-navy-900">{w.rainfall24hMm} mm</strong></div>
                <div>Temp: <strong className="text-navy-900">{w.temperatureC}°C</strong></div>
                <div>Visibility: <strong className="text-navy-900">{w.visibilityMeters}m</strong></div>
                <div>Fog: <strong className="text-navy-900">{w.fogIndex}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 4: FASTag Nodes */}
      {activeTab === 'fastag' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FASTAG_FREIGHT_NODES.map((node) => (
            <div key={node.tollPlazaId} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-govblue-700 font-mono">{node.highway}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  node.congestionStatus === 'Free Flow' ? 'bg-emerald-100 text-emerald-800' :
                  node.congestionStatus === 'Moderate Queue' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {node.congestionStatus}
                </span>
              </div>
              <h4 className="text-sm font-black text-navy-950">{node.name}</h4>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono text-slate-600">
                <div>Truck Flow: <strong className="text-navy-900">{node.commercialTrucksHourly}/hr</strong></div>
                <div>Avg Dwell: <strong className="text-navy-900">{node.avgDwellMinutes} mins</strong></div>
                <div>Permits: <strong className="text-navy-900">{node.interstatePermitsCleared24h}</strong></div>
                <div>Violations: <strong className="text-navy-900">{node.overweightViolations24h}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 5: Lifelines Directory */}
      {activeTab === 'lifelines' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMERGENCY_LIFELINE_DIRECTORY.map((poi) => (
            <div key={poi.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase font-mono">{poi.category}</span>
                <span className="text-xs font-bold text-govblue-600">{poi.highwayCode}</span>
              </div>
              <h4 className="text-sm font-black text-navy-950">{poi.name}</h4>
              <p className="text-xs text-slate-500 font-medium">{poi.location} • {poi.operationalHours}</p>
              <div className="p-2 rounded bg-white border border-slate-200 text-xs font-mono text-navy-950">
                📞 Contact: <strong>{poi.contactPhone}</strong>
              </div>
              <div className="flex flex-wrap gap-1">
                {poi.capabilities.map((cap) => (
                  <span key={cap} className="px-1.5 py-0.2 rounded bg-slate-200/80 text-[10px] font-semibold text-slate-700">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 6: Raw JSON Schema Payload */}
      {activeTab === 'json' && (
        <div className="relative">
          <pre className="p-4 rounded-xl bg-navy-950 text-sky-300 font-mono text-xs overflow-x-auto max-h-96 border border-navy-800">
            {exportRawDatasetJSON()}
          </pre>
        </div>
      )}
    </div>
  );
};
