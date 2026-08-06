import React from 'react';
import { GlobalDataSource } from '../types';
import { Database, Radio, Activity, ShieldCheck, Zap } from 'lucide-react';

interface DataSourcesViewProps {
  sources: GlobalDataSource[];
}

export const DataSourcesView: React.FC<DataSourcesViewProps> = ({ sources }) => {
  const categories = Array.from(new Set(sources.map(s => s.category)));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            <span>50 GLOBAL DATA SOURCE INGESTION PIPELINES</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time API connectors across search, academic repos, patent registries, open-source repositories, and VC databases.
          </p>
        </div>
      </div>

      {categories.map((cat) => {
        const catSources = sources.filter(s => s.category === cat);
        return (
          <div key={cat} className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>{cat} ({catSources.length} Feeds)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catSources.map((src) => (
                <div key={src.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs truncate max-w-[180px]">{src.name}</span>
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <Radio className="w-2.5 h-2.5 animate-ping" />
                      <span>{src.status}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">Throughput</span>
                      <strong className="text-indigo-400">{src.dataPointsPerMin.toLocaleString()} /min</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">Weak Signals</span>
                      <strong className="text-amber-400">{src.weakSignalsCount}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Quality Index: <strong className="text-slate-200">{src.signalQuality}%</strong></span>
                    <span>Synced: <strong>{src.lastSync}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
