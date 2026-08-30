import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { FilterBar } from '../components/common/FilterBar';
import { AIInsightCard } from '../components/common/AIInsightCard';
import { Modal } from '../components/common/Modal';
import { AIBadge } from '../components/common/AIBadge';
import { AIInsight } from '../types';
import { 
  Sparkles, 
  BrainCircuit, 
  ShieldCheck, 
  Send, 
  Cpu
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const AIInsightsPage: React.FC = () => {
  const { selectedState, insights, actionInsight, searchQuery } = useAppState();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalInsight, setActiveModalInsight] = useState<AIInsight | null>(null);
  const { addToast } = useToast();

  const categories = [
    'All',
    'Disruption Prediction',
    'Route Optimization',
    'Accessibility Alert',
    'Infrastructure Risk',
  ];

  const filteredInsights = insights.filter((ins) => {
    const matchesState = selectedState === 'All' || ins.state === selectedState;
    const matchesSearch = !searchQuery || ins.title.toLowerCase().includes(searchQuery.toLowerCase()) || ins.description.toLowerCase().includes(searchQuery.toLowerCase()) || ins.recommendedAction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || ins.category === selectedCategory;
    return matchesState && matchesSearch && matchesCat;
  });

  const handleModalDispatchAction = () => {
    if (activeModalInsight) {
      actionInsight(activeModalInsight.id);
      addToast('Directive Dispatched', `Autonomous action issued to regional logistics unit for ${activeModalInsight.state}`, 'success');
      setActiveModalInsight(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-950 font-sans tracking-tight">
              {t('ai.title', 'AI Logistics Intelligence Engine')}
            </h1>
            <AIBadge label="Neural Explainability" size="sm" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('ai.subtitle', 'Real-time causal disruption forecasts, corridor optimizations, and automated decision directives.')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Telemetry Refresh: <strong>Every 30s</strong></span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        showTimeframe={false}
        showSearch={true}
        showStateSelect={true}
        extraControls={
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs text-navy-900">
            <span className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider hidden sm:inline">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent font-bold text-navy-900 focus:outline-none cursor-pointer pr-1 text-xs"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        }
      />

      {/* AI Intelligence Architecture Overview Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-xl border border-navy-800 p-5 shadow-elevated">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-navy-800 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-govblue-600/30 border border-govblue-400 text-sky-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-sans">
                {t('ai.bannerTitle', 'Predictive Autonomous Operations Stream')}
              </h2>
              <p className="text-xs text-slate-300">
                Synthesizing IMD satellite rainfall telemetry, soil saturation arrays, and GPS convoy breadcrumbs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-navy-800 px-2.5 py-1 rounded border border-navy-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Mean Calibration Accuracy: 91.4%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-navy-900/70 rounded-lg border border-navy-800">
            <div className="text-slate-400 text-[11px]">Disruption Lead Time</div>
            <div className="text-xl font-bold text-sky-400 font-mono mt-0.5">24 – 48 Hours</div>
            <div className="text-[10px] text-slate-400">Advance warning horizon</div>
          </div>

          <div className="p-3 bg-navy-900/70 rounded-lg border border-navy-800">
            <div className="text-slate-400 text-[11px]">Delay Mitigation Ratio</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">38.2% Saved</div>
            <div className="text-[10px] text-slate-400">Across rerouted convoys</div>
          </div>

          <div className="p-3 bg-navy-900/70 rounded-lg border border-navy-800">
            <div className="text-slate-400 text-[11px]">Active Neural Rules</div>
            <div className="text-xl font-bold text-white font-mono mt-0.5">142 Heuristics</div>
            <div className="text-[10px] text-slate-400">Active regional weights</div>
          </div>
        </div>
      </div>

      {/* Grid of AI Insight Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
            {t('ai.rankedTitle', 'Ranked Operational Intelligence Insights')} ({filteredInsights.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">Sorted by Probability & Severity</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredInsights.map((ins) => (
            <AIInsightCard
              key={ins.id}
              insight={ins}
              onAction={actionInsight}
              onViewAnalysis={(i) => setActiveModalInsight(i)}
            />
          ))}
        </div>
      </div>

      {/* Detailed Analysis Modal */}
      {activeModalInsight && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModalInsight(null)}
          title={`Predictive Telemetry Breakdown: ${activeModalInsight.insightNumber}`}
          subtitle={`${activeModalInsight.title} (${activeModalInsight.state})`}
          maxWidth="2xl"
          footer={
            <>
              <button
                onClick={() => setActiveModalInsight(null)}
                className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                {t('common.close', 'Close')}
              </button>
              <button
                onClick={handleModalDispatchAction}
                className="px-4 py-1.5 rounded-md text-xs font-semibold text-white bg-navy-900 hover:bg-govblue-700 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('ai.executeAction', 'Authorize & Dispatch Directive')}</span>
              </button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Contextual Description
              </div>
              <p className="text-slate-700 leading-relaxed text-xs">{activeModalInsight.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono">
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                <div className="text-rose-700 text-[10px] uppercase font-sans font-semibold">Disruption Risk</div>
                <div className="text-xl font-bold text-rose-800 mt-0.5">{activeModalInsight.probability}%</div>
              </div>
              <div className="p-3 rounded-lg bg-govblue-50 border border-govblue-200">
                <div className="text-govblue-700 text-[10px] uppercase font-sans font-semibold">AI Confidence</div>
                <div className="text-xl font-bold text-govblue-900 mt-0.5">{activeModalInsight.confidence}%</div>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="text-emerald-700 text-[10px] uppercase font-sans font-semibold">Impact Scale</div>
                <div className="text-xl font-bold text-emerald-800 mt-0.5">{activeModalInsight.impact}</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-govblue-50 border border-govblue-200 text-xs">
              <div className="font-bold text-govblue-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-govblue-700" />
                <span>{t('map.aiRecommendation', 'Prescriptive Action Rationale')}</span>
              </div>
              <p className="text-navy-950 font-medium">“{activeModalInsight.recommendedAction}”</p>
              {activeModalInsight.expectedImprovement && (
                <div className="text-emerald-700 font-semibold mt-2 pt-2 border-t border-govblue-200/80">
                  Target Outcome: {activeModalInsight.expectedImprovement}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
