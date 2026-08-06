import React, { useState } from 'react';
import { WarGameScenario, MOCK_SCENARIOS } from '../services/scenarioSimulator';
import { ShieldAlert, Zap, TrendingUp, TrendingDown, Crosshair, Sparkles, CheckCircle2, Play } from 'lucide-react';

interface ScenarioSimulatorViewProps {
  onRunSimulation: (scenarioId: string) => void;
}

export const ScenarioSimulatorView: React.FC<ScenarioSimulatorViewProps> = ({ onRunSimulation }) => {
  const [selectedScenario, setSelectedScenario] = useState<WarGameScenario>(MOCK_SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedResults, setSimulatedResults] = useState<boolean>(false);

  const handleRun = () => {
    setIsSimulating(true);
    setTimeout(() => {
      onRunSimulation(selectedScenario.id);
      setIsSimulating(false);
      setSimulatedResults(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-indigo-400" />
            <span>AI WAR-GAMING & MACROECONOMIC SCENARIO SIMULATOR</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate high-impact technology shocks and calculate real-time portfolio ripple effects across 35+ technology CAGRs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Column: Scenario Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 px-1 font-mono">
            Shock Scenarios ({MOCK_SCENARIOS.length})
          </h3>
          {MOCK_SCENARIOS.map((scen) => {
            const isSelected = selectedScenario.id === scen.id;
            return (
              <div
                key={scen.id}
                onClick={() => {
                  setSelectedScenario(scen);
                  setSimulatedResults(false);
                }}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'glass-card border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {scen.category}
                  </span>
                  <span className="text-xs font-bold text-amber-400">
                    {scen.probability}% Prob.
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2">{scen.title}</h4>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">Horizon: {scen.targetHorizon}</div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Scenario Deep-Dive & Execution Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800">
                  Target Horizon: {selectedScenario.targetHorizon}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedScenario.title}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Occurrence Probability: <strong className="text-amber-400">{selectedScenario.probability}%</strong>
                </p>
              </div>

              <button
                onClick={handleRun}
                disabled={isSimulating}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs font-bold shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isSimulating ? 'Simulating Ripple Effects...' : 'Run Scenario Simulation'}</span>
              </button>
            </div>

            {/* Trigger Event */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase font-mono tracking-wider block">Catalyst Trigger Event</span>
              <p className="text-xs text-slate-200">{selectedScenario.triggerEvent}</p>
            </div>

            {/* Economic Ripple Effects */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-indigo-400 uppercase font-mono tracking-wider">Sector Ripple Effects</h4>
              <div className="space-y-2">
                {selectedScenario.economicRippleEffects.map((eff) => (
                  <div key={eff.affectedSector} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{eff.affectedSector}</span>
                      <span className={`font-bold flex items-center ${eff.cagrDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {eff.cagrDelta > 0 ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
                        {eff.cagrDelta > 0 ? `+${eff.cagrDelta}%` : `${eff.cagrDelta}%`} CAGR Delta
                      </span>
                    </div>
                    <p className="text-slate-300">{eff.marketImpact}</p>
                    <div className="text-[10px] text-slate-400 font-mono">Workforce: {eff.workforceDisruption}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Playbook & Portfolio Hedges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">Recommended Portfolio Hedges</h4>
                <ul className="space-y-2 text-xs">
                  {selectedScenario.portfolioHedges.map((hedge) => (
                    <li key={hedge} className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-800/40 text-emerald-200 flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hedge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-purple-400 uppercase font-mono tracking-wider">Enterprise Playbook</h4>
                <ul className="space-y-2 text-xs">
                  {selectedScenario.strategicPlaybook.map((play) => (
                    <li key={play} className="p-3 bg-purple-950/20 rounded-xl border border-purple-800/40 text-purple-200 flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{play}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {simulatedResults && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono animate-pulse flex items-center justify-between">
                <span>✓ Simulation executed! Platform CAGRs & opportunity scores updated across all 35+ technology deep-dives.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
