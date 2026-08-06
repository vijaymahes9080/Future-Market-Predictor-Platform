import React, { useState } from 'react';
import { PatentItem, MOCK_PATENTS } from '../services/patentMiner';
import { FileText, ShieldAlert, Award, ExternalLink, Search, CheckCircle, Scale } from 'lucide-react';

export const PatentMinerView: React.FC = () => {
  const [selectedPatent, setSelectedPatent] = useState<PatentItem>(MOCK_PATENTS[0]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>AUTONOMOUS PATENT PRIOR-ART & CLAIMS MINER</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mining USPTO, WIPO, EPO, and JPO databases for emerging IP claims, novelty ratings, and litigation risk warnings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Patent List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 px-1 font-mono">
            Mined Patents ({MOCK_PATENTS.length})
          </h3>
          {MOCK_PATENTS.map((pat) => {
            const isSelected = selectedPatent.id === pat.id;
            return (
              <div
                key={pat.id}
                onClick={() => setSelectedPatent(pat)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'glass-card border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                    [{pat.jurisdiction}] {pat.patentNumber}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    Novelty: {pat.noveltyScore}/100
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2">{pat.title}</h4>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">Assignee: {pat.assignee}</div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Patent Deep-Dive */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
                  {selectedPatent.jurisdiction} • Granted: {selectedPatent.grantDate}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedPatent.title}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Assignee: <strong className="text-slate-200">{selectedPatent.assignee}</strong> | Filing Date: {selectedPatent.filingDate}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Novelty Rating</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedPatent.noveltyScore}/100</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Litigation Risk</span>
                  <span className={`text-lg font-bold ${selectedPatent.litigationRiskIndex === 'High' ? 'text-rose-400' : 'text-amber-400'}`}>
                    {selectedPatent.litigationRiskIndex}
                  </span>
                </div>
              </div>
            </div>

            {/* Abstract */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono tracking-wider block">Official Patent Abstract</span>
              <p className="text-xs text-slate-200 leading-relaxed">{selectedPatent.abstractSnippet}</p>
            </div>

            {/* Key Claims */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-purple-400 uppercase font-mono tracking-wider">Independent Mined Patent Claims ({selectedPatent.claimsCount} Total Claims)</h4>
              <div className="space-y-2">
                {selectedPatent.keyClaims.map((claim, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
                    {claim}
                  </div>
                ))}
              </div>
            </div>

            {/* Prior Art Stats */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span>Prior-Art Citations</span>
                <strong className="text-indigo-400">{selectedPatent.priorArtCitationsCount}</strong>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span>Technology Sector</span>
                <strong className="text-emerald-400">{selectedPatent.technologyCategory}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
