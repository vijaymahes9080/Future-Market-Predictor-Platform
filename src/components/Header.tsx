import React from 'react';
import { 
  Activity, 
  BrainCircuit, 
  Search, 
  Radio, 
  Sparkles, 
  Briefcase, 
  Lightbulb, 
  TrendingUp, 
  Network, 
  FileText, 
  Database,
  Cpu
} from 'lucide-react';

export type ActiveTab = 
  | 'overview' 
  | 'tech-explorer' 
  | 'scenario-simulator'
  | 'patent-radar'
  | 'venture-studio'
  | 'tech-timeline'
  | 'agent-sandbox'
  | 'global-heatmap'
  | 'future-jobs' 
  | 'business-opps' 
  | 'investments' 
  | 'knowledge-graph' 
  | 'agent-network' 
  | 'report-center' 
  | 'forecasting-models'
  | 'data-sources';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAutoUpdating: boolean;
  setIsAutoUpdating: (val: boolean) => void;
  totalDataRate: number;
  weakSignalsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  isAutoUpdating,
  setIsAutoUpdating,
  totalDataRate,
  weakSignalsCount
}) => {
  const tabs = [
    { id: 'overview', label: 'Command Center', icon: Activity },
    { id: 'tech-explorer', label: 'Tech Deep-Dives', icon: BrainCircuit },
    { id: 'scenario-simulator', label: 'War Games AI', icon: Sparkles },
    { id: 'patent-radar', label: 'Patent Radar', icon: Database },
    { id: 'venture-studio', label: 'Venture Studio', icon: Lightbulb },
    { id: 'tech-timeline', label: '2026-35 Roadmap', icon: Radio },
    { id: 'agent-sandbox', label: 'Agent Sandbox', icon: Cpu },
    { id: 'global-heatmap', label: 'Global Hubs', icon: Globe },
    { id: 'future-jobs', label: 'Future Jobs', icon: Briefcase },
    { id: 'business-opps', label: 'Startup Matrix', icon: Lightbulb },
    { id: 'investments', label: 'VC & Funding', icon: TrendingUp },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network },
    { id: 'agent-network', label: '10 AI Agents', icon: Cpu },
    { id: 'forecasting-models', label: 'AI Forecaster', icon: Sparkles },
    { id: 'report-center', label: 'Reports Hub', icon: FileText },
    { id: 'data-sources', label: '50 Feeds', icon: Database },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 glass-panel">
      {/* Top Banner Ticker */}
      <div className="bg-slate-900/90 text-xs px-4 py-1.5 border-b border-slate-800 flex items-center justify-between overflow-hidden">
        <div className="flex items-center space-x-3 text-slate-400 truncate">
          <span className="inline-flex items-center space-x-1.5 text-indigo-400 font-semibold px-2 py-0.5 bg-indigo-950/60 rounded border border-indigo-800/40">
            <Radio className="w-3 h-3 animate-pulse text-indigo-400" />
            <span>CONTINUOUS FEED ENGINE</span>
          </span>
          <span className="truncate">
            ⚡ Ingesting <strong className="text-slate-200">{totalDataRate.toLocaleString()} pts/min</strong> across <strong className="text-slate-200">50 Global Sources</strong> | Detected <strong className="text-amber-400">{weakSignalsCount} Weak Signals</strong> in last 24h
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAutoUpdating(!isAutoUpdating)}
            className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-xs transition-colors ${
              isAutoUpdating 
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAutoUpdating ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            <span>{isAutoUpdating ? 'Live Stream Active' : 'Stream Paused'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>FUTURE MARKET PREDICTOR</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v3.5 Enterprise
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-mono">Autonomous Global Intelligence Engine</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search 35+ technologies, 50 data feeds, future jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-sm glass-input rounded-xl text-slate-200 placeholder-slate-500"
              />
            </div>
          </div>

          {/* User / Org badge */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-200">Vijay Mahes</p>
              <p className="text-[10px] text-indigo-400 font-mono">Lead VC & Research Analyst</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-500/40">
              VM
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/60 pt-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as ActiveTab)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
