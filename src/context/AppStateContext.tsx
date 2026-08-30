import React, { createContext, useContext, useState, useEffect } from 'react';
import { NEState, CorridorRoute, MapPointOfInterest, DisruptionIncident, AIInsight, AlertNotification, AppSettings } from '../types';
import { NE_STATES_DATA } from '../data/statesData';
import { CORRIDORS_DATA } from '../data/corridorsData';
import { MAP_POINTS_DATA } from '../data/mapPointsData';
import { RISK_PREDICTIONS_DATA } from '../data/riskPredictionsData';
import { AI_INSIGHTS_DATA } from '../data/aiInsightsData';
import { ALERTS_DATA } from '../data/alertsData';

interface AppStateContextType {
  selectedState: NEState;
  setSelectedState: (state: NEState) => void;
  selectedTimeframe: 'today' | '7d' | '30d' | '90d';
  setSelectedTimeframe: (tf: 'today' | '7d' | '30d' | '90d') => void;
  selectedCorridor: CorridorRoute | null;
  setSelectedCorridor: (corridor: CorridorRoute | null) => void;
  selectCorridorById: (id: string) => void;
  mapLayers: {
    risk: boolean;
    weather: boolean;
    accessibility: boolean;
    traffic: boolean;
  };
  toggleMapLayer: (layer: 'risk' | 'weather' | 'accessibility' | 'traffic') => void;
  alerts: AlertNotification[];
  resolveAlert: (id: string) => void;
  markAlertAsRead: (id: string) => void;
  insights: AIInsight[];
  actionInsight: (id: string) => void;
  disruptions: DisruptionIncident[];
  updateDisruptionStatus: (id: string, status: DisruptionIncident['status']) => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const defaultSettings: AppSettings = {
  userName: 'Directorate Ops Command',
  userRole: 'Senior Logistics Strategist',
  agencyName: 'North Eastern Council & NDMA Taskforce',
  defaultState: 'All',
  refreshIntervalSeconds: 30,
  aiConfidenceThreshold: 80,
  landslideRainfallThresholdMm: 80,
  criticalAlertPush: true,
  smsEmergencyNotification: true,
  defaultBaseMap: 'standard',
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedState, setSelectedState] = useState<NEState>('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | '7d' | '30d' | '90d'>('today');
  const [selectedCorridor, setSelectedCorridor] = useState<CorridorRoute | null>(CORRIDORS_DATA[0]); // Default to Guwahati -> Tawang
  const [mapLayers, setMapLayers] = useState({
    risk: true,
    weather: true,
    accessibility: true,
    traffic: true,
  });
  const [alerts, setAlerts] = useState<AlertNotification[]>(ALERTS_DATA);
  const [insights, setInsights] = useState<AIInsight[]>(AI_INSIGHTS_DATA);
  const [disruptions, setDisruptions] = useState<DisruptionIncident[]>(RISK_PREDICTIONS_DATA);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [searchQuery, setSearchQuery] = useState('');

  const selectCorridorById = (id: string) => {
    const corridor = CORRIDORS_DATA.find((c) => c.id === id);
    if (corridor) {
      setSelectedCorridor(corridor);
    }
  };

  const toggleMapLayer = (layer: 'risk' | 'weather' | 'accessibility' | 'traffic') => {
    setMapLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  };

  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isResolved: true, isRead: true } : a))
    );
  };

  const markAlertAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const actionInsight = (id: string) => {
    setInsights((prev) =>
      prev.map((ins) => (ins.id === id ? { ...ins, status: 'actioned' } : ins))
    );
  };

  const updateDisruptionStatus = (id: string, status: DisruptionIncident['status']) => {
    setDisruptions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AppStateContext.Provider
      value={{
        selectedState,
        setSelectedState,
        selectedTimeframe,
        setSelectedTimeframe,
        selectedCorridor,
        setSelectedCorridor,
        selectCorridorById,
        mapLayers,
        toggleMapLayer,
        alerts,
        resolveAlert,
        markAlertAsRead,
        insights,
        actionInsight,
        disruptions,
        updateDisruptionStatus,
        settings,
        updateSettings,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
