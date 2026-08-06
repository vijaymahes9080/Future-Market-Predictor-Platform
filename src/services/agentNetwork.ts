import { AgentStatus } from '../types';
import { MOCK_AGENTS } from '../data/technologiesData';

const DYNAMIC_AGENT_THOUGHTS: Record<string, string[]> = {
  'agent-1': [
    'Scanning 22,000 arXiv pre-prints for Agentic AI breakthroughs.',
    'Detected 48% YoY surge in multi-agent consensus papers.',
    'Synthesizing market size forecast for 2028 ($74.0B).',
    'Ingested Google Trends velocity: +245.0% for Autonomous AI Workflows.'
  ],
  'agent-2': [
    'Mining USPTO & WIPO for humanoid robotics micro-actuator patents.',
    'Identified patent bottleneck in 24 DoF tactile sensor hands.',
    'Calculated patent filing growth rate of 140.2% YoY.',
    'Verified zero-infringement claims score (Novelty: 98/100).'
  ],
  'agent-3': [
    'Building citation graph for room-temperature quantum superconductors.',
    'Extracted 5,400 Semantic Scholar paper citations.',
    'Detected weak signal breakthrough in solid-state battery electrolytes.',
    'Flagged high impact paper in Nature Energy with Q-factor > 2.4.'
  ],
  'agent-4': [
    'Indexing Y Combinator S26 and Product Hunt launch velocity.',
    'Spotted 18 new B2B AI agent security guardrail startups.',
    'Calculated average seed stage valuation ($18.5M).',
    'Flagged Cognition AI hiring velocity (+120% headcount).'
  ],
  'agent-5': [
    'Aggregating PitchBook and Crunchbase Q2 megadeals.',
    'VC funding shift confirmed: +215% capital flow into Agentic AI.',
    'Mapped emerging hub score for Shenzhen & Silicon Valley.',
    'Calculated IPO probability for 6 top unicorn candidates.'
  ]
};

export class AgentNetworkService {
  private agents: AgentStatus[] = [...MOCK_AGENTS];

  public getAgents(): AgentStatus[] {
    return this.agents;
  }

  public getAgentById(id: string): AgentStatus | undefined {
    return this.agents.find(a => a.id === id);
  }

  public simulateAgentStep(): AgentStatus[] {
    this.agents = this.agents.map(agent => {
      const statuses: AgentStatus['status'][] = ['analyzing', 'mining', 'synthesizing', 'complete'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const addedFindings = Math.floor(Math.random() * 6) + 1;
      
      const pool = DYNAMIC_AGENT_THOUGHTS[agent.id] || [
        'Ingesting newly published global signal.',
        'Executing multi-model time-series forecasting step.',
        'Cross-referencing GitHub repository velocity.'
      ];
      
      const newLogs = [...agent.thoughtLog];
      if (Math.random() > 0.3) {
        const timestamp = new Date().toLocaleTimeString();
        const thought = pool[Math.floor(Math.random() * pool.length)];
        newLogs.unshift(`[${timestamp}] ${thought}`);
        if (newLogs.length > 8) newLogs.pop();
      }

      return {
        ...agent,
        status: newStatus,
        findingsCount: agent.findingsCount + addedFindings,
        lastActive: 'Just now',
        thoughtLog: newLogs
      };
    });
    return [...this.agents];
  }
}

export const agentNetworkService = new AgentNetworkService();
