import { MapPointOfInterest } from '../types';

export const MAP_POINTS_DATA: MapPointOfInterest[] = [
  // --- Landslides ---
  {
    id: 'poi-ls-1',
    name: 'NH-10 29th Mile Active Landslide',
    category: 'landslide',
    locationName: '29th Mile, Kalimpong / Teesta River Corridor',
    state: 'Sikkim',
    coordinates: [27.0180, 88.4720],
    status: 'active',
    severity: 'critical',
    description: 'Continuous rock and debris slippage triggered by 142mm torrential rainfall. Teesta embankment compromised over 80 meters.',
    timestamp: '18 min ago',
    estimatedClearance: '8 hours',
    capacityOrContact: 'BRO Project Swastik Heavy Earthmovers on site'
  },
  {
    id: 'poi-ls-2',
    name: 'Bhalukpong-Tenga Landslip Zone',
    category: 'landslide',
    locationName: 'NH-13 Km 42, West Kameng',
    state: 'Arunachal Pradesh',
    coordinates: [27.1200, 92.5800],
    status: 'clearing',
    severity: 'high',
    description: 'Mudslide blocking single lane. Single file convoy movement operated under pilot vehicle escort.',
    timestamp: '45 min ago',
    estimatedClearance: '3 hours',
    capacityOrContact: 'BRTF Sector 84'
  },
  {
    id: 'poi-ls-3',
    name: 'Phesama Hill Subsidence & Slide',
    category: 'landslide',
    locationName: 'NH-29 Km 18, Kohima South',
    state: 'Nagaland',
    coordinates: [25.5600, 94.1200],
    status: 'active',
    severity: 'high',
    description: 'Pavement sunk 1.2m into hillside slope. Loaded heavy 12-wheel trucks restricted.',
    timestamp: '1 hour ago',
    estimatedClearance: '6 hours',
    capacityOrContact: 'Nagaland PWD (NH) Emergency Unit'
  },
  {
    id: 'poi-ls-4',
    name: 'Sonapur Tunnel Slope Failure',
    category: 'landslide',
    locationName: 'NH-6, East Jaintia Hills',
    state: 'Meghalaya',
    coordinates: [25.1322, 92.3611],
    status: 'warning',
    severity: 'warning',
    description: 'Sludge flow at southern portal. Slurry pump operating to clear drainage channels.',
    timestamp: '2 hours ago',
    estimatedClearance: '2 hours',
    capacityOrContact: 'NHAI Regional Office Shillong'
  },

  // --- Floods ---
  {
    id: 'poi-fl-1',
    name: 'Brahmaputra Flood Plain Waterlogging',
    category: 'flood',
    locationName: 'NH-715 near Kaziranga Western Range',
    state: 'Assam',
    coordinates: [26.5800, 93.1800],
    status: 'active',
    severity: 'warning',
    description: 'Flood water overtopping highway by 15cm on low-lying culverts. Mandatory convoy speed 20km/h.',
    timestamp: '30 min ago',
    estimatedClearance: '12 hours',
    capacityOrContact: 'Forest Dept + Assam Police Flying Squad'
  },
  {
    id: 'poi-fl-2',
    name: 'Barak Valley Inundation Chokepoint',
    category: 'flood',
    locationName: 'NH-306, Sonai River crossing, Cachar',
    state: 'Assam',
    coordinates: [24.7800, 92.8300],
    status: 'warning',
    severity: 'warning',
    description: 'Backflow from Barak river causing water logging along bypass connecting Silchar to airport.',
    timestamp: '3 hours ago',
    estimatedClearance: '18 hours',
    capacityOrContact: 'DDMA Cachar Response Team'
  },

  // --- Road Closures & Accidents ---
  {
    id: 'poi-rc-1',
    name: 'Sevoke Railway Overbridge Repair Closure',
    category: 'road_closure',
    locationName: 'NH-10 Sevoke Junction',
    state: 'Assam',
    coordinates: [26.8833, 88.4667],
    status: 'active',
    severity: 'critical',
    description: 'Total closure for heavy trucks exceeding 16T due to expansion joint crack repair.',
    timestamp: '40 min ago',
    estimatedClearance: '14 hours',
    capacityOrContact: 'Eastern Command Engineers'
  },
  {
    id: 'poi-ac-1',
    name: 'Multi-axle POL Tanker Turnover',
    category: 'accident',
    locationName: 'NH-27, Jagiroad stretch near Morigaon',
    state: 'Assam',
    coordinates: [26.1200, 92.2100],
    status: 'clearing',
    severity: 'warning',
    description: 'Spill containment in progress. Traffic diverted through Jagiroad township loop.',
    timestamp: '1 hour ago',
    estimatedClearance: '1.5 hours',
    capacityOrContact: 'Assam Fire & Emergency Services'
  },

  // --- Strategic Bridges ---
  {
    id: 'poi-br-1',
    name: 'Bogibeel Rail-cum-Road Bridge',
    category: 'bridge',
    locationName: 'Brahmaputra River, Dibrugarh',
    state: 'Assam',
    coordinates: [27.3900, 94.8500],
    status: 'operational',
    severity: 'normal',
    description: 'Fully operational dual-tier mega bridge. 4.94 km long lifeline connecting Assam and Eastern Arunachal.',
    timestamp: 'Live Sensor: Normal',
    capacityOrContact: 'Throughput: 850 trucks/hr, Structural health: 98%'
  },
  {
    id: 'poi-br-2',
    name: 'Saraighat & New Saraighat Bridges',
    category: 'bridge',
    locationName: 'Guwahati Gateway, Brahmaputra River',
    state: 'Assam',
    coordinates: [26.1283, 91.6800],
    status: 'operational',
    severity: 'normal',
    description: 'Primary western gateway bridge for all rail and road logistics entering North East India.',
    timestamp: 'Live Sensor: High Traffic',
    capacityOrContact: 'Throughput: 2,400 vehicles/hr'
  },
  {
    id: 'poi-br-3',
    name: 'Dhola-Sadiya Bridge (Bhupen Hazarika Setu)',
    category: 'bridge',
    locationName: 'Lohit River, Tinsukia / Sadiya',
    state: 'Assam',
    coordinates: [27.7950, 95.6620],
    status: 'operational',
    severity: 'normal',
    description: '9.15 km bridge engineered for 60-tonne military tanks and heavy freight convoys towards Anjaw/Walong.',
    timestamp: 'Live Sensor: Clear',
    capacityOrContact: 'Maximum Load: Class 70R'
  },
  {
    id: 'poi-br-4',
    name: 'Maitri Setu (Feni River Bridge)',
    category: 'bridge',
    locationName: 'Sabroom Border, South Tripura',
    state: 'Tripura',
    coordinates: [23.0000, 91.7100],
    status: 'operational',
    severity: 'normal',
    description: '1.9 km international gateway connecting Tripura directly to Chittagong Port (72 km away).',
    timestamp: 'Live Sensor: Operational',
    capacityOrContact: 'Land Port Authority of India'
  },

  // --- Airports & Logistics Air Hubs ---
  {
    id: 'poi-ap-1',
    name: 'Lokpriya Gopinath Bordoloi Int. Airport (GAU)',
    category: 'airport',
    locationName: 'Borjhar, Guwahati',
    state: 'Assam',
    coordinates: [26.1061, 91.5859],
    status: 'operational',
    severity: 'normal',
    description: 'Regional primary air cargo terminal with 24/7 cold storage facility and heavy freighter apron.',
    timestamp: 'Operational: 100%',
    capacityOrContact: 'Air Cargo Capacity: 120 tonnes/day'
  },
  {
    id: 'poi-ap-2',
    name: 'Pakyong Strategic Greenfield Airport',
    category: 'airport',
    locationName: 'Pakyong, East Sikkim',
    state: 'Sikkim',
    coordinates: [27.2272, 88.5866],
    status: 'warning',
    severity: 'warning',
    description: 'Tabletop runway. Visibility down to 1,800m due to monsoonal low cloud base.',
    timestamp: 'Weather Alert: Marginal',
    capacityOrContact: 'Air Traffic Control: Pakyong Tower'
  },
  {
    id: 'poi-ap-3',
    name: 'Bir Tikendrajit International Airport',
    category: 'airport',
    locationName: 'Tulihal, Imphal',
    state: 'Manipur',
    coordinates: [24.7600, 93.8967],
    status: 'operational',
    severity: 'normal',
    description: 'Dedicated air cargo hub for essential medical consignments and speed logistics for Manipur.',
    timestamp: 'Operational: 100%',
    capacityOrContact: 'Cargo Terminal: Active'
  },
  {
    id: 'poi-ap-4',
    name: 'Lengpui Airport',
    category: 'airport',
    locationName: 'Mamit / Aizawl',
    state: 'Mizoram',
    coordinates: [23.8406, 92.6192],
    status: 'operational',
    severity: 'normal',
    description: 'Essential lifeline airport connecting remote Mizoram highlands to national supply grid.',
    timestamp: 'Operational',
    capacityOrContact: 'Capacity: 45 tonnes/day'
  },

  // --- Railway Transshipment Hubs ---
  {
    id: 'poi-rw-1',
    name: 'New Jalpaiguri (NJP) / Siliguri Railhead',
    category: 'railway',
    locationName: 'Siliguri Logistics Corridor',
    state: 'Assam', // strategic regional gateway
    coordinates: [26.6850, 88.4417],
    status: 'operational',
    severity: 'normal',
    description: 'Primary broad-gauge rail transshipment rake yard for all goods destined for Sikkim, Bhutan, and Upper NE.',
    timestamp: 'Rakes Loading: 8/10 active',
    capacityOrContact: 'Container Freight Yard (CONCOR)'
  },
  {
    id: 'poi-rw-2',
    name: 'Dimapur Freight Rail Terminal',
    category: 'railway',
    locationName: 'Dimapur Junction',
    state: 'Nagaland',
    coordinates: [25.9120, 93.7310],
    status: 'congested',
    severity: 'warning',
    description: 'Key railhead for Nagaland and Manipur. Yard occupancy at 88% capacity due to high PDS grain inflow.',
    timestamp: 'Status: 88% Full',
    capacityOrContact: 'Northeast Frontier Railway Goods Division'
  },
  {
    id: 'poi-rw-3',
    name: 'Bairabi Railway Logistics Terminal',
    category: 'railway',
    locationName: 'Bairabi, Kolasib District',
    state: 'Mizoram',
    coordinates: [24.1850, 92.5350],
    status: 'operational',
    severity: 'normal',
    description: 'Rail freight entry point into Mizoram; feeding road transport convoys to Aizawl and Lunglei.',
    timestamp: 'Operational',
    capacityOrContact: 'NFR Goods Depot'
  },

  // --- Strategic Warehouses & PDS Buffer Hubs ---
  {
    id: 'poi-wh-1',
    name: 'CWC Mega Logistics Park Amingaon',
    category: 'warehouse',
    locationName: 'North Guwahati',
    state: 'Assam',
    coordinates: [26.1850, 91.6700],
    status: 'operational',
    severity: 'normal',
    description: '50,000 MT multi-commodity temperature-controlled warehousing complex with direct rail siding.',
    timestamp: 'Stock Level: 84% Filled',
    capacityOrContact: 'Central Warehousing Corp | 50,000 MT'
  },
  {
    id: 'poi-wh-2',
    name: 'Rangpo Essential Buffer Stockpile',
    category: 'warehouse',
    locationName: 'Rangpo Border Yard',
    state: 'Sikkim',
    coordinates: [27.1764, 88.5312],
    status: 'operational',
    severity: 'normal',
    description: 'Critical food grain, fuel, and medical contingency depot maintained for high-altitude Sikkim valleys.',
    timestamp: 'Stock Level: 92% (14 Days Buffer)',
    capacityOrContact: 'Food & Civil Supplies Dept, Govt of Sikkim'
  },
  {
    id: 'poi-wh-3',
    name: 'FCI Regional Foodgrain Silo Complex',
    category: 'warehouse',
    locationName: 'Jorhat Industrial Zone',
    state: 'Assam',
    coordinates: [26.7400, 94.2000],
    status: 'operational',
    severity: 'normal',
    description: 'Central distribution depot supplying Upper Assam, Nagaland, and Eastern Arunachal districts.',
    timestamp: 'Stock Level: 76%',
    capacityOrContact: 'Food Corporation of India | 35,000 MT'
  },

  // --- Border & Interstate Checkpoints ---
  {
    id: 'poi-cp-1',
    name: 'Byrnihat Commercial & Tax Border Post',
    category: 'checkpoint',
    locationName: 'Assam-Meghalaya Interstate Border',
    state: 'Meghalaya',
    coordinates: [26.0500, 91.8833],
    status: 'congested',
    severity: 'warning',
    description: 'Average queuing time 42 minutes for automated ANPR/RFID commercial vehicle e-way bill scans.',
    timestamp: 'Queue: 65 Trucks',
    capacityOrContact: 'Meghalaya Transport & Commercial Taxes'
  },
  {
    id: 'poi-cp-2',
    name: 'Mao Gate Security & Quarantine Checkpost',
    category: 'checkpoint',
    locationName: 'Nagaland-Manipur Interstate Border',
    state: 'Manipur',
    coordinates: [25.5000, 94.1500],
    status: 'operational',
    severity: 'warning',
    description: 'Mandatory documentation and physical vehicle checks on all goods vehicles entering Senapati valley.',
    timestamp: 'Clearance time: 25 min/truck',
    capacityOrContact: 'Manipur Police & Excise'
  },
  {
    id: 'poi-cp-3',
    name: 'Moreh Integrated Check Post (ICP)',
    category: 'checkpoint',
    locationName: 'India-Myanmar Border, Tengnoupal',
    state: 'Manipur',
    coordinates: [24.2400, 94.3000],
    status: 'operational',
    severity: 'normal',
    description: 'High-tech border inspection facility with automated weighbridges, cargo scanners, and customs warehouse.',
    timestamp: 'Daylight Protocol Active',
    capacityOrContact: 'Land Ports Authority of India (LPAI)'
  },
  {
    id: 'poi-cp-4',
    name: 'Bhalukpong Inner Line & Toll Post',
    category: 'checkpoint',
    locationName: 'Assam-Arunachal Border, West Kameng',
    state: 'Arunachal Pradesh',
    coordinates: [27.0125, 92.6514],
    status: 'operational',
    severity: 'normal',
    description: 'Digital ILP scan and commercial permit validation point for all traffic accessing Tawang circuit.',
    timestamp: 'Smooth Flow',
    capacityOrContact: 'Arunachal Police Border Outpost'
  },

  // --- Relief Centers & Disaster Response Hubs ---
  {
    id: 'poi-rc-1',
    name: 'NDRF 1st Battalion Base & Regional Depot',
    category: 'relief_center',
    locationName: 'Patgaon, Rani Gate, Kamrup',
    state: 'Assam',
    coordinates: [26.0700, 91.6100],
    status: 'operational',
    severity: 'normal',
    description: 'Primary disaster response command base equipped with inflatable motorboats, heavy cutting tools, and mobile airlifts.',
    timestamp: 'Alert Status: Ready (Level 2)',
    capacityOrContact: '1st Bn NDRF Control Room 24x7'
  },
  {
    id: 'poi-rc-2',
    name: 'State Disaster Response Base - Gangtok',
    category: 'relief_center',
    locationName: 'Tadong Relief Complex, Gangtok',
    state: 'Sikkim',
    coordinates: [27.3150, 88.6000],
    status: 'active',
    severity: 'high',
    description: 'Active relief dispatch hub coordinating food packets, medicine, and Bailey bridge materials for North Sikkim.',
    timestamp: 'Active Relief Ops',
    capacityOrContact: 'Sikkim State Disaster Management Authority'
  },
  {
    id: 'poi-rc-3',
    name: 'Itanagar Emergency Supply Depot',
    category: 'relief_center',
    locationName: 'Naharlagun Sector B',
    state: 'Arunachal Pradesh',
    coordinates: [27.1000, 93.6800],
    status: 'operational',
    severity: 'normal',
    description: 'Stocked with 10,000 emergency ration kits, solar lanterns, water purification units, and satellite radios.',
    timestamp: 'Ready Reserve',
    capacityOrContact: 'Directorate of Disaster Management, AP'
  }
];
