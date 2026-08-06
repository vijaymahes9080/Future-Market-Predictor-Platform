export interface PatentItem {
  id: string;
  patentNumber: string;
  title: string;
  assignee: string;
  jurisdiction: 'USPTO' | 'WIPO' | 'EPO' | 'JPO' | 'CNIPA';
  filingDate: string;
  grantDate: string;
  technologyCategory: string;
  noveltyScore: number; // 0-100
  litigationRiskIndex: 'Low' | 'Moderate' | 'High' | 'Severe';
  claimsCount: number;
  priorArtCitationsCount: number;
  abstractSnippet: string;
  keyClaims: string[];
}

export const MOCK_PATENTS: PatentItem[] = [
  {
    id: 'pat-109281',
    patentNumber: 'US-11,948,201-B2',
    title: 'Hierarchical Multi-Agent Graph Orchestration for Autonomous Task Decomposition',
    assignee: 'OpenAI OpCo LLC',
    jurisdiction: 'USPTO',
    filingDate: '2025-03-14',
    grantDate: '2026-01-20',
    technologyCategory: 'Agentic AI',
    noveltyScore: 98,
    litigationRiskIndex: 'High',
    claimsCount: 24,
    priorArtCitationsCount: 42,
    abstractSnippet: 'System and method for directing a swarm of specialized language model agents via a shared memory state graph and dynamic tool execution policies.',
    keyClaims: [
      '1. A method comprising maintaining a global state graph representing sub-goals assigned to autonomous agent threads.',
      '2. The method of claim 1, wherein agents dynamically query vector embeddings to resolve dependencies without human intervention.'
    ]
  },
  {
    id: 'pat-109282',
    patentNumber: 'WO-2026-014920-A1',
    title: 'Sub-Milliwatt Neuromorphic Event-Driven Array for Sensor-Edge Inference',
    assignee: 'STMicroelectronics N.V. / ETH Zurich',
    jurisdiction: 'WIPO',
    filingDate: '2025-06-22',
    grantDate: '2026-02-10',
    technologyCategory: 'Edge AI & TinyML',
    noveltyScore: 94,
    litigationRiskIndex: 'Low',
    claimsCount: 18,
    priorArtCitationsCount: 19,
    abstractSnippet: 'Low-power spike-timing dependent plasticity neuromorphic core executing quantized 3B LLM token inference under 80 milliwatts power draw.',
    keyClaims: [
      '1. An integrated circuit comprising asynchronous spiking neurons configured for analog in-memory compute.',
      '2. The integrated circuit of claim 1, wherein weights are updated dynamically via energy-harvesting piezoelectric pulses.'
    ]
  },
  {
    id: 'pat-109283',
    patentNumber: 'EP-4,102,994-A1',
    title: 'High-Temperature Superconducting Magnet Array for Compact Tokamak Confinement',
    assignee: 'Commonwealth Fusion Systems',
    jurisdiction: 'EPO',
    filingDate: '2024-11-05',
    grantDate: '2025-12-18',
    technologyCategory: 'Fusion Energy',
    noveltyScore: 99,
    litigationRiskIndex: 'Moderate',
    claimsCount: 31,
    priorArtCitationsCount: 65,
    abstractSnippet: 'REBCO HTS tape winding architecture generating 25 Tesla magnetic fields to prevent plasma disruptions in compact D-T fusion reactors.',
    keyClaims: [
      '1. A magnet assembly comprising layered rare-earth barium copper oxide tapes maintaining superconducting stability above 20 Kelvin.'
    ]
  }
];

export class PatentMinerService {
  public getPatents(): PatentItem[] {
    return MOCK_PATENTS;
  }

  public calculateNoveltyRating(claimsCount: number, priorArtCount: number): number {
    return Math.min(100, Math.max(50, Math.round(100 - priorArtCount * 0.4 + claimsCount * 1.2)));
  }
}

export const patentMinerService = new PatentMinerService();
