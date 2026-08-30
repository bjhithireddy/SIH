import { AIAnalysisResult } from '../types';

export const DEFAULT_ROUTE_SEARCHES: Record<string, AIAnalysisResult> = {
  'Guwahati-Tawang': {
    origin: 'Guwahati',
    destination: 'Tawang',
    vehicleType: 'Heavy Commercial Truck (12-Wheel)',
    cargoType: 'Essential Medical & PDS Rations',
    primaryRoute: {
      distanceKm: 448,
      estimatedTime: '11h 20m',
      fuelEstimateLiters: 165,
      accessibilityScore: 62,
      riskScore: 78,
    },
    recommendedRouteId: 'route-b',
    routes: [
      {
        id: 'route-a',
        code: 'A',
        name: 'Route A — Direct via Bhalukpong & Bomdila (NH-13)',
        tag: 'Fastest',
        isRecommended: false,
        distanceKm: 448,
        timeStr: '10h 15m',
        timeMinutes: 615,
        delayMinutes: 95,
        riskLevel: 'high',
        riskScore: 82,
        accessibilityScore: 58,
        estimatedFuelLiters: 165,
        estimatedCostInr: 18500,
        reason: 'Shortest geographical distance but crosses 3 active landslide fault zones at Km 42 and Sela incline.',
        viaCities: ['Guwahati', 'Tezpur', 'Bhalukpong', 'Tenga', 'Bomdila', 'Dirang', 'Sela Pass', 'Tawang'],
        pros: ['Shortest route distance', 'Direct arterial highway', 'Frequent fuel stations up to Bomdila'],
        cons: ['High landslide probability (78%)', 'Single-lane restriction at Km 42', 'Severe fog at Sela approach'],
        coordinates: [
          [26.1445, 91.7362],
          [26.6338, 92.7926],
          [27.0125, 92.6514],
          [27.1648, 92.5311],
          [27.2645, 92.4214],
          [27.3512, 92.2418],
          [27.5028, 92.1025],
          [27.5861, 91.8594]
        ]
      },
      {
        id: 'route-b',
        code: 'B',
        name: 'Route B — Via Kalaktang-Shergaon & Rupa Bypass',
        tag: 'Recommended',
        isRecommended: true,
        distanceKm: 472,
        timeStr: '10h 44m',
        timeMinutes: 644,
        delayMinutes: 24,
        riskLevel: 'moderate',
        riskScore: 42,
        accessibilityScore: 84,
        estimatedFuelLiters: 172,
        estimatedCostInr: 19200,
        reason: 'Avoids fragile Bhalukpong canyon slides; stable bedrock geology and wider passing bays with 84% reliability.',
        viaCities: ['Guwahati', 'Mangaldai', 'Bhairabkunda', 'Kalaktang', 'Shergaon', 'Rupa', 'Dirang', 'Sela Tunnel', 'Tawang'],
        pros: ['Lower landslide exposure (reduced by 58%)', 'Better drainage & road pavement', 'Passes through newly commissioned Sela Tunnel', 'Higher reliability for sensitive cargo'],
        cons: ['+24 km longer distance', 'Limited heavy recovery cranes between Shergaon and Rupa'],
        coordinates: [
          [26.1445, 91.7362],
          [26.4400, 92.0300],
          [26.9000, 92.1100],
          [27.0200, 92.1600],
          [27.1200, 92.2700],
          [27.2000, 92.4000],
          [27.3512, 92.2418],
          [27.5028, 92.1025],
          [27.5861, 91.8594]
        ]
      },
      {
        id: 'route-c',
        code: 'C',
        name: 'Route C — Southern Foothills & Orang Transit Link',
        tag: 'Safest',
        isRecommended: false,
        distanceKm: 512,
        timeStr: '12h 10m',
        timeMinutes: 730,
        delayMinutes: 10,
        riskLevel: 'low',
        riskScore: 24,
        accessibilityScore: 92,
        estimatedFuelLiters: 188,
        estimatedCostInr: 21400,
        reason: 'Maximum road width and gentle gradients, but adds 64 km to total journey.',
        viaCities: ['Guwahati', 'Dhekiajuli', 'Orang', 'Rowta', 'Kalaktang', 'Bomdila', 'Tawang'],
        pros: ['Lowest risk score (24/100)', 'Wide 2-lane paved tarmac for 80% of route', 'Full cellular coverage (5G/4G)'],
        cons: ['Longest route distance (+64 km)', 'Requires additional fuel stop', '+1h 26m longer travel time'],
        coordinates: [
          [26.1445, 91.7362],
          [26.5500, 92.4500],
          [26.7000, 92.3500],
          [26.9000, 92.1100],
          [27.1200, 92.2700],
          [27.2645, 92.4214],
          [27.5028, 92.1025],
          [27.5861, 91.8594]
        ]
      }
    ],
    aiExplanation: {
      title: 'Why NE-LogiAI Recommends Route B',
      summary: 'Route B provides the optimal trade-off between transit speed and geological safety. While Route A is 24 km shorter, active rainfall telemetry over Bhalukpong presents a 78% probability of multi-hour stranding. Route B bypasses the landslide basin entirely while maintaining an 84% accessibility score.',
      factors: [
        {
          title: 'Lower Landslide Exposure',
          description: 'Geotechnical sensors indicate 58% lower slope instability risk compared to NH-13 Bhalukpong gorge.',
          weight: 40,
          status: 'positive'
        },
        {
          title: 'Better Road Accessibility',
          description: 'Recent BRO widening on Kalaktang-Shergaon section provides 8.5m carriageway with engineered culverts.',
          weight: 25,
          status: 'positive'
        },
        {
          title: 'Moderate Traffic & Checkpoint Flow',
          description: 'Bhairabkunda gate reports average scan time under 6 minutes per commercial truck.',
          weight: 20,
          status: 'positive'
        },
        {
          title: 'Higher Reliability & Resilience',
          description: 'Historical uptime in monsoons exceeds 91%, compared to 54% uptime along NH-13.',
          weight: 15,
          status: 'positive'
        }
      ],
      confidence: 89,
      modelGeneratedTimestamp: 'Today at 08:30 IST'
    }
  },

  'Siliguri-Gangtok': {
    origin: 'Siliguri',
    destination: 'Gangtok',
    vehicleType: 'Medium Supply Truck (6-Wheel)',
    cargoType: 'Pharmaceuticals & Oxygen Cylinders',
    primaryRoute: {
      distanceKm: 114,
      estimatedTime: '5h 45m',
      fuelEstimateLiters: 48,
      accessibilityScore: 48,
      riskScore: 89,
    },
    recommendedRouteId: 'route-b',
    routes: [
      {
        id: 'route-a',
        code: 'A',
        name: 'Route A — NH-10 Direct via Sevoke & 29th Mile',
        tag: 'Fastest',
        isRecommended: false,
        distanceKm: 114,
        timeStr: '4h 15m (Normal: 3h 30m)',
        timeMinutes: 255,
        delayMinutes: 135,
        riskLevel: 'critical',
        riskScore: 92,
        accessibilityScore: 42,
        estimatedFuelLiters: 52,
        estimatedCostInr: 6800,
        reason: 'Direct corridor along Teesta river currently experiencing active mudslides and embankment erosion.',
        viaCities: ['Siliguri', 'Sevoke', 'Teesta Bazaar', 'Rangpo', 'Singtam', 'Gangtok'],
        pros: ['Shortest route', 'Gentle initial gradient'],
        cons: ['Active mudslide block at 29th Mile', 'Risk of complete highway closure'],
        coordinates: [
          [26.7271, 88.3953],
          [26.8833, 88.4667],
          [27.0667, 88.4333],
          [27.1764, 88.5312],
          [27.2341, 88.5912],
          [27.3389, 88.6065]
        ]
      },
      {
        id: 'route-b',
        code: 'B',
        name: 'Route B — Via Lava, Reshi, Rongli & Pakyong',
        tag: 'Recommended',
        isRecommended: true,
        distanceKm: 148,
        timeStr: '4h 40m',
        timeMinutes: 280,
        delayMinutes: 20,
        riskLevel: 'moderate',
        riskScore: 38,
        accessibilityScore: 82,
        estimatedFuelLiters: 64,
        estimatedCostInr: 8100,
        reason: 'Bypasses the unstable Teesta river basin completely via high-ridge roads with 82% accessibility.',
        viaCities: ['Siliguri', 'Gorubathan', 'Lava', 'Reshi Border', 'Rongli', 'Rhenock', 'Pakyong', 'Gangtok'],
        pros: ['Completely bypasses Teesta landslide zones', 'No river scouring vulnerability', 'High ridge roads with solid rock base'],
        cons: ['+34 km longer distance', 'Steeper switchbacks near Lava (elevation 2,138m)'],
        coordinates: [
          [26.7271, 88.3953],
          [26.9600, 88.7000],
          [27.0800, 88.6600],
          [27.1500, 88.6200],
          [27.2272, 88.5866],
          [27.3389, 88.6065]
        ]
      },
      {
        id: 'route-c',
        code: 'C',
        name: 'Route C — Via Mirik, Jorethang & Melli Bypass',
        tag: 'Safest',
        isRecommended: false,
        distanceKm: 162,
        timeStr: '5h 15m',
        timeMinutes: 315,
        delayMinutes: 15,
        riskLevel: 'low',
        riskScore: 28,
        accessibilityScore: 88,
        estimatedFuelLiters: 70,
        estimatedCostInr: 8900,
        reason: 'Southern loop through Darjeeling hills connecting to South Sikkim road network.',
        viaCities: ['Siliguri', 'Mirik', 'Sukhiapokhri', 'Jorethang', 'Namchi', 'Singtam', 'Gangtok'],
        pros: ['Lowest geological risk rating', 'Well-maintained tourist corridor infrastructure'],
        cons: ['Significant climb and descent', '+48 km longer'],
        coordinates: [
          [26.7271, 88.3953],
          [26.8900, 88.1800],
          [27.0500, 88.2500],
          [27.1200, 88.3100],
          [27.1600, 88.3500],
          [27.2341, 88.5912],
          [27.3389, 88.6065]
        ]
      }
    ],
    aiExplanation: {
      title: 'Why NE-LogiAI Recommends Route B',
      summary: 'Due to severe river undercutting at 29th Mile along NH-10, Route B via Lava and Rongli is strongly recommended. It avoids the Teesta danger zone completely, ensuring guaranteed arrival for critical medical supplies with only a 20-minute nominal delay.',
      factors: [
        {
          title: 'Teesta Fault Basin Bypass',
          description: 'Completely circumvents the active 29th Mile mudslide sector.',
          weight: 45,
          status: 'positive'
        },
        {
          title: 'High Ridge Stability',
          description: 'Lava-Rhenock corridor rests on granite gneiss formations with low slide vulnerability.',
          weight: 30,
          status: 'positive'
        },
        {
          title: 'Reliable Fuel & Service Access',
          description: 'Active emergency towing stations located at Rongli and Pakyong.',
          weight: 15,
          status: 'positive'
        },
        {
          title: 'Priority Convoy Clearance',
          description: 'Reshi checkpost configured for express green pass clearance for medical trucks.',
          weight: 10,
          status: 'positive'
        }
      ],
      confidence: 93,
      modelGeneratedTimestamp: 'Today at 09:15 IST'
    }
  }
};
