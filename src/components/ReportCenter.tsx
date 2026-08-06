import React, { useState } from 'react';
import { IntelligenceReport } from '../types';
import { reportGeneratorService } from '../services/reportGenerator';
import { FileText, Download, Sparkles, CheckCircle, Clock } from 'lucide-react';

interface ReportCenterProps {
  reports: IntelligenceReport[];
  onGenerateReport: (period: IntelligenceReport['period']) => void;
}

export const ReportCenter: React.FC<ReportCenterProps> = ({ reports, onGenerateReport }) => {
  const [selectedReport, setSelectedReport] = useState<IntelligenceReport>(reports[0]);

  const handleDownloadMarkdown = (report: IntelligenceReport) => {
    const content = reportGeneratorService.exportReportAsMarkdown(report);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>STRATEGIC REPORT GENERATOR & CITATION CENTER</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated Daily, Weekly, Monthly, Quarterly, and Yearly reports with evidence citations and Markdown export.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'] as IntelligenceReport['period'][]).map((period) => (
            <button
              key={period}
              onClick={() => onGenerateReport(period)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-all"
            >
              + {period} Report
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Report Selection List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 px-1">
            Generated Reports ({reports.length})
          </h3>
          {reports.map((rep) => (
            <div
              key={rep.id}
              onClick={() => setSelectedReport(rep)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                selectedReport.id === rep.id
                  ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : 'glass-card border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {rep.period}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{rep.generatedDate}</span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">{rep.title}</h4>
              <div className="text-[11px] text-slate-400 mt-2">
                Citations: <strong className="text-slate-200">{rep.citationsCount}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Right 2 Columns: Report Preview */}
        <div className="lg:col-span-2 space-y-6">
          {selectedReport && (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800">
                    {selectedReport.period} Strategic Briefing
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedReport.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Generated: {selectedReport.generatedDate} | Evidence Citations: {selectedReport.citationsCount}
                  </p>
                </div>

                <button
                  onClick={() => handleDownloadMarkdown(selectedReport)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Markdown</span>
                </button>
              </div>

              {/* Executive Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">Executive Summary</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  {selectedReport.executiveSummary}
                </p>
              </div>

              {/* Top Exploding Technologies */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">Top Exploding Technologies</h4>
                <ul className="space-y-2 text-xs">
                  {selectedReport.topExplodingTech.map((t) => (
                    <li key={t} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Weak Signals */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">Key Weak Signals Detected</h4>
                <div className="space-y-2 text-xs">
                  {selectedReport.keyWeakSignals.map((s) => (
                    <div key={s} className="p-3 bg-amber-950/20 rounded-xl border border-amber-800/40 text-amber-200">
                      ⚡ {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Recommendations */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">Strategic Recommendations</h4>
                <ol className="space-y-2 text-xs">
                  {selectedReport.strategicRecommendations.map((r, i) => (
                    <li key={r} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 flex items-start gap-2">
                      <span className="font-bold text-purple-400 shrink-0">{i + 1}.</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
