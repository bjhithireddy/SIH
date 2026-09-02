/**
 * NE-LogiAI & LogiDrive: Multi-Layer Logistics, Geospatial & Hazard Dataset Architecture
 * Specifically engineered for North Eastern Region (NER) India logistics challenges.
 * 
 * Standards & Schemas aligned with:
 * - MoRTH (Ministry of Road Transport & Highways)
 * - IMD (India Meteorological Department - Mausam API)
 * - CWC (Central Water Commission Hydrological Feeds)
 * - ISRO Bhuvan / NESAC (North-Eastern Space Applications Centre)
 * - NPCI / IHMCL (FASTag Commercial Freight Dwell Stream)
 * - NDMA / SDMA CAP (Common Alerting Protocol XML/JSON)
 */

export interface GovernmentDataSource {
  id: string;
  name: string;
  agency: string;
  endpoint: string;
  updateFrequency: string;
  status: 'LIVE' | 'ACTIVE_STREAM' | 'SYNCED' | 'STANDBY';
  recordsProcessedToday: number;
  dataLatencySec: number;
  coverage: string;
  fieldsProvided: string[];
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
  lastUpdated: string;
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
  timestamp: string;
}

// 1. OFFICIAL GOVERNMENT & OPEN DATA INGESTION FEEDS
export const GOVERNMENT_DATA_SOURCES: GovernmentDataSource[] = [
  {
    id: 'src-imd-mausam',
    name: 'Mausam AWS Radar & Rainfall API',
    agency: 'India Meteorological Department (IMD)',
    endpoint: 'https://api.mausam.imd.gov.in/v1/rainfall/ner-grid',
    updateFrequency: 'Every 15 Minutes',
    status: 'ACTIVE_STREAM',
    recordsProcessedToday: 4128,
    dataLatencySec: 1.2,
    coverage: 'All 8 North Eastern States (64 Districts)',
    fieldsProvided: ['rainfall_24h', 'cloud_top_temp', 'precipitation_rate', 'visibility_m', 'gust_speed_kmh']
  },
  {
    id: 'src-cwc-flood',
    name: 'National Hydrology River Gauge Stream',
    agency: 'Central Water Commission (CWC)',
    endpoint: 'https://cwc.gov.in/api/v2/telemetry/brahmaputra-basin',
    updateFrequency: 'Hourly',
    status: 'LIVE',
    recordsProcessedToday: 1840,
    dataLatencySec: 2.1,
    coverage: 'Brahmaputra, Barak, Teesta, Subansiri, & Kopili Basins',
    fieldsProvided: ['water_level_m', 'danger_level_m', 'discharge_rate', 'submergence_forecast_12h']
  },
  {
    id: 'src-isro-bhuvan',
    name: 'Bhuvan Landslide Early Warning System',
    agency: 'ISRO / NESAC (North Eastern Space Applications Centre)',
    endpoint: 'https://bhuvan-app3.nrsc.gov.in/api/landslide-ner',
    updateFrequency: 'Every 6 Hours',
    status: 'LIVE',
    recordsProcessedToday: 640,
    dataLatencySec: 4.8,
    coverage: 'NH-10 (Sikkim), NH-13 (Arunachal), NH-29 (Nagaland), NH-06 (Meghalaya)',
    fieldsProvided: ['slope_shear_stability', 'soil_moisture_index', 'landslide_hazard_score', 'geological_formation']
  },
  {
    id: 'src-fastag-npci',
    name: 'IHMCL FASTag Commercial Freight Telemetry',
    agency: 'National Payments Corporation of India / NHAI',
    endpoint: 'https://api.ihmcl.co.in/v3/telemetry/freight-dwell',
    updateFrequency: 'Real-time WebSocket',
    status: 'ACTIVE_STREAM',
    recordsProcessedToday: 29420,
    dataLatencySec: 0.8,
    coverage: '28 Toll Plazas across NE Arteries (including Siliguri Corridor)',
    fieldsProvided: ['truck_axle_class', 'rfid_dwell_time_mins', 'hourly_throughput', 'cargo_weight_wim']
  },
  {
    id: 'src-bro-swastik',
    name: 'BRO Mountain Highway Clearance Log',
    agency: 'Border Roads Organisation (BRO / Project Swastik & Vartak)',
    endpoint: 'https://bro.gov.in/ops/ner-mountain-bulletin',
    updateFrequency: 'Twice Daily (or immediate incident broadcast)',
    status: 'SYNCED',
    recordsProcessedToday: 128,
    dataLatencySec: 5.0,
    coverage: 'High-Altitude Strategic Corridors (Sela Pass, Zuluk, Tawang, Changsari)',
    fieldsProvided: ['pass_status', 'snow_depth_cm', 'bailey_bridge_load_limit_t', 'convoy_timing_slots']
  },
  {
    id: 'src-erss-112',
    name: 'National Emergency Response Support System (ERSS-112)',
    agency: 'Ministry of Home Affairs / NE State Police Command',
    endpoint: 'https://erss.gov.in/api/dispatch/highway-safety',
    updateFrequency: 'Instant Push Alert',
    status: 'LIVE',
    recordsProcessedToday: 512,
    dataLatencySec: 0.5,
    coverage: 'Highway Patrols, Ambulances, and NDRF Battalions',
    fieldsProvided: ['incident_type', 'gps_lat_long', 'assigned_patrol_unit', 'response_eta_mins']
  }
];

// 2. HYDROLOGICAL RIVER SENSORS (Monsoon Washout Watch)
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
    threatenedHighways: ['NH-27 (Guwahati Bypass)', 'Saraighat Arterial Link']
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
    threatenedHighways: ['NH-10 (Siliguri → Gangtok Lifeline)', 'Sevoke-Rongpo Rail Link']
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
    threatenedHighways: ['NH-06 (Meghalaya → Silchar)', 'NH-37 (Silchar → Imphal)']
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
    threatenedHighways: ['NH-15 (Lakhimpur → Pasighat Corridor)']
  }
];

// 3. WEATHER AUTOMATED TELEMETRY STATIONS (IMD Grid)
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
    lastUpdated: '10 Mins Ago'
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
    lastUpdated: '5 Mins Ago'
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
    lastUpdated: '12 Mins Ago'
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
    lastUpdated: '3 Mins Ago'
  },
  {
    stationCode: 'AWS-KOH-07',
    location: 'Kohima Zubza Hill Spine',
    state: 'Nagaland',
    coordinates: [25.6751, 94.1086],
    rainfall24hMm: 52.1,
    rainfall1hMm: 2.8,
    temperatureC: 19.1,
    relativeHumidityPct: 88,
    visibilityMeters: 800,
    fogIndex: 'Moderate',
    landslideAlert: 'Yellow',
    lastUpdated: '8 Mins Ago'
  }
];

// 4. FASTAG COMMERCIAL TOLL NODES
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
    interstatePermitsCleared24h: 3890
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
    interstatePermitsCleared24h: 2450
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
    interstatePermitsCleared24h: 6800
  },
  {
    tollPlazaId: 'FASTAG-DMP-04',
    name: 'Dimapur New Checkpost',
    highway: 'NH-29',
    state: 'Nagaland',
    commercialTrucksHourly: 195,
    avgDwellMinutes: 8.0,
    congestionStatus: 'Free Flow',
    overweightViolations24h: 2,
    interstatePermitsCleared24h: 1420
  }
];

// 5. EMERGENCY LIFELINE POI DIRECTORY (For Driver SOS & Command Logistics)
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
    distanceKmFromHighway: 0.8
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
    distanceKmFromHighway: 1.2
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
    distanceKmFromHighway: 0.1
  },
  {
    id: 'poi-patrol-02',
    name: 'Bhalukpong Interstate Police Checkpost',
    category: 'Highway Patrol',
    location: 'Arunachal Border Entry Node',
    highwayCode: 'NH-13',
    state: 'Arunachal Pradesh',
    coordinates: [27.0125, 92.6514],
    contactPhone: '112 / 03782-234112',
    operationalHours: '24/7',
    capabilities: ['Inner Line Permit Verification', 'Convoy Escort', 'Satellite Wireless Link'],
    distanceKmFromHighway: 0.0
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
    distanceKmFromHighway: 0.3
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
    distanceKmFromHighway: 0.2
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
    distanceKmFromHighway: 0.2
  }
];

// 6. CROWDSOURCED FIELD INCIDENT FEED (Driver App Live Edge Pings)
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
    timestamp: '14 Mins Ago'
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
    timestamp: '28 Mins Ago'
  },
  {
    eventId: 'INC-CROWD-8493',
    driverId: 'DRV-NE-9931 (B. Roy)',
    vehicleType: 'LCV Ration Carrier',
    highway: 'NH-27 Guwahati East',
    locationName: 'Khetri Toll Bypass',
    coordinates: [26.1000, 91.9500],
    eventType: 'Broken Down Truck',
    severity: 'Low',
    verifiedByOfficials: false,
    upvotesFromDrivers: 4,
    timestamp: '42 Mins Ago'
  }
];

// Helper Functions
export const exportRawDatasetJSON = (): string => {
  return JSON.stringify({
    project: 'NE-LogiAI & LogiDrive (SIH 2026)',
    timestamp: new Date().toISOString(),
    region: 'North Eastern Region of India (NER)',
    government_data_sources: GOVERNMENT_DATA_SOURCES,
    hydrology_river_gauges: HYDROLOGICAL_STATIONS,
    weather_stations_telemetry: WEATHER_TELEMETRY_STATIONS,
    fastag_toll_nodes: FASTAG_FREIGHT_NODES,
    emergency_lifelines_directory: EMERGENCY_LIFELINE_DIRECTORY,
    crowdsourced_driver_incidents: CROWDSOURCED_INCIDENT_FEED,
  }, null, 2);
};
