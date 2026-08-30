import React, { useState } from 'react';
import { RouteSearchForm } from '../components/route/RouteSearchForm';
import { RouteCard } from '../components/common/RouteCard';
import { AIExplanationCard } from '../components/route/AIExplanationCard';
import { AIBadge } from '../components/common/AIBadge';
import { DEFAULT_ROUTE_SEARCHES } from '../data/routeOptionsData';
import { AIAnalysisResult, RouteOption } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Fuel, 
  ArrowRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const RouteIntelligencePage: React.FC = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState<AIAnalysisResult>(
    DEFAULT_ROUTE_SEARCHES['Guwahati-Tawang']
  );
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(
    DEFAULT_ROUTE_SEARCHES['Guwahati-Tawang'].routes[1] // Route B recommended
  );
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { addToast } = useToast();

  const handleAnalyze = ({ origin, destination, vehicle, cargo }: { origin: string; destination: string; vehicle: string; cargo: string }) => {
    setIsLoading(true);
    addToast('Neural Search Initialized', `Analyzing terrain, rainfall telemetry, and chokepoints between ${origin} and ${destination}...`, 'info');

    setTimeout(() => {
      const key = `${origin}-${destination}`;
      if (DEFAULT_ROUTE_SEARCHES[key]) {
        const res = DEFAULT_ROUTE_SEARCHES[key];
        setCurrentAnalysis({ ...res, vehicleType: vehicle, cargoType: cargo });
        setSelectedRoute(res.routes.find((r) => r.isRecommended) || res.routes[0]);
      } else {
        const synthesized: AIAnalysisResult = {
          origin,
          destination,
          vehicleType: vehicle,
          cargoType: cargo,
          primaryRoute: {
            distanceKm: 380,
            estimatedTime: '8h 40m',
            fuelEstimateLiters: 135,
            accessibilityScore: 71,
            riskScore: 54,
          },
          recommendedRouteId: 'route-b',
          routes: [
            {
              id: 'route-a',
              code: 'A',
              name: `Route A — Direct Express Corridor (${origin} → ${destination})`,
              tag: 'Fastest',
              isRecommended: false,
              distanceKm: 380,
              timeStr: '8h 15m',
              timeMinutes: 495,
              delayMinutes: 45,
              riskLevel: 'high',
              riskScore: 74,
              accessibilityScore: 68,
              estimatedFuelLiters: 135,
              estimatedCostInr: 15400,
              reason: 'Direct national highway alignment with 2 minor slope warning zones.',
              viaCities: [origin, 'Transit Gate A', 'Midway Pass', destination],
              pros: ['Shortest direct route', 'Minimum tolls'],
              cons: ['Moderate rockfall hazard', 'Single bridge speed regulation'],
              coordinates: [
                [26.1445, 91.7362],
                [26.6338, 92.7926],
                [27.0125, 92.6514],
                [27.5861, 91.8594]
              ]
            },
            {
              id: 'route-b',
              code: 'B',
              name: `Route B — AI Recommended Ridge Bypass`,
              tag: 'Recommended',
              isRecommended: true,
              distanceKm: 405,
              timeStr: '8h 35m',
              timeMinutes: 515,
              delayMinutes: 15,
              riskLevel: 'moderate',
              riskScore: 36,
              accessibilityScore: 88,
              estimatedFuelLiters: 142,
              estimatedCostInr: 16100,
              reason: 'Engineered bypass maintaining 88% continuous accessibility and avoiding all flood plains.',
              viaCities: [origin, 'Valley Bypass', 'High Ridge Highway', destination],
              pros: ['Low landslide probability (under 18%)', 'Full 4G/5G communications coverage', 'Emergency tow stations operational'],
              cons: ['+25 km additional route length'],
              coordinates: [
                [26.1445, 91.7362],
                [26.4400, 92.0300],
                [27.1200, 92.2700],
                [27.5861, 91.8594]
              ]
            },
            {
              id: 'route-c',
              code: 'C',
              name: `Route C — Heavy Industrial & Convoy Safe Axis`,
              tag: 'Safest',
              isRecommended: false,
              distanceKm: 440,
              timeStr: '9h 50m',
              timeMinutes: 590,
              delayMinutes: 10,
              riskLevel: 'low',
              riskScore: 20,
              accessibilityScore: 94,
              estimatedFuelLiters: 158,
              estimatedCostInr: 17800,
              reason: 'Multi-lane heavy freight corridor with gentle mountain grade (max 4.5%).',
              viaCities: [origin, 'Southern Logistics Arc', 'Interstate Link', destination],
              pros: ['Lowest risk index (20/100)', 'Class 70R bridge safety rating'],
              cons: ['+60 km detour', '+1h 35m longer duration'],
              coordinates: [
                [26.1445, 91.7362],
                [26.5500, 92.4500],
                [27.0200, 92.1600],
                [27.5861, 91.8594]
              ]
            }
          ],
          aiExplanation: {
            title: `Why AI Recommends Route B for ${origin} → ${destination}`,
            summary: `Model evaluated 14 active geological sensors, 24h satellite rainfall forecasts, and road subgrade indices. Route B minimizes vulnerability by 54% while adding only 20 minutes to normal schedule.`,
            factors: [
              {
                title: 'Lower Landslide Exposure',
                description: 'Circumvents vulnerable shale cuts and high-seepage mountain slopes.',
                weight: 40,
                status: 'positive'
              },
              {
                title: 'Better Road Accessibility',
                description: 'Pavement condition index rated at 8.8/10 with recently reinforced retaining walls.',
                weight: 25,
                status: 'positive'
              },
              {
                title: 'Moderate Traffic & Checkpoint Flow',
                description: 'Minimal commercial queuing at interstate checkpoints along this link.',
                weight: 20,
                status: 'positive'
              },
              {
                title: 'Higher Reliability',
                description: 'Historical 92% on-time completion record in monsoon conditions.',
                weight: 15,
                status: 'positive'
              }
            ],
            confidence: 88,
            modelGeneratedTimestamp: 'Just now'
          }
        };
        setCurrentAnalysis(synthesized);
        setSelectedRoute(synthesized.routes[1]);
      }

      setIsLoading(false);
      addToast('Route Optimization Complete', `Generated 3 alternative corridor strategies for ${origin} → ${destination}`, 'success');
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('routes.title', 'AI Route Intelligence Engine')}
            </h1>
            <AIBadge label="Multi-Factor Routing" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('routes.subtitle', 'Dynamic corridor optimization factoring elevation, monsoonal soil saturation, bridge tonnage, and real-time bottlenecks.')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-card">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Active Model: <strong>NER-GeoNeuro v2.6</strong></span>
        </div>
      </div>

      {/* Query Search Form */}
      <RouteSearchForm onAnalyze={handleAnalyze} isLoading={isLoading} />

      {/* Primary Route Summary Card */}
      <div className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              {t('routes.primaryTitle', 'Direct Primary Baseline Corridor')}
            </span>
            <span className="text-xs font-bold text-navy-950">
              ({currentAnalysis.origin} → {currentAnalysis.destination})
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Cargo: <strong className="text-navy-900">{currentAnalysis.cargoType}</strong> • Vehicle: <strong className="text-navy-900">{currentAnalysis.vehicleType}</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-slate-500 text-[11px] font-medium">{t('map.distance', 'Distance')}</div>
            <div className="text-lg font-black text-navy-950 mt-0.5 font-mono">
              {currentAnalysis.primaryRoute.distanceKm} km
            </div>
            <div className="text-[10px] text-slate-400">Baseline Distance</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-slate-500 text-[11px] font-medium">{t('map.estTime', 'Est. Travel Time')}</div>
            <div className="text-lg font-black text-navy-950 mt-0.5 font-mono">
              {currentAnalysis.primaryRoute.estimatedTime}
            </div>
            <div className="text-[10px] text-amber-700 font-medium">Incl. active bottlenecks</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-slate-500 text-[11px] font-medium">Fuel Estimate</div>
            <div className="text-lg font-black text-navy-950 mt-0.5 font-mono">
              ~{currentAnalysis.primaryRoute.fuelEstimateLiters} L
            </div>
            <div className="text-[10px] text-slate-400">High mountain burn</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-slate-500 text-[11px] font-medium">{t('nav.accessibility', 'Accessibility Score')}</div>
            <div className="text-lg font-black text-navy-950 mt-0.5 font-mono">
              {currentAnalysis.primaryRoute.accessibilityScore}%
            </div>
            <div className="text-[10px] text-slate-400">Roadbed integrity</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-slate-500 text-[11px] font-medium">Hazard Risk Score</div>
            <div className="text-lg font-black text-rose-600 mt-0.5 font-mono">
              {currentAnalysis.primaryRoute.riskScore}/100
            </div>
            <div className="text-[10px] text-rose-600 font-semibold">{t('map.highRisk', 'Elevated hazard')}</div>
          </div>
        </div>
      </div>

      {/* Alternative Routes Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-navy-950">
              {t('routes.alternativesTitle', 'Alternative Route Strategies (3 AI Evaluated Options)')}
            </h2>
            <span className="text-xs text-slate-500 hidden sm:inline">
              • Click any route card to select and review
            </span>
          </div>
          <span className="text-xs font-semibold text-govblue-700">
            Selected: <strong className="font-mono">Route {selectedRoute.code}</strong> ({selectedRoute.tag})
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {currentAnalysis.routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              isSelected={selectedRoute.id === route.id}
              onSelect={(r) => {
                setSelectedRoute(r);
                addToast('Corridor Selected', `Set active navigation route to Route ${r.code} (${r.tag})`, 'info');
              }}
            />
          ))}
        </div>
      </div>

      {/* Dedicated AI Explanation Panel */}
      <AIExplanationCard
        explanation={currentAnalysis.aiExplanation}
        recommendedRouteName={selectedRoute.name}
      />
    </div>
  );
};
