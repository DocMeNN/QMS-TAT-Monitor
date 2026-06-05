//src/modules/dashboard/types/strategyEvolution.ts

export interface StrategyDecision {
  nodeId: string;
  selectedStrategy: string;
  confidence: number;
  alternatives: string[];
  timestamp: number;
}