import { CorridorRoute } from '../types';

export const CORRIDORS_DATA: CorridorRoute[] = [
  {
    id: 'corridor-guwahati-tawang',
    name: 'Guwahati → Tawang Strategic Corridor',
    highwayCode: 'NH-13 / NH-229',
    origin: 'Guwahati',
    originState: 'Assam',
    destination: 'Tawang',
    destinationState: 'Arunachal Pradesh',
    distanceKm: 448,
    normalTimeStr: '9h 45m',
    estimatedTimeStr: '11h 20m',
    normalMinutes: 585,
    estimatedMinutes: 680,
    delayMinutes: 95,
    accessibilityScore: 62.4,
    riskLevel: 'high',
    status: 'high_risk',
    statusLabel: 'High Landslide Risk',
    elevationMaxM: 4170, // Sela Pass
    passableFor: ['Light Vehicle', 'Truck', 'Emergency Convoy'],
    riskFactors: [
      'Heavy rainfall (118mm/24h) between Bhalukpong and Bomdila',
      'High soil saturation triggering rockfall near Jaswant Garh',
      'Dense fog reducing visibility below 30m at Sela Tunnel approach',
      'Single-lane convoy movement restriction at Sessa bypass'
    ],
    aiRecommendation: 'Pre-clear heavy freight convoys via Tezpur bypass before 14:00. Reroute non-essential civilian transport via Kalaktang-Shergaon corridor.',
    coordinates: [
      [26.1445, 91.7362], // Guwahati
      [26.6338, 92.7926], // Tezpur
      [27.0125, 92.6514], // Bhalukpong
      [27.1648, 92.5311], // Tenga Valley
      [27.2645, 92.4214], // Bomdila
      [27.3512, 92.2418], // Dirang
      [27.5028, 92.1025], // Sela Pass / Tunnel
      [27.5861, 91.8594]  // Tawang
    ]
  },
  {
    id: 'corridor-siliguri-gangtok',
    name: 'Siliguri → Gangtok Lifeline Corridor',
    highwayCode: 'NH-10',
    origin: 'Siliguri',
    originState: 'Assam', // regional entry hub
    destination: 'Gangtok',
    destinationState: 'Sikkim',
    distanceKm: 114,
    normalTimeStr: '3h 30m',
    estimatedTimeStr: '5h 45m',
    normalMinutes: 210,
    estimatedMinutes: 345,
    delayMinutes: 135,
    accessibilityScore: 48.0,
    riskLevel: 'critical',
    status: 'blocked',
    statusLabel: 'Partial Washout / Restricted',
    elevationMaxM: 1650,
    passableFor: ['Light Vehicle', 'Emergency Convoy'],
    riskFactors: [
      'Teesta river scouring along 29th Mile embankment',
      'Active mudslide debris clearance underway near Likhuveer',
      'Heavy multi-axle freight halted at Sevoke Checkpoint',
      'Seepage detected on Coronation Bridge alternate approach'
    ],
    aiRecommendation: 'Activate emergency alternate corridor via Lava-Reshi-Rongli for light supply convoys. Limit Teesta corridor strictly to NDRF and medical supply dispatches.',
    coordinates: [
      [26.7271, 88.3953], // Siliguri
      [26.8833, 88.4667], // Sevoke
      [27.0667, 88.4333], // Teesta Bazaar
      [27.1764, 88.5312], // Rangpo Checkpoint
      [27.2341, 88.5912], // Singtam
      [27.3389, 88.6065]  // Gangtok
    ]
  },
  {
    id: 'corridor-guwahati-shillong-silchar',
    name: 'Guwahati → Shillong → Silchar (Barak Valley Arterial)',
    highwayCode: 'NH-6',
    origin: 'Guwahati',
    originState: 'Assam',
    destination: 'Silchar',
    destinationState: 'Assam',
    distanceKm: 312,
    normalTimeStr: '7h 15m',
    estimatedTimeStr: '8h 25m',
    normalMinutes: 435,
    estimatedMinutes: 505,
    delayMinutes: 70,
    accessibilityScore: 71.5,
    riskLevel: 'moderate',
    status: 'delayed',
    statusLabel: 'Moderate Congestion & Slump Risk',
    elevationMaxM: 1525,
    passableFor: ['Light Vehicle', 'Truck', 'Heavy Trailer', 'Emergency Convoy'],
    riskFactors: [
      'Heavy commercial freight congestion at Byrnihat interstate tax plaza',
      'Subgrade subsidence near Sonapur tunnel portal (Meghalaya section)',
      'Continuous downpour causing slippery road conditions on Jowai-Ratacherra stretch'
    ],
    aiRecommendation: 'Implement staggered night-time freight transit between 22:00 and 05:00 to reduce Byrnihat chokepoints. Deploy mobile tow units at Sonapur tunnel approach.',
    coordinates: [
      [26.1445, 91.7362], // Guwahati
      [26.0500, 91.8833], // Byrnihat
      [25.9000, 91.8800], // Nongpoh
      [25.5788, 91.8933], // Shillong
      [25.4419, 92.2033], // Jowai
      [25.1322, 92.3611], // Sonapur Tunnel
      [24.8333, 92.7789]  // Silchar
    ]
  },
  {
    id: 'corridor-dimapur-kohima-imphal',
    name: 'Dimapur → Kohima → Imphal (Asian Highway 1)',
    highwayCode: 'NH-29 / NH-2',
    origin: 'Dimapur',
    originState: 'Nagaland',
    destination: 'Imphal',
    destinationState: 'Manipur',
    distanceKm: 208,
    normalTimeStr: '5h 30m',
    estimatedTimeStr: '6h 40m',
    normalMinutes: 330,
    estimatedMinutes: 400,
    delayMinutes: 70,
    accessibilityScore: 68.0,
    riskLevel: 'high',
    status: 'high_risk',
    statusLabel: 'Subsidence & Security Watch',
    elevationMaxM: 1444,
    passableFor: ['Light Vehicle', 'Truck', 'Emergency Convoy'],
    riskFactors: [
      'Active slope sinking near Phesama and Pagla Pahar bypass',
      'Security checkpoint clearance delays at Mao interstate border',
      'Monsoon shoulder erosion between Senapati and Kangpokpi'
    ],
    aiRecommendation: 'Schedule escorted logistics convoys for POL tankers. Route critical medical freights with priority RFID green pass through Mao border.',
    coordinates: [
      [25.9095, 93.7266], // Dimapur
      [25.7500, 93.8500], // Chumukedima
      [25.6751, 94.1086], // Kohima
      [25.5600, 94.1200], // Phesama
      [25.5000, 94.1500], // Mao Gate
      [25.2667, 94.0167], // Senapati
      [25.1500, 93.9667], // Kangpokpi
      [24.8170, 93.9368]  // Imphal
    ]
  },
  {
    id: 'corridor-silchar-aizawl',
    name: 'Silchar → Aizawl Supply Lifeline',
    highwayCode: 'NH-306 / NH-54',
    origin: 'Silchar',
    originState: 'Assam',
    destination: 'Aizawl',
    destinationState: 'Mizoram',
    distanceKm: 172,
    normalTimeStr: '5h 00m',
    estimatedTimeStr: '6h 15m',
    normalMinutes: 300,
    estimatedMinutes: 375,
    delayMinutes: 75,
    accessibilityScore: 61.2,
    riskLevel: 'moderate',
    status: 'delayed',
    statusLabel: 'Landslip Vulnerability',
    elevationMaxM: 1132,
    passableFor: ['Light Vehicle', 'Truck', 'Emergency Convoy'],
    riskFactors: [
      'Frequent minor rock debris at Vairengte hill cut',
      'Narrow hairpin bends limiting dual-direction heavy vehicle traffic near Kolasib',
      'Localized pavement failure due to seepage near Kawnpui'
    ],
    aiRecommendation: 'Enforce one-way interval traffic regulation on Kolasib section. Station rapid earthmovers at Vairengte border depot.',
    coordinates: [
      [24.8333, 92.7789], // Silchar
      [24.4900, 92.7500], // Vairengte
      [24.2300, 92.6800], // Kolasib
      [23.9500, 92.6600], // Kawnpui
      [23.8300, 92.7000], // Sairang
      [23.7271, 92.7176]  // Aizawl
    ]
  },
  {
    id: 'corridor-guwahati-tezpur-itanagar',
    name: 'Guwahati → Tezpur → Itanagar Corridor',
    highwayCode: 'NH-15 / NH-415',
    origin: 'Guwahati',
    originState: 'Assam',
    destination: 'Itanagar',
    destinationState: 'Arunachal Pradesh',
    distanceKm: 332,
    normalTimeStr: '6h 45m',
    estimatedTimeStr: '7h 10m',
    normalMinutes: 405,
    estimatedMinutes: 430,
    delayMinutes: 25,
    accessibilityScore: 84.5,
    riskLevel: 'low',
    status: 'normal',
    statusLabel: 'Optimal Flow',
    elevationMaxM: 440,
    passableFor: ['Light Vehicle', 'Truck', 'Heavy Trailer', 'Emergency Convoy'],
    riskFactors: [
      'Minor waterlogging on service road near Gohpur',
      'Security frisking at Banderdewa check gate'
    ],
    aiRecommendation: 'Preferred route for all inter-state government freight heading to Papum Pare district. Flow operating at 92% capacity efficiency.',
    coordinates: [
      [26.1445, 91.7362], // Guwahati
      [26.4400, 92.0300], // Mangaldai
      [26.6338, 92.7926], // Tezpur / Kalia Bhomora
      [26.8500, 93.3000], // Biswanath Chariali
      [26.9800, 93.6300], // Gohpur
      [27.1200, 93.8100], // Banderdewa
      [27.0844, 93.6053]  // Itanagar
    ]
  },
  {
    id: 'corridor-guwahati-jorhat-dibrugarh',
    name: 'Guwahati → Nagaon → Jorhat → Dibrugarh Trunk',
    highwayCode: 'NH-27 / NH-715 / NH-37',
    origin: 'Guwahati',
    originState: 'Assam',
    destination: 'Dibrugarh',
    destinationState: 'Assam',
    distanceKm: 442,
    normalTimeStr: '8h 30m',
    estimatedTimeStr: '9h 05m',
    normalMinutes: 510,
    estimatedMinutes: 545,
    delayMinutes: 35,
    accessibilityScore: 89.0,
    riskLevel: 'low',
    status: 'normal',
    statusLabel: 'Stable Arterial with Animal Corridor Speed Limits',
    elevationMaxM: 120,
    passableFor: ['Light Vehicle', 'Truck', 'Heavy Trailer', 'Emergency Convoy'],
    riskFactors: [
      'Mandatory 40 km/h speed restrictions through 9 wildlife corridors at Kaziranga',
      'Flash flooding risk during high Brahmaputra discharge near Jakhalabandha'
    ],
    aiRecommendation: 'Utilize automated sensor tracking along Kaziranga bypass. Optimal transit window between 04:00 and 11:00 for refrigerated tea and medical freight.',
    coordinates: [
      [26.1445, 91.7362], // Guwahati
      [26.3500, 92.6800], // Nagaon
      [26.6000, 93.3500], // Kaziranga / Kohora
      [26.7500, 94.2200], // Jorhat
      [26.9800, 94.6300], // Sivasagar
      [27.4728, 94.9120]  // Dibrugarh
    ]
  },
  {
    id: 'corridor-agartala-sabroom',
    name: 'Agartala → Udaipur → Sabroom (Maitri Bridge Corridor)',
    highwayCode: 'NH-8',
    origin: 'Agartala',
    originState: 'Tripura',
    destination: 'Sabroom',
    destinationState: 'Tripura',
    distanceKm: 135,
    normalTimeStr: '2h 50m',
    estimatedTimeStr: '3h 05m',
    normalMinutes: 170,
    estimatedMinutes: 185,
    delayMinutes: 15,
    accessibilityScore: 92.4,
    riskLevel: 'low',
    status: 'normal',
    statusLabel: 'High Reliability Corridor',
    elevationMaxM: 55,
    passableFor: ['Light Vehicle', 'Truck', 'Heavy Trailer', 'Emergency Convoy'],
    riskFactors: [
      'Localized pavement wear between Belonia junction and Jolaibari'
    ],
    aiRecommendation: 'High efficiency multi-modal freight corridor. Ready for bulk grain and industrial cargo transshipment.',
    coordinates: [
      [23.8315, 91.2868], // Agartala
      [23.5300, 91.4800], // Udaipur
      [23.2500, 91.4500], // Belonia cut
      [23.1200, 91.6800], // Jolaibari
      [23.0000, 91.7100]  // Sabroom
    ]
  },
  {
    id: 'corridor-gangtok-mangan-chungthang',
    name: 'Gangtok → Mangan → Chungthang Strategic Axis',
    highwayCode: 'NH-310A',
    origin: 'Gangtok',
    originState: 'Sikkim',
    destination: 'Chungthang',
    destinationState: 'Sikkim',
    distanceKm: 85,
    normalTimeStr: '3h 15m',
    estimatedTimeStr: '5h 30m',
    normalMinutes: 195,
    estimatedMinutes: 330,
    delayMinutes: 135,
    accessibilityScore: 42.1,
    riskLevel: 'critical',
    status: 'blocked',
    statusLabel: 'High Landslide Activity & Dam Breach Zone',
    elevationMaxM: 1820,
    passableFor: ['Light Vehicle', 'Emergency Convoy'],
    riskFactors: [
      'Multiple active slides between Dikchu and Sankalang',
      'Teesta Stage-3 reservoir siltation overflow damage',
      'Heavy 140mm rainfall in North Sikkim catchment'
    ],
    aiRecommendation: 'Logistics restricted to Army BRO bailey bridge passages. Dispatch all critical high-altitude rations via heavy-lift helicopter drop from Pakyong/Bagdogra.',
    coordinates: [
      [27.3389, 88.6065], // Gangtok
      [27.4200, 88.5800], // Dikchu
      [27.5000, 88.5300], // Mangan
      [27.6030, 88.6500]  // Chungthang
    ]
  },
  {
    id: 'corridor-dibrugarh-pasighat-roing',
    name: 'Dibrugarh → Pasighat → Roing (Eastern Himalayan Arc)',
    highwayCode: 'NH-515 / NH-52',
    origin: 'Dibrugarh',
    originState: 'Assam',
    destination: 'Roing',
    destinationState: 'Arunachal Pradesh',
    distanceKm: 158,
    normalTimeStr: '3h 20m',
    estimatedTimeStr: '3h 50m',
    normalMinutes: 200,
    estimatedMinutes: 230,
    delayMinutes: 30,
    accessibilityScore: 82.0,
    riskLevel: 'moderate',
    status: 'normal',
    statusLabel: 'Bogibeel Bridge Transshipment Active',
    elevationMaxM: 390,
    passableFor: ['Light Vehicle', 'Truck', 'Heavy Trailer', 'Emergency Convoy'],
    riskFactors: [
      'Siang river flood warning level near Pasighat embankment',
      'Bridge weight limits across Dibang river temporary spans'
    ],
    aiRecommendation: 'Transit via Bogibeel bridge recommended. Ensure vehicle axle weight does not exceed 40 tonnes on Dibang temporary span.',
    coordinates: [
      [27.4728, 94.9120], // Dibrugarh
      [27.3900, 94.8500], // Bogibeel Bridge
      [27.8000, 95.1200], // Ruksin
      [28.0667, 95.3333], // Pasighat
      [28.1400, 95.8300]  // Roing
    ]
  },
  {
    id: 'corridor-imphal-moreh',
    name: 'Imphal → Kakching → Moreh (India-ASEAN Gateway)',
    highwayCode: 'NH-102',
    origin: 'Imphal',
    originState: 'Manipur',
    destination: 'Moreh',
    destinationState: 'Manipur',
    distanceKm: 110,
    normalTimeStr: '2h 45m',
    estimatedTimeStr: '3h 40m',
    normalMinutes: 165,
    estimatedMinutes: 220,
    delayMinutes: 55,
    accessibilityScore: 66.8,
    riskLevel: 'moderate',
    status: 'delayed',
    statusLabel: 'Checkpost Clearance Delays & Security Protocol',
    elevationMaxM: 650,
    passableFor: ['Light Vehicle', 'Truck', 'Emergency Convoy'],
    riskFactors: [
      'Tengnoupal hill stretch vulnerable to monsoon gravel slips',
      'Strict security scanning at Khudengthabi Assam Rifles checkpoint'
    ],
    aiRecommendation: 'Coordinate integrated customs and security clearance at Integrated Check Post (ICP) Moreh during daylight windows (07:00 - 16:30).',
    coordinates: [
      [24.8170, 93.9368], // Imphal
      [24.6500, 93.9600], // Thoubal
      [24.4800, 93.9800], // Kakching
      [24.3800, 94.1500], // Tengnoupal
      [24.2400, 94.3000]  // Moreh
    ]
  },
  {
    id: 'corridor-shillong-dawki',
    name: 'Shillong → Pynursla → Dawki (Sylhet Border Corridor)',
    highwayCode: 'NH-206',
    origin: 'Shillong',
    originState: 'Meghalaya',
    destination: 'Dawki',
    destinationState: 'Meghalaya',
    distanceKm: 82,
    normalTimeStr: '2h 30m',
    estimatedTimeStr: '3h 05m',
    normalMinutes: 150,
    estimatedMinutes: 185,
    delayMinutes: 35,
    accessibilityScore: 78.5,
    riskLevel: 'low',
    status: 'normal',
    statusLabel: 'Operational with Fog Precautions',
    elevationMaxM: 1600,
    passableFor: ['Light Vehicle', 'Truck', 'Emergency Convoy'],
    riskFactors: [
      'Dense fog on Pynursla tableland between 16:00 and 09:00',
      'Dawki single-span suspension bridge weight regulation (max 12T)'
    ],
    aiRecommendation: 'Fit all commercial transport with fog lamps. Heavy freight above 12T must reroute via Sutnga-Bholaganj link.',
    coordinates: [
      [25.5788, 91.8933], // Shillong
      [25.4000, 91.9000], // Mylliem
      [25.3000, 91.9000], // Pynursla
      [25.1800, 92.0200]  // Dawki
    ]
  }
];
