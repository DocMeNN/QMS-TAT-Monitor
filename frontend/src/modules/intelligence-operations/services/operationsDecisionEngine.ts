// src/modules/intelligence-operations/services/operationsDecisionEngine.ts

import type {
  OperationalRiskAssessment,
} from "./operationsRiskEngine";

export interface ExecutiveDecision {
  recommendation: string;

  confidence: number;

  priority:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";
}

export class OperationsDecisionEngine {
  createDecision(
    risk: OperationalRiskAssessment
  ): ExecutiveDecision {
    return {
      recommendation:
        risk.recommendation,

      confidence:
        Math.min(
          100,
          risk.score + 10
        ),

      priority:
        risk.level,
    };
  }
}

export const operationsDecisionEngine =
  new OperationsDecisionEngine();

export default operationsDecisionEngine;