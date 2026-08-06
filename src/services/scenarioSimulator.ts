import { TechnologyItem } from '../types';

export interface WarGameScenario {
  id: string;
  title: string;
  category: 'Technological Breakthrough' | 'Geopolitical / Supply Chain' | 'Regulatory / Policy' | 'Macroeconomic Shift';
  probability: number; // %
  targetHorizon: '2026-2028' | '2028-2030' | '2030-2035';
  triggerEvent: string;
  economicRippleEffects: {
    affectedSector: string;
    cagrDelta: number; // e.g. +15.5% or -8.2%
    marketImpact: string;
    workforceDisruption: string;
  }[];
  portfolioHedges: string[];
  strategicPlaybook: string[];
}

export const MOCK_SCENARIOS: WarGameScenario[] = [
  {
    id: 'scen-agi-2027',
    title: 'AGI & Self-Replicating Software Agents (2027 Window)',
    category: 'Technological Breakthrough',
    probability: 42,
    targetHorizon: '2026-2028',
    triggerEvent: 'Autonomous multi-agent consensus networks achieve zero-shot human software engineering parity across complex codebases.',
    economicRippleEffects: [
      { affectedSector: 'Agentic AI & Autonomous Workflows', cagrDelta: 32.5, marketImpact: 'Market size balloons from $28.5B to $140B in 24 months.', workforceDisruption: 'High automation risk for entry and mid-level software developers.' },
      { affectedSector: 'Cybersecurity & Post-Quantum Cryptography', cagrDelta: 24.0, marketImpact: 'Huge surge in zero-day exploit velocity; enterprise defense spending doubles.', workforceDisruption: 'Surge in demand for AI Safety & Compliance Officers.' },
      { affectedSector: 'Legacy Enterprise SaaS', cagrDelta: -18.4, marketImpact: 'Traditional seat-based SaaS models face rapid commoditization.', workforceDisruption: 'Deceleration in enterprise IT sales roles.' }
    ],
    portfolioHedges: [
      'Overweight compute hardware & custom AI silicon (NVIDIA, ARM, Broadcom).',
      'Long post-quantum encryption & zero-trust security infrastructure.',
      'Underweight legacy seat-based B2B software vendors.'
    ],
    strategicPlaybook: [
      'Mandate API-level deterministic execution guardrails across all internal agent workloads.',
      'Transition pricing models from per-seat licensing to outcome-based consumption billing.',
      'Deploy continuous autonomous unit-testing pipelines for zero-day defense.'
    ]
  },
  {
    id: 'scen-fusion-grid-2030',
    title: 'Commercial Fusion Power Grid Connectivity (2030)',
    category: 'Technological Breakthrough',
    probability: 65,
    targetHorizon: '2028-2030',
    triggerEvent: 'First 500MW compact Tokamak fusion power plant connects to the grid in Cambridge MA / Oxfordshire, delivering baseload power at $22/MWh.',
    economicRippleEffects: [
      { affectedSector: 'Nuclear Fusion Energy', cagrDelta: 45.0, marketImpact: 'Trillion-dollar clean baseload energy market unlocked.', workforceDisruption: 'High demand for plasma physicists and magnet engineers.' },
      { affectedSector: 'Direct Air Capture & Carbon-to-X', cagrDelta: 38.0, marketImpact: 'DAC energy costs plummet 70%, enabling sub-$80/ton carbon removal.', workforceDisruption: 'Rapid growth in green chemical plant operators.' },
      { affectedSector: 'Fossil Fuel Peaker Plants', cagrDelta: -35.0, marketImpact: 'Coal and natural gas baseload plants become stranded assets.', workforceDisruption: 'Decline in traditional fossil fuel extraction jobs.' }
    ],
    portfolioHedges: [
      'Long high-temperature superconducting magnet manufacturers.',
      'Invest heavily in synthetic electro-fuels and carbon capture infrastructure.',
      'Divest from thermal coal and peaking gas generation assets.'
    ],
    strategicPlaybook: [
      'Locate next-generation AI hyper-scale data centers directly adjacent to fusion pilot nodes.',
      'Convert industrial chemical processes to zero-carbon electro-synthesis.',
      'Secure long-term Power Purchase Agreements (PPAs) with fusion utilities.'
    ]
  },
  {
    id: 'scen-quantum-crack-2029',
    title: 'Quantum Advantage RSA-2048 Cryptographic Threat',
    category: 'Technological Breakthrough',
    probability: 35,
    targetHorizon: '2028-2030',
    triggerEvent: 'Fault-tolerant 10,000 logical qubit processor successfully factorizes RSA-2048 key in under 3 hours in lab conditions.',
    economicRippleEffects: [
      { affectedSector: 'Cybersecurity & Post-Quantum', cagrDelta: 58.0, marketImpact: 'Global emergency migration to NIST post-quantum lattice algorithms.', workforceDisruption: 'Extreme shortage of post-quantum cryptography migrators.' },
      { affectedSector: 'Traditional Banking Infrastructure', cagrDelta: -12.0, marketImpact: 'High risk of harvest-now-decrypt-later data leaks.', workforceDisruption: 'Increased compliance burden on bank IT departments.' }
    ],
    portfolioHedges: [
      'Long NIST PQC lattice security providers (PQC-Kyber implementations).',
      'Invest in Quantum Key Distribution (QKD) satellite mesh hardware.'
    ],
    strategicPlaybook: [
      'Perform urgent cryptographic discovery across all enterprise endpoints.',
      'Upgrade legacy HSM modules to hybrid post-quantum firmware.'
    ]
  }
];

export class ScenarioSimulatorService {
  public getScenarios(): WarGameScenario[] {
    return MOCK_SCENARIOS;
  }

  public simulateScenarioRipple(scenarioId: string, technologies: TechnologyItem[]): TechnologyItem[] {
    const scenario = MOCK_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return technologies;

    return technologies.map(tech => {
      const matchEffect = scenario.economicRippleEffects.find(e => tech.technologyName.includes(e.affectedSector) || e.affectedSector.includes(tech.category));
      if (!matchEffect) return tech;

      const newCAGR = Math.max(5, Number((tech.predictedCAGR + matchEffect.cagrDelta).toFixed(1)));
      const newScore = Math.min(100, Math.max(10, Math.round(tech.scores.overallOpportunityScore + matchEffect.cagrDelta * 0.5)));

      return {
        ...tech,
        predictedCAGR: newCAGR,
        scores: {
          ...tech.scores,
          overallOpportunityScore: newScore
        }
      };
    });
  }
}

export const scenarioSimulatorService = new ScenarioSimulatorService();
