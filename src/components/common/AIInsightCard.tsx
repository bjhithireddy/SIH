import React from 'react';
import { AIInsight } from '../../types';
import { AIBadge } from './AIBadge';
import { Sparkles, ArrowRight, ShieldCheck, Check, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AIInsightCardProps {
  insight: AIInsight;
  onAction?: (id: string) => void;
  onViewAnalysis?: (insight: AIInsight) => void;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  insight,
  onAction,
  onViewAnalysis,
}) => {
  const { addToast } = useToast();

  const handleActionClick = () => {
    if (onAction) {
      onAction(insight.id);
    }
    addToast(
      'Operational Action Triggered',
      `Command dispatched: "${insight.recommendedAction}" for ${insight.state}`,
      'success'
    );
  };

  const getImpactColor = (impact: AIInsight['impact']) => {
    switch (impact) {
      case 'Critical':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'High':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Low':
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className={`bg-white rounded-lg border p-5 shadow-card transition-all duration-200 ${
      insight.status === 'actioned'
        ? 'border-emerald-200 bg-emerald-50/20'
        : 'border-slate-200/90 hover:border-govblue-300 hover:shadow-elevated'
    }`}>
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-mono text-govblue-700 bg-govblue-50 px-2 py-0.5 rounded border border-govblue-200">
            {insight.insightNumber}
          </span>
          <AIBadge label={insight.category} size="sm" />
          <span className="text-xs font-semibold text-slate-600">
            • {insight.state}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {insight.timestamp}
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getImpactColor(insight.impact)}`}>
            {insight.impact} Impact
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="my-3.5">
        <h3 className="text-base font-bold text-navy-950 flex items-start gap-1.5">
          {insight.title}
        </h3>
        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
          {insight.description}
        </p>
      </div>

      {/* Metrics Row: Probability & Confidence & Gain */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 mb-3.5 text-xs">
        <div>
          <div className="text-slate-500 text-[11px] font-medium">Disruption Probability</div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  insight.probability > 75 ? 'bg-rose-500' : insight.probability > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${insight.probability}%` }}
              />
            </div>
            <span className="font-bold text-navy-900 font-mono">{insight.probability}%</span>
          </div>
        </div>

        <div>
          <div className="text-slate-500 text-[11px] font-medium">AI Model Confidence</div>
          <div className="font-bold text-navy-900 mt-0.5 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-govblue-600" />
            <span>{insight.confidence}% calibrated</span>
          </div>
        </div>

        {insight.expectedImprovement && (
          <div>
            <div className="text-slate-500 text-[11px] font-medium">Mitigation Target</div>
            <div className="font-bold text-emerald-700 mt-0.5 truncate">
              {insight.expectedImprovement}
            </div>
          </div>
        )}
      </div>

      {/* Recommended Action Section */}
      <div className="bg-govblue-50/60 rounded-md p-3 border border-govblue-100 mb-4 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-govblue-700 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-bold text-govblue-900 uppercase tracking-wider">Recommended Action</div>
          <div className="text-xs text-navy-900 font-medium mt-0.5 leading-normal">
            “{insight.recommendedAction}”
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
        {onViewAnalysis ? (
          <button
            onClick={() => onViewAnalysis(insight)}
            className="text-xs font-semibold text-govblue-700 hover:text-govblue-900 flex items-center gap-1 hover:underline"
          >
            <span>View Predictive Telemetry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="text-xs text-slate-400">
            {insight.corridor ? `Corridor: ${insight.corridor}` : 'Regional Scope'}
          </div>
        )}

        <div>
          {insight.status === 'actioned' ? (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <Check className="w-3.5 h-3.5" />
              Action Dispatched
            </span>
          ) : (
            <button
              onClick={handleActionClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-navy-900 hover:bg-govblue-700 active:bg-govblue-800 transition-colors shadow-subtle"
            >
              <span>Execute Action</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
