export interface TimeframeAnalytics {
  deliveryTrends: { timeLabel: string; avgHours: number; normalHours: number; delayMinutes: number }[];
  stateVolume: { state: string; freightTons: number; targetTons: number; tripsCompleted: number }[];
  disruptionHistory: { timeLabel: string; activeDisruptions: number; totalDelayHours: number; resolvedCount: number }[];
  disruptionTypes: { name: string; value: number; color: string }[];
  fuelImpact: { corridor: string; fuelExcessPct: number; costSurchargeInr: number; carbonImpactKg: number }[];
  kpis: {
    avgDeliveryTimeHrs: number;
    avgDeliveryVariancePct: number;
    freightVolumeTons: number;
    freightVolumeTrendPct: number;
    fuelCostIndex: number;
    fuelCostTrendPct: number;
    disruptionIncidentsCount: number;
    disruptionIncidentsTrendPct: number;
  };
}

export const ANALYTICS_DATA: Record<'today' | '7d' | '30d' | '90d', TimeframeAnalytics> = {
  today: {
    kpis: {
      avgDeliveryTimeHrs: 8.6,
      avgDeliveryVariancePct: 14.2,
      freightVolumeTons: 14250,
      freightVolumeTrendPct: 3.4,
      fuelCostIndex: 118.2,
      fuelCostTrendPct: 2.1,
      disruptionIncidentsCount: 17,
      disruptionIncidentsTrendPct: -5.6,
    },
    deliveryTrends: [
      { timeLabel: '00:00', avgHours: 6.2, normalHours: 5.5, delayMinutes: 42 },
      { timeLabel: '04:00', avgHours: 5.8, normalHours: 5.5, delayMinutes: 18 },
      { timeLabel: '08:00', avgHours: 7.4, normalHours: 5.5, delayMinutes: 114 },
      { timeLabel: '12:00', avgHours: 8.9, normalHours: 5.5, delayMinutes: 204 },
      { timeLabel: '16:00', avgHours: 9.2, normalHours: 5.5, delayMinutes: 222 },
      { timeLabel: '20:00', avgHours: 8.1, normalHours: 5.5, delayMinutes: 156 },
      { timeLabel: '23:59', avgHours: 7.0, normalHours: 5.5, delayMinutes: 90 },
    ],
    stateVolume: [
      { state: 'Assam', freightTons: 6800, targetTons: 7000, tripsCompleted: 412 },
      { state: 'Arunachal', freightTons: 1150, targetTons: 1500, tripsCompleted: 86 },
      { state: 'Meghalaya', freightTons: 2100, targetTons: 2200, tripsCompleted: 148 },
      { state: 'Manipur', freightTons: 980, targetTons: 1200, tripsCompleted: 64 },
      { state: 'Mizoram', freightTons: 820, targetTons: 1000, tripsCompleted: 58 },
      { state: 'Nagaland', freightTons: 1240, targetTons: 1300, tripsCompleted: 92 },
      { state: 'Tripura', freightTons: 1820, targetTons: 1900, tripsCompleted: 126 },
      { state: 'Sikkim', freightTons: 540, targetTons: 1100, tripsCompleted: 38 },
    ],
    disruptionHistory: [
      { timeLabel: '00:00', activeDisruptions: 12, totalDelayHours: 36, resolvedCount: 2 },
      { timeLabel: '06:00', activeDisruptions: 15, totalDelayHours: 48, resolvedCount: 3 },
      { timeLabel: '12:00', activeDisruptions: 19, totalDelayHours: 72, resolvedCount: 5 },
      { timeLabel: '18:00', activeDisruptions: 17, totalDelayHours: 64, resolvedCount: 8 },
      { timeLabel: '23:59', activeDisruptions: 14, totalDelayHours: 52, resolvedCount: 11 },
    ],
    disruptionTypes: [
      { name: 'Landslides & Slips', value: 42, color: '#EF4444' },
      { name: 'Flash Floods & Waterlogging', value: 24, color: '#0284C7' },
      { name: 'Bridge & Subgrade Repair', value: 16, color: '#F59E0B' },
      { name: 'Border/Toll Congestion', value: 12, color: '#8B5CF6' },
      { name: 'Accidents / Vehicle Breakdowns', value: 6, color: '#64748B' },
    ],
    fuelImpact: [
      { corridor: 'NH-10 (Sikkim)', fuelExcessPct: 28.5, costSurchargeInr: 4620, carbonImpactKg: 148 },
      { corridor: 'NH-13 (Tawang)', fuelExcessPct: 22.1, costSurchargeInr: 5850, carbonImpactKg: 192 },
      { corridor: 'NH-29 (Kohima)', fuelExcessPct: 16.4, costSurchargeInr: 3200, carbonImpactKg: 96 },
      { corridor: 'NH-6 (Shillong-Silchar)', fuelExcessPct: 12.8, costSurchargeInr: 2850, carbonImpactKg: 84 },
      { corridor: 'NH-306 (Aizawl)', fuelExcessPct: 18.2, costSurchargeInr: 3600, carbonImpactKg: 112 },
    ]
  },
  '7d': {
    kpis: {
      avgDeliveryTimeHrs: 8.2,
      avgDeliveryVariancePct: 12.8,
      freightVolumeTons: 98400,
      freightVolumeTrendPct: 5.8,
      fuelCostIndex: 115.4,
      fuelCostTrendPct: 1.6,
      disruptionIncidentsCount: 84,
      disruptionIncidentsTrendPct: -8.2,
    },
    deliveryTrends: [
      { timeLabel: 'Mon', avgHours: 7.8, normalHours: 5.5, delayMinutes: 138 },
      { timeLabel: 'Tue', avgHours: 8.4, normalHours: 5.5, delayMinutes: 174 },
      { timeLabel: 'Wed', avgHours: 9.1, normalHours: 5.5, delayMinutes: 216 },
      { timeLabel: 'Thu', avgHours: 8.6, normalHours: 5.5, delayMinutes: 186 },
      { timeLabel: 'Fri', avgHours: 7.9, normalHours: 5.5, delayMinutes: 144 },
      { timeLabel: 'Sat', avgHours: 7.4, normalHours: 5.5, delayMinutes: 114 },
      { timeLabel: 'Sun', avgHours: 6.8, normalHours: 5.5, delayMinutes: 78 },
    ],
    stateVolume: [
      { state: 'Assam', freightTons: 47200, targetTons: 48000, tripsCompleted: 2840 },
      { state: 'Arunachal', freightTons: 8200, targetTons: 10500, tripsCompleted: 610 },
      { state: 'Meghalaya', freightTons: 14600, targetTons: 15400, tripsCompleted: 1040 },
      { state: 'Manipur', freightTons: 6900, targetTons: 8400, tripsCompleted: 450 },
      { state: 'Mizoram', freightTons: 5800, targetTons: 7000, tripsCompleted: 410 },
      { state: 'Nagaland', freightTons: 8700, targetTons: 9100, tripsCompleted: 645 },
      { state: 'Tripura', freightTons: 12800, targetTons: 13300, tripsCompleted: 880 },
      { state: 'Sikkim', freightTons: 3800, targetTons: 7700, tripsCompleted: 270 },
    ],
    disruptionHistory: [
      { timeLabel: 'Mon', activeDisruptions: 14, totalDelayHours: 56, resolvedCount: 8 },
      { timeLabel: 'Tue', activeDisruptions: 18, totalDelayHours: 78, resolvedCount: 12 },
      { timeLabel: 'Wed', activeDisruptions: 22, totalDelayHours: 94, resolvedCount: 15 },
      { timeLabel: 'Thu', activeDisruptions: 19, totalDelayHours: 82, resolvedCount: 14 },
      { timeLabel: 'Fri', activeDisruptions: 15, totalDelayHours: 60, resolvedCount: 18 },
      { timeLabel: 'Sat', activeDisruptions: 12, totalDelayHours: 44, resolvedCount: 11 },
      { timeLabel: 'Sun', activeDisruptions: 11, totalDelayHours: 38, resolvedCount: 9 },
    ],
    disruptionTypes: [
      { name: 'Landslides & Slips', value: 39, color: '#EF4444' },
      { name: 'Flash Floods & Waterlogging', value: 26, color: '#0284C7' },
      { name: 'Bridge & Subgrade Repair', value: 18, color: '#F59E0B' },
      { name: 'Border/Toll Congestion', value: 11, color: '#8B5CF6' },
      { name: 'Accidents / Vehicle Breakdowns', value: 6, color: '#64748B' },
    ],
    fuelImpact: [
      { corridor: 'NH-10 (Sikkim)', fuelExcessPct: 26.2, costSurchargeInr: 32400, carbonImpactKg: 1040 },
      { corridor: 'NH-13 (Tawang)', fuelExcessPct: 21.0, costSurchargeInr: 38900, carbonImpactKg: 1280 },
      { corridor: 'NH-29 (Kohima)', fuelExcessPct: 15.1, costSurchargeInr: 21600, carbonImpactKg: 680 },
      { corridor: 'NH-6 (Shillong-Silchar)', fuelExcessPct: 11.4, costSurchargeInr: 19400, carbonImpactKg: 590 },
      { corridor: 'NH-306 (Aizawl)', fuelExcessPct: 17.0, costSurchargeInr: 24500, carbonImpactKg: 780 },
    ]
  },
  '30d': {
    kpis: {
      avgDeliveryTimeHrs: 8.0,
      avgDeliveryVariancePct: 11.4,
      freightVolumeTons: 418000,
      freightVolumeTrendPct: 7.2,
      fuelCostIndex: 112.8,
      fuelCostTrendPct: 0.9,
      disruptionIncidentsCount: 342,
      disruptionIncidentsTrendPct: -11.5,
    },
    deliveryTrends: [
      { timeLabel: 'Week 1', avgHours: 8.4, normalHours: 5.5, delayMinutes: 174 },
      { timeLabel: 'Week 2', avgHours: 8.8, normalHours: 5.5, delayMinutes: 198 },
      { timeLabel: 'Week 3', avgHours: 7.9, normalHours: 5.5, delayMinutes: 144 },
      { timeLabel: 'Week 4', avgHours: 7.3, normalHours: 5.5, delayMinutes: 108 },
    ],
    stateVolume: [
      { state: 'Assam', freightTons: 202000, targetTons: 205000, tripsCompleted: 12200 },
      { state: 'Arunachal', freightTons: 36000, targetTons: 45000, tripsCompleted: 2650 },
      { state: 'Meghalaya', freightTons: 63000, targetTons: 66000, tripsCompleted: 4500 },
      { state: 'Manipur', freightTons: 29500, targetTons: 36000, tripsCompleted: 1950 },
      { state: 'Mizoram', freightTons: 25000, targetTons: 30000, tripsCompleted: 1750 },
      { state: 'Nagaland', freightTons: 37500, targetTons: 39000, tripsCompleted: 2780 },
      { state: 'Tripura', freightTons: 54500, targetTons: 57000, tripsCompleted: 3750 },
      { state: 'Sikkim', freightTons: 17000, targetTons: 33000, tripsCompleted: 1180 },
    ],
    disruptionHistory: [
      { timeLabel: 'Week 1', activeDisruptions: 92, totalDelayHours: 368, resolvedCount: 84 },
      { timeLabel: 'Week 2', activeDisruptions: 115, totalDelayHours: 480, resolvedCount: 102 },
      { timeLabel: 'Week 3', activeDisruptions: 88, totalDelayHours: 320, resolvedCount: 89 },
      { timeLabel: 'Week 4', activeDisruptions: 68, totalDelayHours: 240, resolvedCount: 74 },
    ],
    disruptionTypes: [
      { name: 'Landslides & Slips', value: 45, color: '#EF4444' },
      { name: 'Flash Floods & Waterlogging', value: 28, color: '#0284C7' },
      { name: 'Bridge & Subgrade Repair', value: 14, color: '#F59E0B' },
      { name: 'Border/Toll Congestion', value: 8, color: '#8B5CF6' },
      { name: 'Accidents / Vehicle Breakdowns', value: 5, color: '#64748B' },
    ],
    fuelImpact: [
      { corridor: 'NH-10 (Sikkim)', fuelExcessPct: 29.1, costSurchargeInr: 142000, carbonImpactKg: 4600 },
      { corridor: 'NH-13 (Tawang)', fuelExcessPct: 23.4, costSurchargeInr: 168000, carbonImpactKg: 5500 },
      { corridor: 'NH-29 (Kohima)', fuelExcessPct: 14.8, costSurchargeInr: 92000, carbonImpactKg: 2900 },
      { corridor: 'NH-6 (Shillong-Silchar)', fuelExcessPct: 10.9, costSurchargeInr: 84000, carbonImpactKg: 2550 },
      { corridor: 'NH-306 (Aizawl)', fuelExcessPct: 16.5, costSurchargeInr: 106000, carbonImpactKg: 3400 },
    ]
  },
  '90d': {
    kpis: {
      avgDeliveryTimeHrs: 8.4,
      avgDeliveryVariancePct: 15.6,
      freightVolumeTons: 1240000,
      freightVolumeTrendPct: 9.4,
      fuelCostIndex: 114.6,
      fuelCostTrendPct: 3.2,
      disruptionIncidentsCount: 1120,
      disruptionIncidentsTrendPct: -4.8,
    },
    deliveryTrends: [
      { timeLabel: 'Month 1', avgHours: 8.9, normalHours: 5.5, delayMinutes: 204 },
      { timeLabel: 'Month 2', avgHours: 8.2, normalHours: 5.5, delayMinutes: 162 },
      { timeLabel: 'Month 3', avgHours: 7.8, normalHours: 5.5, delayMinutes: 138 },
    ],
    stateVolume: [
      { state: 'Assam', freightTons: 605000, targetTons: 615000, tripsCompleted: 36600 },
      { state: 'Arunachal', freightTons: 108000, targetTons: 135000, tripsCompleted: 7950 },
      { state: 'Meghalaya', freightTons: 189000, targetTons: 198000, tripsCompleted: 13500 },
      { state: 'Manipur', freightTons: 88500, targetTons: 108000, tripsCompleted: 5850 },
      { state: 'Mizoram', freightTons: 75000, targetTons: 90000, tripsCompleted: 5250 },
      { state: 'Nagaland', freightTons: 112500, targetTons: 117000, tripsCompleted: 8340 },
      { state: 'Tripura', freightTons: 163500, targetTons: 171000, tripsCompleted: 11250 },
      { state: 'Sikkim', freightTons: 51000, targetTons: 99000, tripsCompleted: 3540 },
    ],
    disruptionHistory: [
      { timeLabel: 'Month 1', activeDisruptions: 430, totalDelayHours: 1720, resolvedCount: 405 },
      { timeLabel: 'Month 2', activeDisruptions: 385, totalDelayHours: 1480, resolvedCount: 370 },
      { timeLabel: 'Month 3', activeDisruptions: 305, totalDelayHours: 1120, resolvedCount: 298 },
    ],
    disruptionTypes: [
      { name: 'Landslides & Slips', value: 48, color: '#EF4444' },
      { name: 'Flash Floods & Waterlogging', value: 25, color: '#0284C7' },
      { name: 'Bridge & Subgrade Repair', value: 15, color: '#F59E0B' },
      { name: 'Border/Toll Congestion', value: 7, color: '#8B5CF6' },
      { name: 'Accidents / Vehicle Breakdowns', value: 5, color: '#64748B' },
    ],
    fuelImpact: [
      { corridor: 'NH-10 (Sikkim)', fuelExcessPct: 31.0, costSurchargeInr: 440000, carbonImpactKg: 14200 },
      { corridor: 'NH-13 (Tawang)', fuelExcessPct: 24.5, costSurchargeInr: 510000, carbonImpactKg: 16800 },
      { corridor: 'NH-29 (Kohima)', fuelExcessPct: 15.2, costSurchargeInr: 285000, carbonImpactKg: 9100 },
      { corridor: 'NH-6 (Shillong-Silchar)', fuelExcessPct: 11.8, costSurchargeInr: 255000, carbonImpactKg: 8000 },
      { corridor: 'NH-306 (Aizawl)', fuelExcessPct: 17.1, costSurchargeInr: 320000, carbonImpactKg: 10400 },
    ]
  }
};
