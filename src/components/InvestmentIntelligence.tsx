import React from 'react';
import { InvestmentTrend } from '../types';
import { 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Globe, 
  Award, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface InvestmentIntelligenceProps {
  investmentTrends: InvestmentTrend[];
}

export const InvestmentIntelligence: React.FC<InvestmentIntelligenceProps> = ({ investmentTrends }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>VENTURE CAPITAL & INVESTMENT INTELLIGENCE</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracking global capital deployment, sovereign grants, corporate M&A, top investable startups, and IPO pipeline readiness.
          </p>
        </div>
        <div className="flex space-x-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-800">
            Total Ingested VC Data: <strong>$25.1B YTD</strong>
          </div>
        </div>
      </div>

      {/* Investment Sectors List */}
      <div className="space-y-6">
        {investmentTrends.map((trend) => (
          <div key={trend.id} className="glass-panel p-6 rounded-2xl space-y-6">
            {/* Sector Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800">
                  Sector Overview
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{trend.sectorName}</h3>
              </div>

              <div className="flex items-center space-x-4 text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Total Capital YTD</span>
                  <span className="text-base font-bold text-emerald-400">{trend.totalFundingYTD}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">YoY Growth</span>
                  <span className="text-base font-bold text-indigo-400">+{trend.vcGrowthRateYoY}%</span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Gov Grants Volume</span>
                <strong className="text-slate-200 text-sm">{trend.governmentGrantsVolume}</strong>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Corporate M&A Volume</span>
                <strong className="text-slate-200 text-sm">{trend.corporateMnaVolume}</strong>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Angel Activity Index</span>
                <strong className="text-amber-400 text-sm">{trend.angelActivityScore}/100</strong>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">IPO Potential Score</span>
                <strong className="text-indigo-400 text-sm">{trend.ipoPotentialScore}/100</strong>
              </div>
            </div>

            {/* Top Investable Startups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Most Investable High-Growth Startups</span>
                </h4>
                <div className="space-y-2">
                  {trend.topInvestableStartups.map((s) => (
                    <div key={s.name} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white text-sm">{s.name}</div>
                        <div className="text-[10px] text-slate-400">Lead: <strong className="text-slate-200">{s.leadInvestors}</strong></div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-300">{s.valuation}</div>
                        <div className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/60 inline-block mt-0.5">
                          {s.stage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emerging Hubs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Emerging Innovation Hubs</span>
                </h4>
                <div className="space-y-2">
                  {trend.emergingHubs.map((hub) => (
                    <div key={hub.city} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{hub.city}</div>
                        <div className="text-[10px] text-slate-400">{hub.country}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-mono">Ecosystem Score</span>
                        <span className="font-bold text-cyan-400">{hub.ecosystemScore}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
