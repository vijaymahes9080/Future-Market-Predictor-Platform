import React, { useState } from 'react';
import { Globe, Building2, TrendingUp, Award, Users, DollarSign, MapPin } from 'lucide-react';

export interface GlobalHub {
  city: string;
  country: string;
  region: 'North America' | 'APAC' | 'Europe' | 'Middle East';
  ecosystemScore: number; // 0-100
  vcCapitalYTD: string;
  topSectors: string[];
  patentVelocityYoY: number;
  keyUnicorns: string[];
  keyUniversities: string[];
}

export const GLOBAL_HUBS: GlobalHub[] = [
  { city: 'San Francisco Bay Area', country: 'United States', region: 'North America', ecosystemScore: 99, vcCapitalYTD: '$14.2B', topSectors: ['Agentic AI', 'Humanoid Robotics', 'BCI'], patentVelocityYoY: 185.0, keyUnicorns: ['Cognition AI', 'Figure AI', 'Neuralink'], keyUniversities: ['Stanford', 'UC Berkeley'] },
  { city: 'Shenzhen / Hangzhou', country: 'China', region: 'APAC', ecosystemScore: 95, vcCapitalYTD: '$8.5B', topSectors: ['Humanoid Hardware', 'Autonomous Driving', '6G'], patentVelocityYoY: 190.2, keyUnicorns: ['Unitree', 'Pony.ai', 'RoboSense'], keyUniversities: ['Tsinghua', 'Zhejiang Univ'] },
  { city: 'London / Cambridge', country: 'United Kingdom', region: 'Europe', ecosystemScore: 92, vcCapitalYTD: '$5.1B', topSectors: ['Synthetic Biology', 'Nuclear Fusion', 'Quantum'], patentVelocityYoY: 145.0, keyUnicorns: ['Proxima Fusion', 'Synthego UK'], keyUniversities: ['Cambridge', 'Oxford', 'Imperial'] },
  { city: 'Bengaluru / Hyderabad', country: 'India', region: 'APAC', ecosystemScore: 90, vcCapitalYTD: '$4.8B', topSectors: ['Agentic Workflows', 'Edge AI', 'Space Tech'], patentVelocityYoY: 165.4, keyUnicorns: ['CrewAI Asia', 'Agnikul Cosmos'], keyUniversities: ['IISc Bengaluru', 'IIT Madras'] },
  { city: 'Munich / Stuttgart', country: 'Germany', region: 'Europe', ecosystemScore: 89, vcCapitalYTD: '$3.9B', topSectors: ['Industrial AI', 'Quantum', 'Cleantech'], patentVelocityYoY: 138.0, keyUnicorns: ['Celonis', 'Marvel Fusion'], keyUniversities: ['TUM Munich', 'ETH Zurich (Collab)'] },
  { city: 'Tel Aviv', country: 'Israel', region: 'Middle East', ecosystemScore: 88, vcCapitalYTD: '$3.4B', topSectors: ['Cybersecurity', 'Post-Quantum Crypto', 'AI Sensors'], patentVelocityYoY: 142.0, keyUnicorns: ['Wiz', 'QuantumSource'], keyUniversities: ['Technion', 'Tel Aviv Univ'] }
];

export const GlobalHeatmapView: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<GlobalHub>(GLOBAL_HUBS[0]);
  const [regionFilter, setRegionFilter] = useState<string>('All');

  const filteredHubs = GLOBAL_HUBS.filter(h => regionFilter === 'All' || h.region === regionFilter);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            <span>GLOBAL INNOVATION HUBS & ECOSYSTEM HEATMAP</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Geospatial tracking of VC deployment, patent filing density, and unicorn growth across global tech capitals.
          </p>
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-1">
        {['All', 'North America', 'APAC', 'Europe', 'Middle East'].map(reg => (
          <button
            key={reg}
            onClick={() => setRegionFilter(reg)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              regionFilter === reg
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {reg}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Hub Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 px-1 font-mono">
            Innovation Cities ({filteredHubs.length})
          </h3>
          {filteredHubs.map((hub) => {
            const isSelected = selectedHub.city === hub.city;
            return (
              <div
                key={hub.city}
                onClick={() => setSelectedHub(hub)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'glass-card border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                    {hub.region}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {hub.ecosystemScore}/100
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> {hub.city}
                </h4>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">VC YTD: <strong className="text-slate-200">{hub.vcCapitalYTD}</strong></div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Detailed Ecosystem Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
                  {selectedHub.country} • {selectedHub.region}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedHub.city}</h3>
              </div>

              <div className="flex items-center space-x-3 font-mono">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">Ecosystem Score</span>
                  <span className="text-xl font-bold text-indigo-400">{selectedHub.ecosystemScore}/100</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">VC Flow YTD</span>
                  <span className="text-xl font-bold text-emerald-400">{selectedHub.vcCapitalYTD}</span>
                </div>
              </div>
            </div>

            {/* Top Sectors & Velocity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono tracking-wider block">Top Dominant Tech Sectors</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHub.topSectors.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800">
                      ⚡ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1 font-mono">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Patent Growth Velocity</span>
                <div className="text-xl font-bold text-amber-300">+{selectedHub.patentVelocityYoY}% YoY</div>
                <div className="text-[10px] text-slate-400">USPTO & WIPO global patent filings</div>
              </div>
            </div>

            {/* Key Unicorns & Universities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-emerald-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Top Flagship Startups
                </h4>
                <ul className="space-y-1 text-slate-200 font-mono">
                  {selectedHub.keyUnicorns.map(u => <li key={u} className="p-2 bg-slate-900 rounded-lg border border-slate-800">• {u}</li>)}
                </ul>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-purple-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" /> Academic Feeder Universities
                </h4>
                <ul className="space-y-1 text-slate-200 font-mono">
                  {selectedHub.keyUniversities.map(uni => <li key={uni} className="p-2 bg-slate-900 rounded-lg border border-slate-800">• {uni}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
