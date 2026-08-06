import React, { useState } from 'react';
import { FutureJob } from '../types';
import { 
  Briefcase, 
  TrendingUp, 
  ShieldAlert, 
  GraduationCap, 
  Building2, 
  Globe, 
  Award, 
  DollarSign, 
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface FutureJobsDashboardProps {
  jobs: FutureJob[];
}

export const FutureJobsDashboard: React.FC<FutureJobsDashboardProps> = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState<FutureJob>(jobs[0]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>FUTURE WORKFORCE & JOBS FORECASTER</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing automation risk, skill taxonomies, salary growth, and top hiring global markets.
          </p>
        </div>
        <div className="flex space-x-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-800">
            Peak Demand Horizon: <strong>2026 - 2038</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Job Selector List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 px-1">
            High Demand Roles ({jobs.length})
          </h3>
          {jobs.map((job) => {
            const isSelected = selectedJob.id === job.id;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'glass-card border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-indigo-300 border border-slate-800">
                    {job.relatedTechnologyName.split(' ')[0]}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {job.growthProbability}% Growth
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-2">{job.jobTitle}</h4>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800/60">
                  <span>Salary: <strong className="text-slate-200">{job.expectedSalaryRange.split(' - ')[0]}</strong></span>
                  <span className="text-amber-400">Risk: {job.automationRiskScore}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Detailed Role Profile */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800">
                  Linked Tech: {selectedJob.relatedTechnologyName}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedJob.jobTitle}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Peak Demand Window: <strong className="text-slate-200">{selectedJob.peakDemandYears}</strong> | Remote: <strong className="text-emerald-400">{selectedJob.remoteOpportunitiesPercentage}%</strong>
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Demand</div>
                  <div className="text-lg font-bold text-emerald-400">{selectedJob.demandScore}/100</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Automation Risk</div>
                  <div className="text-lg font-bold text-amber-400">{selectedJob.automationRiskScore}%</div>
                </div>
              </div>
            </div>

            {/* Salary Band & Freelance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Expected Salary Band</span>
                </div>
                <div className="text-xl font-bold text-white">{selectedJob.expectedSalaryRange}</div>
                <div className="text-[10px] text-slate-400">Based on US/EU remote benchmark data</div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  <span>Freelance & Consulting Potential</span>
                </div>
                <div className="text-xl font-bold text-indigo-300">{selectedJob.freelancePotential}</div>
                <div className="text-[10px] text-slate-400">High enterprise advisory demand</div>
              </div>
            </div>

            {/* Required Skills Taxonomy */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Required Skill Taxonomy</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.requiredSkills.map((sk) => (
                  <span key={sk} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                    ⚡ {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning Path & Certification Roadmap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span>Recommended Learning Path</span>
                </h4>
                <ul className="space-y-2 text-xs">
                  {selectedJob.learningPath.map((step, idx) => (
                    <li key={step} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 flex items-start space-x-2">
                      <span className="w-5 h-5 rounded-full bg-purple-950 text-purple-400 border border-purple-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Certification Roadmap</span>
                </h4>
                <ul className="space-y-2 text-xs">
                  {selectedJob.certificationRoadmap.map((cert) => (
                    <li key={cert} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Top Hiring Ecosystem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
                <h5 className="font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" /> Top Hiring Countries
                </h5>
                <p className="text-slate-200">{selectedJob.topHiringCountries.join(', ')}</p>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
                <h5 className="font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Key Hiring Employers
                </h5>
                <p className="text-slate-200">{selectedJob.topHiringCompanies.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
