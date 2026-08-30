export type NEState = 
  | 'All'
  | 'Assam'
  | 'Arunachal Pradesh'
  | 'Meghalaya'
  | 'Manipur'
  | 'Mizoram'
  | 'Nagaland'
  | 'Tripura'
  | 'Sikkim';

export type SeverityLevel = 'normal' | 'low' | 'moderate' | 'warning' | 'high' | 'critical';
export type DisruptionType = 'landslide' | 'flood' | 'heavy_rain' | 'road_closure' | 'bridge_damage' | 'traffic' | 'earthquake' | 'infrastructure_failure';
export type InfrastructureCategory = 'Road' | 'Bridge' | 'Railway' | 'Airport' | 'Warehouse' | 'Hospital' | 'Relief Center' | 'Checkpoint';

export interface StateSummary {
  name: NEState;
  code: string;
  capital: string;
  accessibilityScore: number;
  activeDisruptions: number;
  highRiskCorridors: number;
  criticalPoints: number;
  weatherCondition: string;
  rainfall24hMm: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export interface CorridorRoute {
  id: string;
  name: string;
  highwayCode: string;
  origin: string;
  originState: NEState;
  destination: string;
  destinationState: NEState;
  distanceKm: number;
  normalTimeStr: string;
  estimatedTimeStr: string;
  normalMinutes: number;
  estimatedMinutes: number;
  delayMinutes: number;
  accessibilityScore: number;
  riskLevel: SeverityLevel;
  status: 'normal' | 'delayed' | 'high_risk' | 'blocked';
  statusLabel: string;
  riskFactors: string[];
  aiRecommendation: string;
  elevationMaxM: number;
  passableFor: ('Light Vehicle' | 'Truck' | 'Heavy Trailer' | 'Emergency Convoy')[];
  coordinates: [number, number][];
}

export interface MapPointOfInterest {
  id: string;
  name: string;
  category: 'landslide' | 'flood' | 'road_closure' | 'accident' | 'bridge' | 'railway' | 'airport' | 'warehouse' | 'checkpoint' | 'relief_center' | 'hospital';
  locationName: string;
  state: NEState;
  coordinates: [number, number];
  status: 'active' | 'clearing' | 'operational' | 'congested' | 'warning';
  severity: SeverityLevel;
  description: string;
  timestamp: string;
  estimatedClearance?: string;
  capacityOrContact?: string;
}

export interface RouteOption {
  id: string;
  code: string; // 'A' | 'B' | 'C'
  name: string;
  tag: 'Fastest' | 'Recommended' | 'Safest' | 'Alternative';
  isRecommended?: boolean;
  distanceKm: number;
  timeStr: string;
  timeMinutes: number;
  delayMinutes: number;
  riskLevel: SeverityLevel;
  riskScore: number; // 0 - 100
  accessibilityScore: number; // 0 - 100
  estimatedFuelLiters: number;
  estimatedCostInr: number;
  reason: string;
  pros: string[];
  cons: string[];
  viaCities: string[];
  coordinates: [number, number][];
}

export interface AIExplanationFactor {
  title: string;
  description: string;
  weight: number; // percentage
  status: 'positive' | 'neutral' | 'negative';
}

export interface AIAnalysisResult {
  origin: string;
  destination: string;
  vehicleType: string;
  cargoType: string;
  primaryRoute: {
    distanceKm: number;
    estimatedTime: string;
    fuelEstimateLiters: number;
    accessibilityScore: number;
    riskScore: number;
  };
  routes: RouteOption[];
  recommendedRouteId: string;
  aiExplanation: {
    title: string;
    summary: string;
    factors: AIExplanationFactor[];
    confidence: number;
    modelGeneratedTimestamp: string;
  };
}

export interface DistrictAccessibility {
  district: string;
  state: NEState;
  score: number;
  roadScore: number;
  bridgeScore: number;
  essentialSupplyReachDays: number;
  vulnerabilityStatus: 'Safe' | 'Moderate' | 'Vulnerable' | 'Critical';
}

export interface DisruptionIncident {
  id: string;
  location: string;
  corridor: string;
  state: NEState;
  type: DisruptionType;
  severity: SeverityLevel;
  detectedAt: string;
  predictedDuration: string;
  status: 'Active' | 'Under Clearance' | 'Monitored' | 'Resolved';
  probability: number;
  confidenceScore: number;
  reason: string;
  coordinates: [number, number];
}

export interface AIInsight {
  id: string;
  insightNumber: string;
  title: string;
  category: 'Disruption Prediction' | 'Route Optimization' | 'Accessibility Alert' | 'Infrastructure Risk';
  description: string;
  probability: number;
  confidence: number;
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  expectedImprovement?: string;
  state: NEState;
  corridor?: string;
  recommendedAction: string;
  actionType: 'preposition' | 'reroute' | 'inspect' | 'alert_teams';
  timestamp: string;
  status: 'active' | 'actioned' | 'dismissed';
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  category: DisruptionType | 'logistics' | 'weather' | 'infrastructure';
  severity: 'critical' | 'warning' | 'info';
  state: NEState;
  location: string;
  coordinates?: [number, number];
  timestamp: string;
  probability?: number;
  isRead: boolean;
  isResolved: boolean;
}

export interface ReportItem {
  id: string;
  title: string;
  category: 'Daily SITREP' | 'Accessibility Audit' | 'Corridor Risk' | 'Disruption Assessment' | 'State Performance';
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'On-Demand';
  lastGenerated: string;
  fileSize: string;
  scope: string;
}

export interface AppSettings {
  userName: string;
  userRole: string;
  agencyName: string;
  defaultState: NEState;
  refreshIntervalSeconds: number;
  aiConfidenceThreshold: number;
  landslideRainfallThresholdMm: number;
  criticalAlertPush: boolean;
  smsEmergencyNotification: boolean;
  defaultBaseMap: 'standard' | 'satellite' | 'terrain' | 'dark';
}
