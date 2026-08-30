import { ReportItem } from '../types';

export const REPORTS_DATA: ReportItem[] = [
  {
    id: 'rep-01',
    title: 'Daily NE Logistics Situation Report (SITREP - 0829)',
    category: 'Daily SITREP',
    description: 'Comprehensive 24-hour summary of highway operational status, active landslide blocks, border clearance metrics, and POL fuel supply movements across all 8 NE states.',
    frequency: 'Daily',
    lastGenerated: 'Today, 06:00 AM',
    fileSize: '4.2 MB',
    scope: 'All 8 North Eastern States'
  },
  {
    id: 'rep-02',
    title: 'Weekly Regional Accessibility & Bottleneck Audit',
    category: 'Accessibility Audit',
    description: 'Statistical analysis of district-level supply isolation risk, bridge load limits, railhead throughput, and critical infrastructure reach times during peak monsoon.',
    frequency: 'Weekly',
    lastGenerated: '28 Aug 2026',
    fileSize: '8.7 MB',
    scope: 'North Eastern Council (NEC) Jurisdiction'
  },
  {
    id: 'rep-03',
    title: 'High-Risk Himalayan Corridor Vulnerability Assessment',
    category: 'Corridor Risk',
    description: 'Deep-dive geotechnical and AI hazard analysis for NH-10 (Sikkim), NH-13 (Arunachal), and NH-29 (Nagaland-Manipur) identifying 14 critical fault zones.',
    frequency: 'On-Demand',
    lastGenerated: '27 Aug 2026',
    fileSize: '12.4 MB',
    scope: 'Strategic Military & Freight Corridors'
  },
  {
    id: 'rep-04',
    title: 'State-wise PDS & Foodgrain Supply Chain Reliability',
    category: 'State Performance',
    description: 'Evaluation of Food Corporation of India (FCI) buffer stock levels, distribution transit delays, and isolated district buffer capacities in Mizoram and Arunachal.',
    frequency: 'Weekly',
    lastGenerated: '25 Aug 2026',
    fileSize: '6.1 MB',
    scope: 'Civil Supplies & Disaster Management'
  },
  {
    id: 'rep-05',
    title: 'Monsoon Disruption & Alternate Route Efficiency Report',
    category: 'Disruption Assessment',
    description: 'Comparative benchmark between primary arterial routes and secondary bypasses evaluating fuel burn penalty, vehicle wear, and delay mitigation percentages.',
    frequency: 'Monthly',
    lastGenerated: '20 Aug 2026',
    fileSize: '15.8 MB',
    scope: 'Ministry of MoRTH & State PWDs'
  }
];
