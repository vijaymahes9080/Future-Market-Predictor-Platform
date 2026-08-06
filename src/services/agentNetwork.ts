import { AgentStatus } from '../types';
import { MOCK_AGENTS } from '../data/technologiesData';

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
      // Randomly update status & add dynamic log entry
      const statuses: AgentStatus['status'][] = ['analyzing', 'mining', 'synthesizing', 'complete'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const addedFindings = Math.floor(Math.random() * 5) + 1;
      
      const newLogs = [...agent.thoughtLog];
      if (Math.random() > 0.4) {
        const timestamp = new Date().toLocaleTimeString();
        newLogs.unshift(`[${timestamp}] Auto-ingested new global signal: verified trend pattern (+${addedFindings} data points).`);
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
    return this.agents;
  }
}

export const agentNetworkService = new AgentNetworkService();
