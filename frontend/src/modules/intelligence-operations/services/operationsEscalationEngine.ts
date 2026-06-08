// src/modules/intelligence-operations/services/operationsEscalationEngine.ts

import type {
  ExecutiveDecision,
} from "./operationsDecisionEngine";

export interface EscalationResult {
  escalated: boolean;

  message: string;
}

export class OperationsEscalationEngine {
  evaluate(
    decision: ExecutiveDecision
  ): EscalationResult {
    if (
      decision.priority ===
        "HIGH" ||
      decision.priority ===
        "CRITICAL"
    ) {
      return {
        escalated: true,
        message:
          "Executive escalation triggered",
      };
    }

    return {
      escalated: false,
      message:
        "No escalation required",
    };
  }
}

export const operationsEscalationEngine =
  new OperationsEscalationEngine();

export default operationsEscalationEngine;