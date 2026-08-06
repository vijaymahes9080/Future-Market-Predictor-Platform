import React, { useState } from 'react';
import { TechnologyItem } from '../types';
import { Sparkles, Calendar, CheckCircle2, Flag, ArrowRight } from 'lucide-react';

interface InteractiveTimelineViewProps {
  technologies: TechnologyItem[];
}

export const InteractiveTimelineView: React.FC<InteractiveTimelineViewProps> = ({ technologies }) => {
  const years = ['2026', '2027', '2028', '2030', '2032', '2035'];
  const [selectedYear, setSelectedYear] = useState<string>('2028');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>2026 - 2035 INTERACTIVE TECHNOLOGY ROADMAP</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing commercialization milestones, TRL advancement windows, and market tipping points.
          </p>
        </div>
      </div>

      {/* Year Selector Timeline Bar */}
      <div className="glass-panel p-6 rounded-2xl flex items-center justify-between overflow-x-auto relative">
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 z-0" />
        {years.map((y) => {
          const isSelected = selectedYear === y;
          return (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`relative z-10 flex flex-col items-center px-4 py-2 rounded-2xl transition-all ${
                isSelected
                  ? 'bg-gradient-to-b from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-110'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span className="text-sm font-bold font-mono">{y}</span>
              <span className="text-[9px] opacity-80 uppercase">Target</span>
            </button>
          );
        })}
      </div>

      {/* Roadmap Cards Grid for Selected Year */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technologies.map((tech) => {
          const hKey = selectedYear === '2026' ? '6m' : selectedYear === '2027' ? '1y' : selectedYear === '2028' ? '3y' : selectedYear === '2030' ? '5y' : '10y';
          const forecast = tech.horizonForecasts[hKey];
          if (!forecast) return null;

          return (
            <div key={tech.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                  {tech.category}
                </span>
                <span className="text-xs font-bold text-amber-400">
                  {forecast.disruptionPotential} Risk
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{tech.technologyName}</h3>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] text-slate-400 font-mono">Market Projection ({selectedYear})</span>
                <div className="text-base font-bold text-indigo-300">{forecast.expectedMarketSize}</div>
                <div className="text-[10px] text-emerald-400 font-mono">Adoption: {forecast.adoptionStage}</div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-400 font-mono text-[10px] uppercase">Key Milestones ({selectedYear}):</span>
                <ul className="space-y-1 text-slate-300">
                  {forecast.keyBreakthroughs.map((kb) => (
                    <li key={kb} className="flex items-start space-x-1.5">
                      <Flag className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{kb}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
