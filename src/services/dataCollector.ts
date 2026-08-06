import { GlobalDataSource } from '../types';
import { GLOBAL_DATA_SOURCES } from '../data/technologiesData';

export class DataCollectorService {
  private sources: GlobalDataSource[] = [...GLOBAL_DATA_SOURCES];

  public getSources(): GlobalDataSource[] {
    return this.sources;
  }

  public getSourcesByCategory(category: GlobalDataSource['category']): GlobalDataSource[] {
    return this.sources.filter(s => s.category === category);
  }

  public getTotalDataPointsPerMinute(): number {
    return this.sources.reduce((acc, curr) => acc + curr.dataPointsPerMin, 0);
  }

  public getTotalWeakSignals(): number {
    return this.sources.reduce((acc, curr) => acc + curr.weakSignalsCount, 0);
  }

  public getAverageSignalQuality(): number {
    const total = this.sources.reduce((acc, curr) => acc + curr.signalQuality, 0);
    return Math.round(total / this.sources.length);
  }

  public simulateLiveStreamUpdate(): GlobalDataSource[] {
    this.sources = this.sources.map(src => {
      const deltaPoints = Math.floor((Math.random() - 0.4) * 200);
      const newPoints = Math.max(100, src.dataPointsPerMin + deltaPoints);
      const newWeakSignals = Math.max(5, src.weakSignalsCount + (Math.random() > 0.7 ? 1 : 0));
      return {
        ...src,
        dataPointsPerMin: newPoints,
        weakSignalsCount: newWeakSignals,
        lastSync: 'Just now'
      };
    });
    return this.sources;
  }
}

export const dataCollectorService = new DataCollectorService();
