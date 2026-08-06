export interface PitchDeckSlide {
  slideNumber: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  keyGraphicMetric: string;
}

export interface VenturePackage {
  id: string;
  startupName: string;
  tagline: string;
  targetSector: string;
  tamSize: string;
  samSize: string;
  somSize: string;
  paybackPeriodMonths: number;
  grossMarginPercentage: number;
  competitiveMoatRating: 'Unassailable (Network + IP)' | 'High (High Switching Cost)' | 'Moderate';
  pitchDeckSlides: PitchDeckSlide[];
}

export class VentureStudioService {
  public generateVenturePackage(opportunityTitle: string, category: string): VenturePackage {
    return {
      id: `ven-${Date.now()}`,
      startupName: `Aegis${category.split(' ')[0]} AI`,
      tagline: `Next-generation autonomous enterprise platform for ${opportunityTitle}`,
      targetSector: category,
      tamSize: '$120 Billion',
      samSize: '$24.5 Billion',
      somSize: '$3.8 Billion',
      paybackPeriodMonths: 7,
      grossMarginPercentage: 84,
      competitiveMoatRating: 'Unassailable (Network + IP)',
      pitchDeckSlides: [
        { slideNumber: 1, title: 'Title & Vision', subtitle: 'Democratizing enterprise intelligence', bulletPoints: ['AI-native infrastructure', 'Zero-friction deployment'], keyGraphicMetric: '$120B TAM' },
        { slideNumber: 2, title: 'The Problem', subtitle: 'Enterprise workflows are bottlenecked', bulletPoints: ['Manual compliance loops cost $4M/yr', 'High risk of agent hallucinations'], keyGraphicMetric: '85% Inefficiency' },
        { slideNumber: 3, title: 'The Solution', subtitle: 'Autonomous execution engine', bulletPoints: ['Deterministic execution guardrails', 'Real-time state graph visualization'], keyGraphicMetric: '10x Faster' },
        { slideNumber: 4, title: 'Market Sizing (TAM/SAM/SOM)', subtitle: 'Exponential adoption curve', bulletPoints: ['TAM: $120B Global IT', 'SAM: $24.5B Enterprise AI', 'SOM: $3.8B Year 3 Goal'], keyGraphicMetric: '$24.5B SAM' },
        { slideNumber: 5, title: 'Product & Architecture', subtitle: 'Rust-based sub-millisecond proxy', bulletPoints: ['eBPF kernel-level inspection', 'LangChain & AutoGPT SDK support'], keyGraphicMetric: '<2ms Latency' },
        { slideNumber: 6, title: 'Business Model & Economics', subtitle: 'High margin B2B SaaS', bulletPoints: ['Annual recurring license + consumption tier', '84% Gross Margins', '7 Month CAC Payback'], keyGraphicMetric: '84% Margins' },
        { slideNumber: 7, title: 'Go-to-Market Strategy', subtitle: 'Developer-led bottom-up adoption', bulletPoints: ['Open-source SDK freemium', 'Enterprise SOC2 compliant upgrade'], keyGraphicMetric: '3.4x LTV/CAC' },
        { slideNumber: 8, title: 'Competitive Moat', subtitle: 'Defensible IP and network effects', bulletPoints: ['2 Granted USPTO patents', 'High customer switching costs'], keyGraphicMetric: '2 Patents' },
        { slideNumber: 9, title: 'Financial Projections', subtitle: 'Path to $100M ARR in 4 years', bulletPoints: ['Year 1: $4.2M ARR', 'Year 2: $18.5M ARR', 'Year 3: $52.0M ARR', 'Year 4: $110.0M ARR'], keyGraphicMetric: '$110M ARR' },
        { slideNumber: 10, title: 'The Ask & Seed Round', subtitle: 'Raising $6M Seed Round', bulletPoints: ['50% Engineering & R&D', '30% Enterprise Sales', '20% Security Audit Compliance'], keyGraphicMetric: '$6M Seed' }
      ]
    };
  }
}

export const ventureStudioService = new VentureStudioService();
