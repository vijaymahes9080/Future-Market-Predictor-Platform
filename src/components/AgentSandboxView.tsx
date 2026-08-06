import React, { useState } from 'react';
import { CustomQueryResult, agentSandboxService } from '../services/agentSandbox';
import { AgentStatus } from '../types';
import { Terminal, Cpu, Play, Sparkles, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';

interface AgentSandboxViewProps {
  agents: AgentStatus[];
}

export const AgentSandboxView: React.FC<AgentSandboxViewProps> = ({ agents }) => {
  const [userPrompt, setUserPrompt] = useState<string>('Predict the commercial impact of 1-bit quantized LLMs on smart home robotics by 2029.');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([agents[0].name, agents[1].name, agents[6].name]);
  const [depth, setDepth] = useState<CustomQueryResult['reasoningDepth']>('Deep Research');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<CustomQueryResult | null>(null);

  const toggleAgent = (name: string) => {
    if (selectedAgents.includes(name)) {
      if (selectedAgents.length > 1) setSelectedAgents(selectedAgents.filter(a => a !== name));
    } else {
      setSelectedAgents([...selectedAgents, name]);
    }
  };

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const res = agentSandboxService.executeCustomQuery(userPrompt, selectedAgents, depth);
      setQueryResult(res);
      setIsExecuting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>INTERACTIVE MULTI-AGENT PROMPT & REASONING SANDBOX</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dispatch custom prompts to specialized AI agent teams, configure reasoning depth, and inspect real-time agent execution trees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sandbox Config Controls */}
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" /> Agent Swarm Config
          </h3>

          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-bold">Custom Intelligence Prompt</label>
            <textarea
              rows={3}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full glass-input p-3 rounded-xl text-xs text-slate-200"
              placeholder="Ask anything about future tech, patents, jobs..."
            />
          </div>

          {/* Reasoning Depth */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-bold">Reasoning Depth</label>
            <select
              value={depth}
              onChange={(e: any) => setDepth(e.target.value)}
              className="w-full glass-input p-2.5 rounded-xl text-xs text-slate-200"
            >
              <option value="Standard">Standard (Fast Synthesis)</option>
              <option value="Deep Research">Deep Research (Full Graph Citation)</option>
              <option value="Exhaustive Graph Mining">Exhaustive Graph Mining (10k+ Nodes)</option>
            </select>
          </div>

          {/* Agent Selection Checkboxes */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-bold">Select Active Agent Swarm ({selectedAgents.length})</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {agents.map((ag) => {
                const isChecked = selectedAgents.includes(ag.name);
                return (
                  <div
                    key={ag.id}
                    onClick={() => toggleAgent(ag.name)}
                    className={`p-2.5 rounded-xl cursor-pointer text-xs flex items-center justify-between border transition-all ${
                      isChecked
                        ? 'bg-indigo-950/80 border-indigo-500 text-white font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="truncate">{ag.name}</span>
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-1" />}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleRunQuery}
            disabled={isExecuting || !userPrompt.trim()}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isExecuting ? 'Agent Swarm Executing...' : 'Execute Swarm Query'}</span>
          </button>
        </div>

        {/* Right 2 Columns: Execution Results & Agent Trace */}
        <div className="lg:col-span-2 space-y-6">
          {queryResult ? (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
                    Query Completed in {queryResult.executionTimeMs}ms
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Swarm Consensus Synthesis</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Confidence: <strong className="text-emerald-400">{queryResult.confidenceScore}%</strong> | Depth: {queryResult.reasoningDepth}
                  </p>
                </div>
              </div>

              {/* Synthesized Answer */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono tracking-wider block">Synthesized Intelligence Brief</span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">{queryResult.synthesizedAnswer}</p>
              </div>

              {/* Agent Execution Trace Steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-purple-400 uppercase font-mono tracking-wider">Step-by-Step Agent Trace Tree</h4>
                <div className="space-y-2">
                  {queryResult.agentTraceSteps.map((step, idx) => (
                    <div key={idx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between text-indigo-300 font-bold">
                        <span>🤖 {step.agentName}</span>
                        <span className="text-[10px] text-slate-400">Step {idx + 1}</span>
                      </div>
                      <p className="text-slate-300">{step.action}</p>
                      <p className="text-slate-400 italic text-[11px]">Thought: "{step.thought}"</p>
                      <div className="flex items-center space-x-2 text-[10px] text-emerald-400 pt-1">
                        <span>Citations: {step.extractedCitations.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
              <Cpu className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
              <h3 className="text-base font-bold text-slate-300">Agent Sandbox Ready</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Configure prompt & agent swarm team on the left, then click Execute Swarm Query to inspect reasoning logs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
