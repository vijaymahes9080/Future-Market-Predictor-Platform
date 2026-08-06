import React from 'react';
import { TechnologyItem } from '../types';
import { forecastingEngineService } from '../services/forecastingEngine';
import { Sparkles, BrainCircuit, BarChart2, CheckCircle2, TrendingUp } from 'lucide-react';

interface ForecastingModelsViewProps {
  technology: TechnologyItem;
}

export const ForecastingModelsView: React.FC<ForecastingModelsViewProps> = ({ technology }) => {
  const models = forecastingEngineService.runModelEnsemble(technology);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>AI FORECASTING MODEL ENSEMBLE ENGINE</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Running Prophet, LSTM, GNN, XGBoost, and LLM RAG multi-agent models for target: <strong className="text-indigo-300">{technology.technologyName}</strong>
          </p>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div key={model.modelName} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                {model.modelName}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                Accuracy: {model.accuracyScore}%
              </span>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-mono">Predicted CAGR Projection</div>
              <div className="text-2xl font-bold text-white mt-0.5 flex items-center">
                <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
                +{model.predictedCAGR}%
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                95% Conf. Interval: [{model.confidenceInterval[0].toFixed(1)}% - {model.confidenceInterval[1].toFixed(1)}%]
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <span className="font-bold text-slate-400">Primary Model Drivers:</span>
              <ul className="space-y-1 text-slate-300">
                {model.keyFactors.map((kf) => (
                  <li key={kf} className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{kf}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
