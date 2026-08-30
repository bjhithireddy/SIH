import { DistrictAccessibility, InfrastructureCategory } from '../types';

export const STATE_ACCESSIBILITY_SCORES = [
  { state: 'Assam', score: 91.2, previousScore: 90.8, change: '+0.4%', status: 'High / Optimal', color: '#10B981' },
  { state: 'Tripura', score: 88.3, previousScore: 86.2, change: '+2.1%', status: 'High / Stable', color: '#10B981' },
  { state: 'Nagaland', score: 74.0, previousScore: 73.2, change: '+0.8%', status: 'Moderate', color: '#F59E0B' },
  { state: 'Meghalaya', score: 72.8, previousScore: 74.6, change: '-1.8%', status: 'Moderate / Monitored', color: '#F59E0B' },
  { state: 'Manipur', score: 68.4, previousScore: 67.2, change: '+1.2%', status: 'Moderate', color: '#F59E0B' },
  { state: 'Arunachal Pradesh', score: 64.1, previousScore: 68.3, change: '-4.2%', status: 'Vulnerable', color: '#F97316' },
  { state: 'Mizoram', score: 61.5, previousScore: 64.6, change: '-3.1%', status: 'Vulnerable', color: '#F97316' },
  { state: 'Sikkim', score: 59.0, previousScore: 65.5, change: '-6.5%', status: 'Critical / Disrupted', color: '#EF4444' },
];

export const ACCESSIBILITY_TREND_30_DAYS = [
  { day: 'Day 1', Assam: 92, Arunachal: 72, Meghalaya: 78, Manipur: 70, Mizoram: 68, Nagaland: 76, Tripura: 87, Sikkim: 74, overall: 77.1 },
  { day: 'Day 5', Assam: 91, Arunachal: 71, Meghalaya: 77, Manipur: 69, Mizoram: 66, Nagaland: 75, Tripura: 87, Sikkim: 71, overall: 75.9 },
  { day: 'Day 10', Assam: 90, Arunachal: 69, Meghalaya: 76, Manipur: 68, Mizoram: 65, Nagaland: 75, Tripura: 88, Sikkim: 68, overall: 74.9 },
  { day: 'Day 15', Assam: 91, Arunachal: 67, Meghalaya: 74, Manipur: 67, Mizoram: 63, Nagaland: 74, Tripura: 88, Sikkim: 64, overall: 73.5 },
  { day: 'Day 20', Assam: 89, Arunachal: 66, Meghalaya: 73, Manipur: 68, Mizoram: 62, Nagaland: 73, Tripura: 89, Sikkim: 61, overall: 72.6 },
  { day: 'Day 25', Assam: 90, Arunachal: 65, Meghalaya: 72, Manipur: 68, Mizoram: 62, Nagaland: 74, Tripura: 88, Sikkim: 60, overall: 72.4 },
  { day: 'Day 30', Assam: 91.2, Arunachal: 64.1, Meghalaya: 72.8, Manipur: 68.4, Mizoram: 61.5, Nagaland: 74.0, Tripura: 88.3, Sikkim: 59.0, overall: 72.4 },
];

export const INFRASTRUCTURE_CATEGORY_BREAKDOWN: { category: InfrastructureCategory; operational: number; degraded: number; blocked: number; healthPct: number }[] = [
  { category: 'Road', operational: 1420, degraded: 312, blocked: 48, healthPct: 79.8 },
  { category: 'Bridge', operational: 485, degraded: 38, blocked: 7, healthPct: 91.5 },
  { category: 'Railway', operational: 68, degraded: 11, blocked: 2, healthPct: 83.9 },
  { category: 'Airport', operational: 24, degraded: 4, blocked: 1, healthPct: 82.8 },
  { category: 'Warehouse', operational: 194, degraded: 14, blocked: 0, healthPct: 93.3 },
  { category: 'Hospital', operational: 310, degraded: 18, blocked: 3, healthPct: 93.6 },
  { category: 'Relief Center', operational: 142, degraded: 8, blocked: 0, healthPct: 94.7 },
  { category: 'Checkpoint', operational: 56, degraded: 12, blocked: 0, healthPct: 82.4 },
];

export const DISTRICT_ACCESSIBILITY_DATA: DistrictAccessibility[] = [
  // Assam
  { district: 'Kamrup Metropolitan', state: 'Assam', score: 96.4, roadScore: 97, bridgeScore: 98, essentialSupplyReachDays: 0.5, vulnerabilityStatus: 'Safe' },
  { district: 'Dibrugarh', state: 'Assam', score: 92.1, roadScore: 91, bridgeScore: 95, essentialSupplyReachDays: 1.0, vulnerabilityStatus: 'Safe' },
  { district: 'Cachar (Silchar)', state: 'Assam', score: 79.5, roadScore: 76, bridgeScore: 82, essentialSupplyReachDays: 2.0, vulnerabilityStatus: 'Moderate' },
  { district: 'Dima Hasao (Haflong)', state: 'Assam', score: 68.2, roadScore: 62, bridgeScore: 71, essentialSupplyReachDays: 3.5, vulnerabilityStatus: 'Vulnerable' },

  // Arunachal Pradesh
  { district: 'Papum Pare (Itanagar)', state: 'Arunachal Pradesh', score: 86.0, roadScore: 85, bridgeScore: 89, essentialSupplyReachDays: 1.0, vulnerabilityStatus: 'Safe' },
  { district: 'West Kameng (Bomdila)', state: 'Arunachal Pradesh', score: 61.4, roadScore: 58, bridgeScore: 68, essentialSupplyReachDays: 3.0, vulnerabilityStatus: 'Vulnerable' },
  { district: 'Tawang', state: 'Arunachal Pradesh', score: 52.8, roadScore: 46, bridgeScore: 60, essentialSupplyReachDays: 4.5, vulnerabilityStatus: 'Critical' },
  { district: 'Anjaw (Hawai)', state: 'Arunachal Pradesh', score: 48.2, roadScore: 42, bridgeScore: 55, essentialSupplyReachDays: 5.5, vulnerabilityStatus: 'Critical' },

  // Sikkim
  { district: 'East Sikkim (Gangtok)', state: 'Sikkim', score: 66.4, roadScore: 61, bridgeScore: 72, essentialSupplyReachDays: 2.5, vulnerabilityStatus: 'Vulnerable' },
  { district: 'Mangan (North Sikkim)', state: 'Sikkim', score: 38.5, roadScore: 32, bridgeScore: 44, essentialSupplyReachDays: 7.0, vulnerabilityStatus: 'Critical' },
  { district: 'Namchi (South Sikkim)', state: 'Sikkim', score: 71.2, roadScore: 70, bridgeScore: 74, essentialSupplyReachDays: 2.0, vulnerabilityStatus: 'Moderate' },

  // Meghalaya
  { district: 'East Khasi Hills (Shillong)', state: 'Meghalaya', score: 84.6, roadScore: 83, bridgeScore: 88, essentialSupplyReachDays: 1.0, vulnerabilityStatus: 'Safe' },
  { district: 'East Jaintia Hills (Khliehriat)', state: 'Meghalaya', score: 66.8, roadScore: 62, bridgeScore: 70, essentialSupplyReachDays: 3.0, vulnerabilityStatus: 'Vulnerable' },
  { district: 'South Garo Hills (Baghmara)', state: 'Meghalaya', score: 58.4, roadScore: 54, bridgeScore: 62, essentialSupplyReachDays: 4.0, vulnerabilityStatus: 'Critical' },

  // Manipur
  { district: 'Imphal West', state: 'Manipur', score: 82.3, roadScore: 81, bridgeScore: 85, essentialSupplyReachDays: 1.0, vulnerabilityStatus: 'Safe' },
  { district: 'Senapati', state: 'Manipur', score: 64.5, roadScore: 60, bridgeScore: 68, essentialSupplyReachDays: 3.0, vulnerabilityStatus: 'Vulnerable' },
  { district: 'Churachandpur', state: 'Manipur', score: 61.2, roadScore: 58, bridgeScore: 64, essentialSupplyReachDays: 3.5, vulnerabilityStatus: 'Vulnerable' },

  // Mizoram
  { district: 'Aizawl', state: 'Mizoram', score: 74.2, roadScore: 72, bridgeScore: 78, essentialSupplyReachDays: 2.0, vulnerabilityStatus: 'Moderate' },
  { district: 'Lawngtlai', state: 'Mizoram', score: 49.5, roadScore: 45, bridgeScore: 52, essentialSupplyReachDays: 6.0, vulnerabilityStatus: 'Critical' },
  { district: 'Champhai', state: 'Mizoram', score: 58.7, roadScore: 55, bridgeScore: 62, essentialSupplyReachDays: 4.5, vulnerabilityStatus: 'Vulnerable' },

  // Nagaland
  { district: 'Dimapur', state: 'Nagaland', score: 89.4, roadScore: 88, bridgeScore: 92, essentialSupplyReachDays: 0.5, vulnerabilityStatus: 'Safe' },
  { district: 'Kohima', state: 'Nagaland', score: 76.8, roadScore: 73, bridgeScore: 80, essentialSupplyReachDays: 1.5, vulnerabilityStatus: 'Moderate' },
  { district: 'Mon', state: 'Nagaland', score: 54.2, roadScore: 48, bridgeScore: 58, essentialSupplyReachDays: 5.0, vulnerabilityStatus: 'Critical' },

  // Tripura
  { district: 'West Tripura (Agartala)', state: 'Tripura', score: 94.0, roadScore: 94, bridgeScore: 96, essentialSupplyReachDays: 0.5, vulnerabilityStatus: 'Safe' },
  { district: 'South Tripura (Belonia)', state: 'Tripura', score: 89.2, roadScore: 88, bridgeScore: 92, essentialSupplyReachDays: 1.0, vulnerabilityStatus: 'Safe' },
  { district: 'Dhalai (Ambassa)', state: 'Tripura', score: 78.4, roadScore: 75, bridgeScore: 82, essentialSupplyReachDays: 2.0, vulnerabilityStatus: 'Moderate' },
];
