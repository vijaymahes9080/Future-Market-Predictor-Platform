import React, { useState } from 'react';
import { TechnologyItem, TechnologyCategory, TimeHorizon } from '../types';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Award, 
  Building2, 
  GraduationCap, 
  Users, 
  DollarSign, 
  ExternalLink, 
  X, 
  BrainCircuit, 
  ShieldAlert, 
  CheckCircle2,
  BarChart3,
  FileCode,
  Globe
} from 'lucide-react';

interface TechExplorerProps {
  technologies: TechnologyItem[];
  searchQuery: string;
  selectedTech: TechnologyItem | null;
  setSelectedTech: (tech: TechnologyItem | null) => void;
}

export const TechExplorer: React.FC<TechExplorerProps> = ({
  technologies,
  searchQuery,
  selectedTech,
  setSelectedTech
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedHorizon, setSelectedHorizon] = useState<TimeHorizon>('3y');
  const [sortBy, setSortBy] = useState<'score' | 'cagr' | 'growth' | 'funding'>('score');

  const categories = ['All', ...Array.from(new Set(technologies.map(t => t.category)))];

  const filteredTechs = technologies
    .filter(t => {
      const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        t.technologyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.scores.overallOpportunityScore - a.scores.overallOpportunityScore;
      if (sortBy === 'cagr') return b.predictedCAGR - a.predictedCAGR;
      if (sortBy === 'growth') return b.growthRate - a.growthRate;
      if (sortBy === 'funding') return b.scores.fundingScore - a.scores.fundingScore;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <span className="text-xs text-slate-400 whitespace-nowrap">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="glass-input text-xs px-3 py-1.5 rounded-xl text-slate-200"
          >
            <option value="score">Opportunity Score</option>
            <option value="cagr">Predicted CAGR</option>
            <option value="growth">YoY Growth Rate</option>
            <option value="funding">VC Funding Score</option>
          </select>
        </div>
      </div>

      {/* Technology Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechs.map((tech) => {
          const forecast = tech.horizonForecasts[selectedHorizon];
          return (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(tech)}
              className="glass-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between hover:border-indigo-500/50 transition-all space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
                    {tech.category}
                  </span>
                  <div className="flex items-center space-x-1 bg-slate-900 px-2 py-0.5 rounded border border-indigo-500/30">
                    <span className="text-[10px] text-slate-400">Score</span>
                    <span className="text-xs font-bold text-indigo-400">{tech.scores.overallOpportunityScore}/100</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mt-3 group-hover:text-indigo-300 transition-colors">
                  {tech.technologyName}
                </h3>
                <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400">CAGR Proj.</div>
                    <div className="font-bold text-emerald-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{tech.predictedCAGR}%
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400">Est ({selectedHorizon})</div>
                    <div className="font-bold text-indigo-300">{forecast.expectedMarketSize}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Confidence: <strong className="text-slate-200">{tech.confidencePercentage}%</strong></span>
                  <span className="text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center">
                    Deep Dive <ExternalLink className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Deep-Dive Window */}
      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border border-indigo-500/30 relative shadow-2xl">
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-950 text-indigo-400 border border-indigo-800">
                  {selectedTech.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {selectedTech.id}</span>
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Recommendation: {selectedTech.investmentRecommendation}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedTech.technologyName}</h2>
              <p className="text-sm text-slate-300">{selectedTech.description}</p>
            </div>

            {/* 14 Scores Grid */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <span>14-Factor Multi-Dimensional Score Matrix</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {Object.entries(selectedTech.scores).map(([key, val]) => (
                  <div key={key} className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase truncate font-mono">
                      {key.replace('Score', '')}
                    </div>
                    <div className={`text-base font-bold mt-0.5 ${val > 90 ? 'text-indigo-400' : val > 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Rates & Projections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Growth Velocity Metrics (% YoY)</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                    <span>GitHub Dev Activity Growth</span>
                    <strong className="text-indigo-400">+{selectedTech.gitHubGrowth}%</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                    <span>Patent Filings Velocity</span>
                    <strong className="text-indigo-400">+{selectedTech.patentGrowth}%</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                    <span>Academic Papers Growth</span>
                    <strong className="text-indigo-400">+{selectedTech.researchGrowth}%</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                    <span>VC Capital Inflow Growth</span>
                    <strong className="text-emerald-400">+{selectedTech.fundingGrowth}%</strong>
                  </div>
                </div>
              </div>

              {/* Multi-Horizon Projections */}
              <div className="glass-card p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span>Multi-Horizon Forecasts</span>
                </h3>
                <div className="space-y-2 text-xs">
                  {Object.entries(selectedTech.horizonForecasts).map(([hKey, hVal]) => (
                    <div key={hKey} className="flex items-center justify-between p-2 bg-slate-900 rounded-lg">
                      <span className="font-bold text-indigo-300 uppercase">{hKey}:</span>
                      <span>Market: <strong className="text-slate-100">{hVal.expectedMarketSize}</strong></span>
                      <span>Disruption: <strong className="text-amber-400">{hVal.disruptionPotential}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Entities Ecosystem */}
            <div className="glass-card p-5 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-white">Ecosystem Leaders</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <h4 className="font-semibold text-indigo-400 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> Major Companies
                  </h4>
                  <ul className="space-y-1 text-slate-300">
                    {selectedTech.majorCompanies.map(c => <li key={c}>• {c}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Leading Startups
                  </h4>
                  <ul className="space-y-1 text-slate-300">
                    {selectedTech.leadingStartups.map(s => <li key={s}>• {s}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> Key Investors
                  </h4>
                  <ul className="space-y-1 text-slate-300">
                    {selectedTech.keyInvestors.map(i => <li key={i}>• {i}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> Top Universities
                  </h4>
                  <ul className="space-y-1 text-slate-300">
                    {selectedTech.leadingUniversities.map(u => <li key={u}>• {u}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Evidence & Citations */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>Verified Data Sources & Citations</span>
              </h3>
              <div className="space-y-2">
                {selectedTech.evidenceCitations.map(cit => (
                  <div key={cit.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-indigo-400 font-bold">[{cit.sourceName}] {cit.date}</span>
                      <a href={cit.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center">
                        Link <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                    <p className="font-semibold text-slate-200">{cit.title}</p>
                    <p className="text-slate-400 italic">"{cit.snippet}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
