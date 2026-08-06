import React from 'react';
import { BusinessOpportunity } from '../types';
import { 
  Lightbulb, 
  Award, 
  Target, 
  Zap, 
  Layers, 
  DollarSign, 
  Building2, 
  Code, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';

interface BusinessOpportunityDashboardProps {
  opportunities: BusinessOpportunity[];
}

export const BusinessOpportunityDashboard: React.FC<BusinessOpportunityDashboardProps> = ({ opportunities }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span>BUSINESS OPPORTUNITY & STARTUP ENGINE</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Discover underserved market gaps, high ROI SaaS opportunities, B2B AI agent concepts, and deeptech startup ideas.
          </p>
        </div>
        <div className="flex space-x-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-amber-950 text-amber-300 border border-amber-800">
            Unicorn Probability Matrix Active
          </div>
        </div>
      </div>

      {/* Opportunity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                {opp.category}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-400">Unicorn Prob.</span>
                <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                  {opp.unicornProbability}%
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{opp.title}</h3>
              <div className="flex items-center space-x-3 mt-1 text-xs text-slate-400 font-mono">
                <span>Model: <strong className="text-indigo-300">{opp.businessModel}</strong></span>
                <span>ROI: <strong className="text-emerald-400">{opp.roiPotential}</strong></span>
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="space-y-3 pt-2">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Market Gap / Unmet Problem
                </span>
                <p className="text-xs text-slate-300">{opp.problemStatement}</p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Proposed Product & AI Architecture
                </span>
                <p className="text-xs text-slate-300">{opp.proposedSolution}</p>
              </div>
            </div>

            {/* Underserved Needs & Recommended Stack */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400">Underserved Key Capabilities:</h4>
              <div className="flex flex-wrap gap-1.5">
                {opp.underservedNeeds.map((need) => (
                  <span key={need} className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-900 text-slate-300 border border-slate-800">
                    • {need}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack & Competitors */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">Recommended Stack</span>
                <p className="text-indigo-300 font-medium truncate">{opp.recommendedTechStack.join(', ')}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">Existing Competitors</span>
                <p className="text-slate-300 truncate">{opp.keyCompetitors.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
