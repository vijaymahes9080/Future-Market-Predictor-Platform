import React, { useState, useEffect } from 'react';
import { TechnologyItem, TimeHorizon, BusinessOpportunity, FutureJob, GlobalDataSource, AgentStatus, IntelligenceReport, InvestmentTrend } from './types';
import { MOCK_TECHNOLOGIES, MOCK_BUSINESS_OPPORTUNITIES, MOCK_FUTURE_JOBS, MOCK_INVESTMENT_TRENDS } from './data/technologiesData';
import { dataCollectorService } from './services/dataCollector';
import { agentNetworkService } from './services/agentNetwork';
import { reportGeneratorService } from './services/reportGenerator';
import { scenarioSimulatorService } from './services/scenarioSimulator';
import { Header, ActiveTab } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { TechExplorer } from './components/TechExplorer';
import { ScenarioSimulatorView } from './components/ScenarioSimulatorView';
import { PatentMinerView } from './components/PatentMinerView';
import { FutureJobsDashboard } from './components/FutureJobsDashboard';
import { BusinessOpportunityDashboard } from './components/BusinessOpportunityDashboard';
import { InvestmentIntelligence } from './components/InvestmentIntelligence';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { AgentNetworkView } from './components/AgentNetworkView';
import { ReportCenter } from './components/ReportCenter';
import { DataSourcesView } from './components/DataSourcesView';
import { ForecastingModelsView } from './components/ForecastingModelsView';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedHorizon, setSelectedHorizon] = useState<TimeHorizon>('3y');
  const [isAutoUpdating, setIsAutoUpdating] = useState<boolean>(true);

  // Core Data States
  const [technologies, setTechnologies] = useState<TechnologyItem[]>(MOCK_TECHNOLOGIES);
  const [selectedTech, setSelectedTech] = useState<TechnologyItem | null>(null);
  const [opportunities, setOpportunities] = useState<BusinessOpportunity[]>(MOCK_BUSINESS_OPPORTUNITIES);
  const [jobs, setJobs] = useState<FutureJob[]>(MOCK_FUTURE_JOBS);
  const [investments, setInvestments] = useState<InvestmentTrend[]>(MOCK_INVESTMENT_TRENDS);
  const [dataSources, setDataSources] = useState<GlobalDataSource[]>(dataCollectorService.getSources());
  const [agents, setAgents] = useState<AgentStatus[]>(agentNetworkService.getAgents());
  const [reports, setReports] = useState<IntelligenceReport[]>(reportGeneratorService.getAllReports());

  // Continuous auto-update loop simulation
  useEffect(() => {
    if (!isAutoUpdating) return;
    const interval = setInterval(() => {
      setDataSources(dataCollectorService.simulateLiveStreamUpdate());
      setAgents(agentNetworkService.simulateAgentStep());
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoUpdating]);

  const handleSelectTechnology = (tech: TechnologyItem) => {
    setSelectedTech(tech);
    setActiveTab('tech-explorer');
  };

  const handleGenerateReport = (period: IntelligenceReport['period']) => {
    const newRep = reportGeneratorService.generateReport(period, technologies);
    setReports([...reportGeneratorService.getAllReports()]);
  };

  const handleTriggerAgentStep = () => {
    setAgents(agentNetworkService.simulateAgentStep());
  };

  const handleRunSimulation = (scenarioId: string) => {
    setTechnologies(scenarioSimulatorService.simulateScenarioRipple(scenarioId, technologies));
  };

  const totalDataRate = dataCollectorService.getTotalDataPointsPerMinute();
  const weakSignalsCount = dataCollectorService.getTotalWeakSignals();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Persistent Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isAutoUpdating={isAutoUpdating}
        setIsAutoUpdating={setIsAutoUpdating}
        totalDataRate={totalDataRate}
        weakSignalsCount={weakSignalsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <DashboardOverview
            technologies={technologies}
            opportunities={opportunities}
            jobs={jobs}
            onSelectTechnology={handleSelectTechnology}
            selectedHorizon={selectedHorizon}
            setSelectedHorizon={setSelectedHorizon}
          />
        )}

        {activeTab === 'tech-explorer' && (
          <TechExplorer
            technologies={technologies}
            searchQuery={searchQuery}
            selectedTech={selectedTech}
            setSelectedTech={setSelectedTech}
          />
        )}

        {activeTab === 'scenario-simulator' && (
          <ScenarioSimulatorView
            onRunSimulation={handleRunSimulation}
          />
        )}

        {activeTab === 'patent-radar' && (
          <PatentMinerView />
        )}

        {activeTab === 'future-jobs' && (
          <FutureJobsDashboard jobs={jobs} />
        )}

        {activeTab === 'business-opps' && (
          <BusinessOpportunityDashboard opportunities={opportunities} />
        )}

        {activeTab === 'investments' && (
          <InvestmentIntelligence investmentTrends={investments} />
        )}

        {activeTab === 'knowledge-graph' && (
          <KnowledgeGraphView
            technologies={technologies}
            onSelectTechnology={handleSelectTechnology}
          />
        )}

        {activeTab === 'agent-network' && (
          <AgentNetworkView
            agents={agents}
            onTriggerAgentStep={handleTriggerAgentStep}
          />
        )}

        {activeTab === 'forecasting-models' && (
          <ForecastingModelsView
            technology={selectedTech || technologies[0]}
          />
        )}

        {activeTab === 'report-center' && (
          <ReportCenter
            reports={reports}
            onGenerateReport={handleGenerateReport}
          />
        )}

        {activeTab === 'data-sources' && (
          <DataSourcesView sources={dataSources} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 glass-panel py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Future Market Predictor Platform © 2026 Vijay Mahes | All Rights Reserved</span>
          <span className="text-indigo-400">Powered by 10 Autonomous AI Agents & 50 Global Ingestion Streams</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
