//src/modules/dashboard/types/recoveryLearning.ts

export interface RecoveryOutcome {
  actionId: string;
  nodeId: string;
  strategy: string;
  degradationScore: number;
  recoveryTime: number;
  success: boolean;
  timestamp: number;
}

export interface RecoveryPattern {
  strategy: string;
  attempts: number;
  successes: number;
  averageRecoveryTime: number;
  confidenceScore: number;
}