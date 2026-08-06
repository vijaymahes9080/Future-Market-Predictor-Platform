import React from 'react';
import { AgentStatus } from '../types';
import { Cpu, Activity, CheckCircle, Radio, Terminal, Sparkles, RefreshCw } from 'lucide-react';

interface AgentNetworkViewProps {
  agents: AgentStatus[];
  onTriggerAgentStep: () => void;
}

export const AgentNetworkView: React.FC<AgentNetworkViewProps> = ({ agents, onTriggerAgentStep }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span>SPECIALIZED 10-AGENT AI INTELLIGENCE NETWORK</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous multi-agent swarms continuously ingesting global patents, research papers, GitHub repos, and funding deals.
          </p>
        </div>
        <button
          onClick={onTriggerAgentStep}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Execute Agent Intelligence Step</span>
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">{agent.avatar}</span>
                <div>
                  <h3 className="text-base font-bold text-white">{agent.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{agent.role}</p>
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase border ${
                  agent.status === 'analyzing' || agent.status === 'mining'
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                    : agent.status === 'synthesizing'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>{agent.status}</span>
                </span>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">Confidence: <strong className="text-slate-200">{agent.confidenceScore}%</strong></div>
              </div>
            </div>

            {/* Current Task */}
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Active Task</span>
              <p className="text-indigo-200 font-medium">{agent.currentTask}</p>
            </div>

            {/* Thought Stream Log */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono text-[11px]"><Terminal className="w-3.5 h-3.5 text-indigo-400" /> Real-time Thought Stream</span>
                <span className="font-mono text-[10px]">{agent.findingsCount} findings</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px] space-y-1.5 max-h-36 overflow-y-auto">
                {agent.thoughtLog.map((log, lIdx) => (
                  <p key={lIdx} className="text-slate-300">
                    <span className="text-indigo-400">›</span> {log}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
