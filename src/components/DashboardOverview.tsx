import React from 'react';
import { TechnologyItem, TimeHorizon, BusinessOpportunity, FutureJob } from '../types';
import { 
  TrendingUp, 
  Zap, 
  Sparkles, 
  ShieldAlert, 
  Briefcase, 
  DollarSign, 
  Globe, 
  ArrowUpRight, 
  Award,
  ChevronRight,
  Flame
} from 'lucide-react';

interface DashboardOverviewProps {
  technologies: TechnologyItem[];
  opportunities: BusinessOpportunity[];
  jobs: FutureJob[];
  onSelectTechnology: (tech: TechnologyItem) => void;
  selectedHorizon: TimeHorizon;
  setSelectedHorizon: (h: TimeHorizon) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  technologies,
  opportunities,
  jobs,
  onSelectTechnology,
  selectedHorizon,
  setSelectedHorizon
}) => {
  // Sort technologies by overall opportunity score
  const topExploding = [...technologies].sort((a, b) => b.scores.overallOpportunityScore - a.scores.overallOpportunityScore);
  const highestGrowth = [...technologies].sort((a, b) => b.growthRate - a.growthRate);

  const horizons: { id: TimeHorizon; label: string; desc: string }[] = [
    { id: '6m', label: '6 Months', desc: 'Immediate Breakthroughs' },
    { id: '1y', label: '1 Year', desc: 'Commercial Parity' },
    { id: '3y', label: '3 Years', desc: 'Hyper-Growth Phase' },
    { id: '5y', label: '5 Years', desc: 'Mainstream Shift' },
    { id: '10y', label: '10 Years', desc: 'Ubiquitous Paradigm' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Metric Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-600/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Top Exploding Sector</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Score 96/100
            </span>
          </div>
          <p className="text-lg font-bold text-white mt-2 truncate">Agentic AI & Workflows</p>
          <div className="flex items-center space-x-2 mt-3 text-xs text-emerald-400 font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>+185.4% YoY Growth</span>
            <span className="text-slate-500 font-normal">($14.8B → $180B)</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-amber-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-600/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Weak Signals Detected</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Live Alert
            </span>
          </div>
          <p className="text-lg font-bold text-white mt-2">1,420 Weak Signals</p>
          <div className="flex items-center space-x-2 mt-3 text-xs text-amber-400 font-semibold">
            <Zap className="w-4 h-4" />
            <span>High Patent Acceleration</span>
            <span className="text-slate-500 font-normal">in BCI & Fusion</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-600/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Highest Demand Future Job</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              98% Growth Prob
            </span>
          </div>
          <p className="text-lg font-bold text-white mt-2 truncate">Agentic AI Architect</p>
          <div className="flex items-center space-x-2 mt-3 text-xs text-emerald-400 font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>$180k - $340k Salary</span>
            <span className="text-slate-500 font-normal">(85% Remote)</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-purple-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-600/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">VC Capital Concentration</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              $25.1B YTD
            </span>
          </div>
          <p className="text-lg font-bold text-white mt-2">DeepTech Infrastructure</p>
          <div className="flex items-center space-x-2 mt-3 text-xs text-purple-400 font-semibold">
            <DollarSign className="w-4 h-4" />
            <span>+215% YoY VC Flow</span>
            <span className="text-slate-500 font-normal">(Top: SF, Shenzhen)</span>
          </div>
        </div>
      </div>

      {/* Time Horizon Selector Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>MULTI-HORIZON MARKET PREDICTOR</span>
          </h2>
          <p className="text-xs text-slate-400">Select forecast timeframe to adjust CAGR projections and disruption risk ratings</p>
        </div>
        <div className="flex space-x-2 overflow-x-auto w-full md:w-auto">
          {horizons.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHorizon(h.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedHorizon === h.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-indigo-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <div className="font-bold">{h.label}</div>
              <div className="text-[9px] opacity-75">{h.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Top Exploding Technologies */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span>Top 5 High Potential Technologies ({selectedHorizon} Forecast)</span>
            </h3>
            <span className="text-xs text-indigo-400 cursor-pointer hover:underline flex items-center">
              View all 35+ <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>

          <div className="space-y-3">
            {topExploding.slice(0, 5).map((tech) => {
              const forecast = tech.horizonForecasts[selectedHorizon];
              return (
                <div
                  key={tech.id}
                  onClick={() => onSelectTechnology(tech)}
                  className="glass-card p-5 rounded-2xl cursor-pointer hover:border-indigo-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                        {tech.category}
                      </span>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center">
                        <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                        {tech.predictedCAGR}% CAGR
                      </span>
                      <span className="text-xs text-slate-400">• TRL: {tech.maturityLevel.split(' ')[0]}</span>
                    </div>
                    <h4 className="text-base font-bold text-white hover:text-indigo-300 transition-colors">
                      {tech.technologyName}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2">{tech.description}</p>
                  </div>

                  <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Est. Size ({selectedHorizon})</div>
                      <div className="text-base font-bold text-indigo-300">{forecast.expectedMarketSize}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Stage: <strong className="text-slate-200">{forecast.adoptionStage}</strong>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-indigo-500/30 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-slate-400">Score</span>
                      <span className="text-sm font-bold text-indigo-400">{tech.scores.overallOpportunityScore}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Column: Startup Opportunities & Weak Signals Panel */}
        <div className="space-y-6">
          {/* Business Opportunities Matrix Card */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Top Startup Opportunity</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                88% Unicorn Prob
              </span>
            </h3>

            {opportunities.length > 0 && (
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-950 text-indigo-400">
                  {opportunities[0].category}
                </span>
                <h4 className="text-sm font-bold text-white">{opportunities[0].title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2">{opportunities[0].problemStatement}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>ROI: <strong className="text-emerald-400">{opportunities[0].roiPotential}</strong></span>
                  <span>Model: <strong>{opportunities[0].businessModel}</strong></span>
                </div>
              </div>
            )}
          </div>

          {/* Weak Signal Feed */}
          <div className="glass-panel p-5 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Real-Time Weak Signal Radar</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-200">
                <span className="font-bold text-amber-400">[Patent Surge]</span> Sub-milliwatt neuromorphic processing units on microcontrollers (+140% YoY).
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-800/40 text-indigo-200">
                <span className="font-bold text-indigo-400">[arXiv Paper Cluster]</span> Non-surgical endovascular BCI electrode placement clinical trial success.
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                <span className="font-bold text-emerald-400">[GitHub Velocity]</span> 310% star increase for open-source multi-agent execution frameworks.
              </div>
            </div>
          </div>

          {/* Innovation Hotspots */}
          <div className="glass-panel p-5 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Global Innovation Hotspots</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                <span>San Francisco</span>
                <strong className="text-indigo-400">99/100</strong>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                <span>Shenzhen</span>
                <strong className="text-indigo-400">95/100</strong>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                <span>London</span>
                <strong className="text-indigo-400">91/100</strong>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                <span>Munich</span>
                <strong className="text-indigo-400">89/100</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
