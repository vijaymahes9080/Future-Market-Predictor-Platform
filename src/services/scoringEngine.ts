import { TechnologyItem, TrendScores } from '../types';

export class ScoringEngineService {
  /**
   * Recalculates all 14 scores for a technology using dynamic weightings
   */
  public calculateTrendScores(tech: Partial<TechnologyItem>): TrendScores {
    const researchG = tech.researchGrowth ?? 100;
    const patentG = tech.patentGrowth ?? 100;
    const fundingG = tech.fundingGrowth ?? 100;
    const githubG = tech.gitHubGrowth ?? 100;
    const devAdoption = tech.developerAdoption ?? 70;
    const enterpriseAdoption = tech.enterpriseAdoption ?? 50;
    const cagr = tech.predictedCAGR ?? 30;
    const confidence = tech.confidencePercentage ?? 90;

    // Normalize metrics to 0-100 scores
    const innovationScore = Math.min(100, Math.round((researchG * 0.4 + patentG * 0.4 + githubG * 0.2) * 0.5));
    const marketScore = Math.min(100, Math.round((cagr * 1.8 + enterpriseAdoption * 0.4)));
    const patentScore = Math.min(100, Math.round(patentG * 0.6 + 10));
    const researchScore = Math.min(100, Math.round(researchG * 0.6 + 10));
    const fundingScore = Math.min(100, Math.round(fundingG * 0.5 + 10));
    const developerScore = Math.min(100, Math.round(devAdoption * 0.7 + githubG * 0.15));
    const communityScore = Math.min(100, Math.round((tech.communityGrowth ?? 150) * 0.4 + 20));
    const startupScore = Math.min(100, Math.round(fundingG * 0.4 + (tech.growthRate ?? 100) * 0.2));
    const enterpriseScore = Math.min(100, Math.round(enterpriseAdoption * 0.9 + 10));
    const investmentScore = Math.min(100, Math.round((fundingScore * 0.6 + marketScore * 0.4)));
    const commercialScore = Math.min(100, Math.round((enterpriseScore * 0.5 + marketScore * 0.5)));
    const futurePotentialScore = Math.min(100, Math.round((innovationScore * 0.4 + researchScore * 0.3 + confidence * 0.3)));
    
    // Risk score higher if research is early stage or market size is small
    const riskScore = Math.min(100, Math.max(10, Math.round(100 - (enterpriseAdoption * 0.5 + confidence * 0.4))));

    // Weighted Overall Opportunity Score
    const overallOpportunityScore = Math.min(
      100,
      Math.round(
        innovationScore * 0.15 +
        marketScore * 0.15 +
        fundingScore * 0.15 +
        futurePotentialScore * 0.20 +
        commercialScore * 0.15 +
        developerScore * 0.10 +
        (100 - riskScore) * 0.10
      )
    );

    return {
      innovationScore,
      marketScore,
      patentScore,
      researchScore,
      fundingScore,
      developerScore,
      communityScore,
      startupScore,
      enterpriseScore,
      investmentScore,
      commercialScore,
      futurePotentialScore,
      riskScore,
      overallOpportunityScore
    };
  }
}

export const scoringEngineService = new ScoringEngineService();
