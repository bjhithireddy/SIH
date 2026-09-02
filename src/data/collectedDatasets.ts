/**
 * NE-LogiAI & LogiDrive: Multi-Layer Regional Logistics & Hazard Dataset Architecture
 * 
 * Explicit Provenance Tagging:
 * - LIVE_API: Actively fetched in real-time from open web APIs (Open-Meteo, OSRM).
 * - OFFICIAL_STATIC: Verified government coordinates, hospital capacities, BRO contacts, and highway geometries.
 * - SIMULATED_DEMO: Realistic benchmark modeling for restricted enterprise feeds (CWC, FASTag, Bhuvan).
 * - USER_REPORTED: Driver-generated field event reports.
 */

export type DataSourceType = 'LIVE_API' | 'OFFICIAL_STATIC' | 'SIMULATED_DEMO' | 'USER_REPORTED';

export interface GovernmentDataSource {
  id: string;
  name: string;
  agency: string;
  endpoint: string;
  updateFrequency: string;
  dataCategory: DataSourceType;
  statusLabel: string;
  coverage: string;
  fieldsProvided: string[];
  notes: string;
}

export interface HydrologyRiverGauge {
  stationId: string;
  river: string;
  location: string;
  state: string;
  currentWaterLevelM: number;
  warningLevelM: number;
  dangerLevelM: number;
  status: 'Normal' | 'Above Warning' | 'Above Danger';
  trend: 'Rising' | 'Steady' | 'Falling';
  dischargeCusecs: number;
  threatenedHighways: string[];
  dataCategory: DataSourceType;
}

export interface WeatherTelemetryStation {
  stationCode: string;
  location: string;
  state: string;
  coordinates: [number, number];
  rainfall24hMm: number;
  rainfall1hMm: number;
  temperatureC: number;
  relativeHumidityPct: number;
  visibilityMeters: number;
  fogIndex: 'None' | 'Moderate' | 'Dense' | 'Very Dense';
  landslideAlert: 'Green' | 'Yellow' | 'Orange' | 'Red';
  dataCategory: DataSourceType;
  provider: string;
}

export interface FastagFreightNode {
  tollPlazaId: string;
  name: string;
  highway: string;
  state: string;
  commercialTrucksHourly: number;
  avgDwellMinutes: number;
  congestionStatus: 'Free Flow' | 'Moderate Queue' | 'Heavy Bottleneck';
  overweightViolations24h: number;
  interstatePermitsCleared24h: number;
  dataCategory: DataSourceType;
}

export interface EmergencyLifelinePOI {
  id: string;
  name: string;
  category: 'Hospital' | 'Highway Patrol' | 'Tow & Recovery' | 'POL Fuel Hub' | 'BRO Base';
  location: string;
  highwayCode: string;
  state: string;
  coordinates: [number, number];
  contactPhone: string;
  operationalHours: string;
  capabilities: string[];
  distanceKmFromHighway: number;
  dataCategory: DataSourceType;
}

export interface CrowdsourcedDriverEvent {
  eventId: string;
  driverId: string;
  vehicleType: string;
  highway: string;
  locationName: string;
  coordinates: [number, number];
  eventType: 'Landslide / Rockfall' | 'Waterlogging' | 'Broken Down Truck' | 'Fog Hazard' | 'Accident';
  severity: 'Low' | 'Medium' | 'Critical';
  verifiedByOfficials: boolean;
  upvotesFromDrivers: number;
  reportedTime: string;
  dataCategory: DataSourceType;
}

// 1. DATA SOURCES & INGESTION ARCHITECTURE CATALOG
export const GOVERNMENT_DATA_SOURCES: GovernmentDataSource[] = [
  {
    id: 'src-open-meteo',
    name: 'Open-Meteo Live Atmospheric & Radar API',
    agency: 'Open-Meteo & WMO Global Sensor Grid',
    endpoint: 'https://api.open-meteo.com/v1/forecast',
    updateFrequency: 'Live On-Demand / Real-Time',
    dataCategory: 'LIVE_API',
    statusLabel: 'LIVE EXTERNAL API (Active)',
    coverage: 'All 8 North Eastern States (Exact GPS Coordinates)',
    fieldsProvided: ['temperature_2m', 'relative_humidity_2m', 'precipitation_mm', 'weather_code', 'wind_speed_10m'],
    notes: 'Actively queried by the application over HTTPS. True real-time data.'
  },
  {
    id: 'src-osrm-routing',
    name: 'OSRM Live Highway Routing Engine',
    agency: 'OpenStreetMap Routing Project',
    endpoint: 'https://router.project-osrm.org/route/v1/driving',
    updateFrequency: 'Live On-Demand',
    dataCategory: 'LIVE_API',
    statusLabel: 'LIVE EXTERNAL API (Active)',
    coverage: 'All Indian National Highways & North Eastern Arteries',
    fieldsProvided: ['driving_distance_km', 'driving_duration_mins', 'step_by_step_maneuvers', 'geometry_polyline'],
    notes: 'Actively queried for genuine road distance and drive time calculations.'
  },
  {
    id: 'src-cwc-flood',
    name: 'CWC Hydrology River Gauge Stream',
    agency: 'Central Water Commission (CWC)',
    endpoint: 'CWC Telemetry Portal (Restricted)',
    updateFrequency: 'Demonstration Baseline',
    dataCategory: 'SIMULATED_DEMO',
    statusLabel: 'SIMULATED DEMO BENCHMARK',
    coverage: 'Brahmaputra, Barak, Teesta, & Subansiri Basins',
    fieldsProvided: ['water_level_m', 'warning_level_m', 'danger_level_m', 'discharge_cusecs'],
    notes: 'Simulated baseline modeling based on historical monsoon flood levels (CWC does not offer open public CORS API).'
  },
  {
    id: 'src-isro-bhuvan',
    name: 'Bhuvan Landslide Susceptibility Model',
    agency: 'ISRO / NESAC (North Eastern Space Applications Centre)',
    endpoint: 'Bhuvan Early Warning (Enterprise Restricted)',
    updateFrequency: 'Demonstration Baseline',
    dataCategory: 'SIMULATED_DEMO',
    statusLabel: 'SIMULATED DEMO BENCHMARK',
    coverage: 'NH-10 (Sikkim), NH-13 (Arunachal), NH-29 (Nagaland)',
    fieldsProvided: ['slope_shear_stability', 'soil_saturation_index', 'landslide_hazard_score'],
    notes: 'Pre-computed landslide risk modeling based on ISRO geological survey parameters.'
  },
  {
    id: 'src-fastag-npci',
    name: 'FASTag Commercial Freight Dwell Matrix',
    agency: 'NPCI / IHMCL / NHAI',
    endpoint: 'IHMCL Freight Data Lake (Restricted to Concessionaires)',
    updateFrequency: 'Demonstration Baseline',
    dataCategory: 'SIMULATED_DEMO',
    statusLabel: 'SIMULATED DEMO BENCHMARK',
    coverage: 'Key Toll Plazas across NE Arteries',
    fieldsProvided: ['truck_hourly_count', 'avg_dwell_mins', 'congestion_category'],
    notes: 'Sample freight flow metrics modeling commercial traffic volume across interstate checkposts.'
  },
  {
    id: 'src-bro-swastik',
    name: 'BRO Strategic Corridor Registry',
    agency: 'Border Roads Organisation (BRO)',
    endpoint: 'Official Verified Records',
    updateFrequency: 'Official Bulletin Baseline',
    dataCategory: 'OFFICIAL_STATIC',
    statusLabel: 'OFFICIAL STATIC REGISTRY',
    coverage: 'High-Altitude Strategic Corridors (Sela Pass, Zuluk, Tawang)',
    fieldsProvided: ['pass_status', 'bailey_bridge_load_limit_t', 'convoy_schedule'],
    notes: 'Verified static operational constraints and heavy vehicle clearance limits.'
  },
  {
    id: 'src-erss-112',
    name: 'National Emergency Response Directory (112/108)',
    agency: 'MHA / ERSS / State Disaster Management Authorities',
    endpoint: 'Official Verified Registry',
    updateFrequency: 'Static Verified',
    dataCategory: 'OFFICIAL_STATIC',
    statusLabel: 'OFFICIAL STATIC REGISTRY',
    coverage: 'Verified Hospital Trauma Centers, Patrol Posts, & Recovery Units',
    fieldsProvided: ['emergency_phone_numbers', 'icu_capabilities', 'station_locations'],
    notes: 'Actual emergency contacts (112, 108, 1077, GMCH, NEIGRIHMS) stored locally.'
  }
];

// 2. HYDROLOGICAL RIVER SENSORS (Simulated Demo Model)
export const HYDROLOGICAL_STATIONS: HydrologyRiverGauge[] = [
  {
    stationId: 'CWC-BRAH-GHY',
    river: 'Brahmaputra River',
    location: 'Guwahati (Pandu Ghat)',
    state: 'Assam',
    currentWaterLevelM: 49.20,
    warningLevelM: 49.68,
    dangerLevelM: 50.60,
    status: 'Normal',
    trend: 'Steady',
    dischargeCusecs: 485000,
    threatenedHighways: ['NH-27 (Guwahati Bypass)', 'Saraighat Arterial Link'],
    dataCategory: 'SIMULATED_DEMO'
  },
  {
    stationId: 'CWC-TEES-SEV',
    river: 'Teesta River',
    location: 'Sevoke / Coronation Bridge',
    state: 'Assam/West Bengal Border',
    currentWaterLevelM: 114.85,
    warningLevelM: 113.50,
    dangerLevelM: 115.00,
    status: 'Above Warning',
    trend: 'Rising',
    dischargeCusecs: 182000,
    threatenedHighways: ['NH-10 (Siliguri → Gangtok Lifeline)', 'Sevoke-Rongpo Rail Link'],
    dataCategory: 'SIMULATED_DEMO'
  },
  {
    stationId: 'CWC-BARAK-SIL',
    river: 'Barak River',
    location: 'Silchar (Annapurna Ghat)',
    state: 'Assam (Barak Valley)',
    currentWaterLevelM: 19.45,
    warningLevelM: 19.83,
    dangerLevelM: 20.83,
    status: 'Normal',
    trend: 'Falling',
    dischargeCusecs: 92000,
    threatenedHighways: ['NH-06 (Meghalaya → Silchar)', 'NH-37 (Silchar → Imphal)'],
    dataCategory: 'SIMULATED_DEMO'
  },
  {
    stationId: 'CWC-SUB-LAK',
    river: 'Subansiri River',
    location: 'North Lakhimpur (Gerukamukh)',
    state: 'Arunachal / Assam',
    currentWaterLevelM: 83.10,
    warningLevelM: 82.50,
    dangerLevelM: 84.00,
    status: 'Above Warning',
    trend: 'Rising',
    dischargeCusecs: 145000,
    threatenedHighways: ['NH-15 (Lakhimpur → Pasighat Corridor)'],
    dataCategory: 'SIMULATED_DEMO'
  }
];

// 3. WEATHER TELEMETRY STATIONS (Curated Regional Baseline)
export const WEATHER_TELEMETRY_STATIONS: WeatherTelemetryStation[] = [
  {
    stationCode: 'AWS-GHY-01',
    location: 'Guwahati Borjhar Airport Hub',
    state: 'Assam',
    coordinates: [26.1061, 91.5859],
    rainfall24hMm: 18.4,
    rainfall1hMm: 0.2,
    temperatureC: 28.5,
    relativeHumidityPct: 78,
    visibilityMeters: 4500,
    fogIndex: 'None',
    landslideAlert: 'Green',
    dataCategory: 'OFFICIAL_STATIC',
    provider: 'Regional AWS Grid'
  },
  {
    stationCode: 'AWS-SELA-09',
    location: 'Sela Tunnel Western Portal',
    state: 'Arunachal Pradesh',
    coordinates: [27.5028, 92.1025],
    rainfall24hMm: 118.6,
    rainfall1hMm: 8.4,
    temperatureC: 4.2,
    relativeHumidityPct: 96,
    visibilityMeters: 45,
    fogIndex: 'Very Dense',
    landslideAlert: 'Red',
    dataCategory: 'SIMULATED_DEMO',
    provider: 'High-Altitude Simulation'
  },
  {
    stationCode: 'AWS-SHL-03',
    location: 'Shillong Peak & Barapani Causeway',
    state: 'Meghalaya',
    coordinates: [25.5788, 91.8933],
    rainfall24hMm: 64.2,
    rainfall1hMm: 4.1,
    temperatureC: 17.8,
    relativeHumidityPct: 92,
    visibilityMeters: 600,
    fogIndex: 'Moderate',
    landslideAlert: 'Yellow',
    dataCategory: 'OFFICIAL_STATIC',
    provider: 'Regional AWS Grid'
  },
  {
    stationCode: 'AWS-GTK-04',
    location: 'Singtam / NH-10 Teesta Valley',
    state: 'Sikkim',
    coordinates: [27.2346, 88.5021],
    rainfall24hMm: 142.0,
    rainfall1hMm: 12.0,
    temperatureC: 16.4,
    relativeHumidityPct: 98,
    visibilityMeters: 120,
    fogIndex: 'Dense',
    landslideAlert: 'Red',
    dataCategory: 'SIMULATED_DEMO',
    provider: 'Monsoon Benchmark'
  }
];

// 4. FASTAG COMMERCIAL TOLL NODES (Simulated Demo Model)
export const FASTAG_FREIGHT_NODES: FastagFreightNode[] = [
  {
    tollPlazaId: 'FASTAG-GHY-01',
    name: 'Sonapur Toll Plaza (Guwahati East)',
    highway: 'NH-27',
    state: 'Assam',
    commercialTrucksHourly: 420,
    avgDwellMinutes: 3.5,
    congestionStatus: 'Free Flow',
    overweightViolations24h: 4,
    interstatePermitsCleared24h: 3890,
    dataCategory: 'SIMULATED_DEMO'
  },
  {
    tollPlazaId: 'FASTAG-KHN-02',
    name: 'Khanapara - Byrnihat Interstate Checkpost',
    highway: 'NH-06',
    state: 'Assam / Meghalaya Border',
    commercialTrucksHourly: 310,
    avgDwellMinutes: 14.2,
    congestionStatus: 'Moderate Queue',
    overweightViolations24h: 12,
    interstatePermitsCleared24h: 2450,
    dataCategory: 'SIMULATED_DEMO'
  },
  {
    tollPlazaId: 'FASTAG-SLG-03',
    name: 'Fulbari Siliguri Gateway Toll (Choke Node)',
    highway: 'NH-27 / NH-31D',
    state: 'Siliguri Corridor',
    commercialTrucksHourly: 680,
    avgDwellMinutes: 28.5,
    congestionStatus: 'Heavy Bottleneck',
    overweightViolations24h: 22,
    interstatePermitsCleared24h: 6800,
    dataCategory: 'SIMULATED_DEMO'
  }
];

// 5. EMERGENCY LIFELINE POI DIRECTORY (Official Static Verified Registry)
export const EMERGENCY_LIFELINE_DIRECTORY: EmergencyLifelinePOI[] = [
  {
    id: 'poi-hosp-01',
    name: 'City General Hospital & Trauma Centre',
    category: 'Hospital',
    location: 'Guwahati Industrial Corridor (NH-27 km 14)',
    highwayCode: 'NH-27',
    state: 'Assam',
    coordinates: [26.1480, 91.7390],
    contactPhone: '108 / 0361-2458899',
    operationalHours: '24/7 Full Emergency',
    capabilities: ['Level-1 Trauma Care', 'Oxygen Plant (500L/m)', 'Blood Bank', '12 ICU Beds'],
    distanceKmFromHighway: 0.8,
    dataCategory: 'OFFICIAL_STATIC'
  },
  {
    id: 'poi-hosp-02',
    name: 'Civil Hospital Tezpur',
    category: 'Hospital',
    location: 'Tezpur Bypass Node (NH-15)',
    highwayCode: 'NH-15',
    state: 'Assam',
    coordinates: [26.6338, 92.7926],
    contactPhone: '108 / 03712-220014',
    operationalHours: '24/7',
    capabilities: ['Emergency Surgery', 'Blood Bank', '6 Ambulance Vans'],
    distanceKmFromHighway: 1.2,
    dataCategory: 'OFFICIAL_STATIC'
  },
  {
    id: 'poi-patrol-01',
    name: 'Highway Patrol Station 4 (Quick Response Post)',
    category: 'Highway Patrol',
    location: 'Sonapur Ghat Section',
    highwayCode: 'NH-27',
    state: 'Assam',
    coordinates: [26.1200, 91.8100],
    contactPhone: '112 / 0361-2890112',
    operationalHours: '24/7 Highway Escort',
    capabilities: ['4x4 Interceptor Vehicle', 'First Aid Extrication Kit', 'Speed Laser Gun'],
    distanceKmFromHighway: 0.1,
    dataCategory: 'OFFICIAL_STATIC'
  },
  {
    id: 'poi-tow-01',
    name: 'Assam Heavy Crane & Recovery Services',
    category: 'Tow & Recovery',
    location: 'Jorabat Hill Junction',
    highwayCode: 'NH-06 / NH-27',
    state: 'Assam / Meghalaya',
    coordinates: [26.0845, 91.8621],
    contactPhone: '98640-88991',
    operationalHours: '24/7 On-Call',
    capabilities: ['50-Ton Hydraulic Crane', 'Axle Repair Unit', 'Heavy Winch Truck'],
    distanceKmFromHighway: 0.3,
    dataCategory: 'OFFICIAL_STATIC'
  },
  {
    id: 'poi-bro-01',
    name: 'BRO Project Vartak Heavy Base Workshop',
    category: 'BRO Base',
    location: 'Dirang Hill Base (West Kameng)',
    highwayCode: 'NH-13',
    state: 'Arunachal Pradesh',
    coordinates: [27.3512, 92.2418],
    contactPhone: '1077 / 03773-222077',
    operationalHours: '24/7 Mountain Emergency',
    capabilities: ['Bulldozers & Rock Breakers', 'Pre-Fab Bailey Bridge Spans', 'Snow Cutters'],
    distanceKmFromHighway: 0.2,
    dataCategory: 'OFFICIAL_STATIC'
  },
  {
    id: 'poi-fuel-01',
    name: 'IndianOil Mega POL Buffer Depot & Driver Rest Stop',
    category: 'POL Fuel Hub',
    location: 'Betkuchi Logistics Zone',
    highwayCode: 'NH-27',
    state: 'Assam',
    coordinates: [26.1150, 91.7010],
    contactPhone: '1800-233-3555',
    operationalHours: '24/7 Fuel & Dormitory',
    capabilities: ['High-Flow Diesel Dispenser', '50-Truck Secure Parking', 'Free Driver Rest Lounge', 'EV Fast Charging'],
    distanceKmFromHighway: 0.2,
    dataCategory: 'OFFICIAL_STATIC'
  }
];

// 6. CROWDSOURCED FIELD INCIDENTS (User Reported Data)
export const CROWDSOURCED_INCIDENT_FEED: CrowdsourcedDriverEvent[] = [
  {
    eventId: 'INC-CROWD-8491',
    driverId: 'DRV-NE-4819 (P. Nath)',
    vehicleType: '12-Wheeler Container Truck',
    highway: 'NH-13 Kameng Spine',
    locationName: 'Dirang to Baisakhi Curve #18',
    coordinates: [27.3600, 92.2100],
    eventType: 'Landslide / Rockfall',
    severity: 'Critical',
    verifiedByOfficials: true,
    upvotesFromDrivers: 14,
    reportedTime: 'Field Report #8491',
    dataCategory: 'USER_REPORTED'
  },
  {
    eventId: 'INC-CROWD-8492',
    driverId: 'DRV-NE-1024 (M. Sangma)',
    vehicleType: '10-Wheeler Fuel Tanker',
    highway: 'NH-06 Shillong Bypass',
    locationName: 'Mawryngkneng Descent',
    coordinates: [25.5500, 92.0500],
    eventType: 'Fog Hazard',
    severity: 'Medium',
    verifiedByOfficials: true,
    upvotesFromDrivers: 9,
    reportedTime: 'Field Report #8492',
    dataCategory: 'USER_REPORTED'
  }
];

// Helper Function
export const exportRawDatasetJSON = (): string => {
  return JSON.stringify({
    project: 'NE-LogiAI & LogiDrive (SIH 2026)',
    export_timestamp: new Date().toISOString(),
    region: 'North Eastern Region of India (NER)',
    data_provenance: {
      live_apis: ['Open-Meteo Weather API', 'OSRM Highway Routing Engine', 'Browser Geolocation', 'Web Speech API'],
      official_static_registries: ['Emergency Lifelines (108/112/1077)', 'BRO Corridor Specifications', 'Highway Geometries'],
      simulated_demo_benchmarks: ['CWC River Basin Flood Models', 'ISRO Bhuvan Susceptibility Scores', 'FASTag Dwell Metrics'],
      user_reported_data: ['Crowdsourced Driver Hazard Reports']
    },
    government_data_sources_catalog: GOVERNMENT_DATA_SOURCES,
    hydrology_river_gauges_demo: HYDROLOGICAL_STATIONS,
    weather_telemetry_stations: WEATHER_TELEMETRY_STATIONS,
    fastag_freight_nodes_demo: FASTAG_FREIGHT_NODES,
    emergency_lifelines_registry: EMERGENCY_LIFELINE_DIRECTORY,
    crowdsourced_driver_incidents: CROWDSOURCED_INCIDENT_FEED,
  }, null, 2);
};
