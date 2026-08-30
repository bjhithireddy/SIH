import React from 'react';
import { AIAnalysisResult } from '../../types';
import { AIBadge } from '../common/AIBadge';
import { Sparkles, ShieldCheck, CheckCircle2, Info, BrainCircuit } from 'lucide-react';

interface AIExplanationCardProps {
  explanation: AIAnalysisResult['aiExplanation'];
  recommendedRouteName: string;
}

export const AIExplanationCard: React.FC<AIExplanationCardProps> = ({
  explanation,
  recommendedRouteName,
}) => {
  return (
    <div className="bg-gradient-to-br from-navy-900 via-navy-900 to-navy-950 text-white rounded-lg border border-navy-800 p-6 shadow-elevated mb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-navy-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-govblue-600/30 border border-govblue-400/40 text-govblue-300">
            <BrainCircuit className="w-5 h-5 text-sky-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-sans">
                {explanation.title}
              </h3>
              <AIBadge label="Multi-Factor Heuristic" size="sm" />
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Automated ranking evaluated against {explanation.factors.length} spatial risk variables
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-navy-800 border border-navy-700 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Confidence: {explanation.confidence}%</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            {explanation.modelGeneratedTimestamp}
          </span>
        </div>
      </div>

      {/* Summary Rationale */}
      <div className="my-4 p-4 rounded-lg bg-navy-800/60 border border-navy-700/80 text-xs leading-relaxed text-slate-200">
        <div className="font-bold text-sky-400 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Strategic Recommendation Synthesis</span>
        </div>
        {explanation.summary}
      </div>

      {/* 4 Factor Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
        {explanation.factors.map((factor, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-lg bg-navy-950/80 border border-navy-800 hover:border-govblue-500/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{factor.title}</span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-govblue-950 text-sky-300 border border-govblue-800">
                Weight: {factor.weight}%
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-normal mb-2">
              {factor.description}
            </p>

            <div className="w-full bg-navy-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${Math.min(factor.weight * 2.5, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Operational Note */}
      <div className="mt-4 pt-3 border-t border-navy-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          <span>Continuous retraining active with satellite radar soil moisture & IMD rain data</span>
        </div>
        <span className="font-mono text-slate-500 text-[11px]">NE-LogiAI Neural v2.6.4</span>
      </div>
    </div>
  );
};
