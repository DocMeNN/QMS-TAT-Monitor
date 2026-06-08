// src/modules/intelligence-operations/services/operationsRiskEngine.ts

import type {
  OperationAction,
} from "../types/operations.types";

export interface OperationalRiskAssessment {
  score: number;

  level:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";

  recommendation: string;
}

export class OperationsRiskEngine {
  assess(
    operations: OperationAction[]
  ): OperationalRiskAssessment {
    const criticalCount =
      operations.filter(
        (operation) =>
          operation.severity ===
          "CRITICAL"
      ).length;

    const failedCount =
      operations.filter(
        (operation) =>
          operation.status ===
          "FAILED"
      ).length;

    const score =
      Math.min(
        100,
        criticalCount * 20 +
          failedCount * 10
      );

    const level =
      score >= 80
        ? "CRITICAL"
        : score >= 60
        ? "HIGH"
        : score >= 30
        ? "MEDIUM"
        : "LOW";

    const recommendation =
      score >= 80
        ? "Immediate escalation required"
        : score >= 60
        ? "Initiate mitigation"
        : score >= 30
        ? "Enhanced monitoring"
        : "Normal operations";

    return {
      score,
      level,
      recommendation,
    };
  }
}

export const operationsRiskEngine =
  new OperationsRiskEngine();

export default operationsRiskEngine;