export type TimeHorizon = '6m' | '1y' | '3y' | '5y' | '10y';

export type TechnologyCategory = 
  | 'Artificial Intelligence'
  | 'Robotics & Automation'
  | 'Quantum & Deep Computing'
  | 'Energy & Cleantech'
  | 'Biotech & Synthetic Biology'
  | 'Neurotech & Health'
  | 'Spatial Computing & XR'
  | 'Web3 & Cryptography'
  | 'Space & Aerospace'
  | 'Advanced Materials & Hardware'
  | 'Connectivity & 6G'
  | 'Food & AgriTech';

export interface TrendScores {
  innovationScore: number;       // 0-100
  marketScore: number;           // 0-100
  patentScore: number;           // 0-100
  researchScore: number;         // 0-100
  fundingScore: number;          // 0-100
  developerScore: number;        // 0-100
  communityScore: number;        // 0-100
  startupScore: number;          // 0-100
  enterpriseScore: number;       // 0-100
  investmentScore: number;       // 0-100
  commercialScore: number;       // 0-100
  futurePotentialScore: number;  // 0-100
  riskScore: number;             // 0-100 (higher = riskier)
  overallOpportunityScore: number; // 0-100 weighted combined
}

export interface HorizonForecast {
  expectedMarketSize: string; // e.g. "$45.2B"
  cagrPercentage: number;     // e.g. 34.5
  confidenceScore: number;   // 0-100
  adoptionStage: 'Emerging' | 'Early Growth' | 'Hyper-Growth' | 'Mainstream' | 'Ubiquitous';
  keyBreakthroughs: string[];
  disruptionPotential: 'Low' | 'Moderate' | 'High' | 'Transformational' | 'Existential';
}

export interface TechnologyItem {
  id: string;
  technologyName: string;
  category: TechnologyCategory;
  description: string;
  currentStatus: string;
  futurePrediction: string;
  confidencePercentage: number;
  currentMarketSize: string;
  predictedCAGR: number;
  
  // Growth Metrics (% YoY)
  growthRate: number;
  researchGrowth: number;
  patentGrowth: number;
  fundingGrowth: number;
  gitHubGrowth: number;
  developerAdoption: number;
  communityGrowth: number;
  openSourceActivity: number;
  enterpriseAdoption: number;
  governmentInvestments: string;
  searchTrendVelocity: number;
  newsFrequency: number;

  // Horizon Projections
  horizonForecasts: Record<TimeHorizon, HorizonForecast>;

  // Key Entities & Ecosystem
  majorCompanies: string[];
  leadingUniversities: string[];
  leadingResearchers: string[];
  leadingStartups: string[];
  keyInvestors: string[];
  topCountriesInvesting: string[];

  // Qualitative Analysis
  futureApplications: string[];
  riskFactors: string[];
  commercialPotential: string;
  maturityLevel: string;

  // Scores
  scores: TrendScores;

  // Linked Future Jobs & Opportunities
  futureJobs: string[];
  businessOpportunities: string[];
  investmentRecommendation: 'Strong Buy / High Priority' | 'Strategic Buy' | 'Watchlist' | 'Speculative High-Risk';
  evidenceCitations: EvidenceCitation[];
}

export interface EvidenceCitation {
  id: string;
  sourceName: string; // e.g., 'arXiv', 'USPTO', 'GitHub', 'Crunchbase'
  title: string;
  url: string;
  date: string;
  confidenceContribution: number;
  snippet: string;
}

export interface FutureJob {
  id: string;
  jobTitle: string;
  relatedTechnologyId: string;
  relatedTechnologyName: string;
  growthProbability: number; // 0-100 %
  expectedSalaryRange: string; // e.g., "$160,000 - $280,000"
  demandScore: number; // 0-100
  automationRiskScore: number; // 0-100
  requiredSkills: string[];
  learningPath: string[];
  certificationRoadmap: string[];
  topHiringCountries: string[];
  topHiringCompanies: string[];
  remoteOpportunitiesPercentage: number;
  freelancePotential: 'High' | 'Medium' | 'Low';
  peakDemandYears: string; // e.g. "2027 - 2035"
}

export interface BusinessOpportunity {
  id: string;
  title: string;
  category: string;
  targetSector: string;
  problemStatement: string;
  proposedSolution: string;
  targetAudience: string;
  businessModel: 'B2B SaaS' | 'B2C Platform' | 'AI Agent Marketplace' | 'Hardware + Software' | 'DeepTech Infrastructure' | 'GovTech Protocol';
  roiPotential: 'Extreme (>50x)' | 'Very High (20-50x)' | 'High (5-20x)' | 'Moderate';
  marketGapScore: number; // 0-100
  unicornProbability: number; // 0-100 %
  underservedNeeds: string[];
  recommendedTechStack: string[];
  keyCompetitors: string[];
}

export interface InvestmentTrend {
  id: string;
  sectorName: string;
  totalFundingYTD: string;
  vcGrowthRateYoY: number;
  angelActivityScore: number;
  governmentGrantsVolume: string;
  corporateMnaVolume: string;
  ipoPotentialScore: number;
  topInvestableStartups: { name: string; valuation: string; leadInvestors: string; stage: string }[];
  emergingHubs: { country: string; city: string; ecosystemScore: number }[];
}

export interface AgentStatus {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'idle' | 'analyzing' | 'mining' | 'synthesizing' | 'complete';
  lastActive: string;
  findingsCount: number;
  currentTask: string;
  confidenceScore: number;
  thoughtLog: string[];
}

export interface GlobalDataSource {
  id: number;
  name: string;
  category: 'Search & Social' | 'Academic & Papers' | 'Patents & IP' | 'Open Source & Dev' | 'VC & Financial' | 'Government & Global';
  status: 'Active Live Stream' | 'Synced' | 'High Velocity' | 'Processing';
  dataPointsPerMin: number;
  signalQuality: number; // 0-100
  lastSync: string;
  weakSignalsCount: number;
}

export interface IntelligenceReport {
  id: string;
  title: string;
  period: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';
  generatedDate: string;
  executiveSummary: string;
  topExplodingTech: string[];
  keyWeakSignals: string[];
  vcInvestmentShift: string;
  workforceImplications: string;
  strategicRecommendations: string[];
  citationsCount: number;
}
