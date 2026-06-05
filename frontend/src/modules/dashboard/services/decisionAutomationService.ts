// src/modules/dashboard/services/decisionAutomationService.ts

export interface DecisionAutomationMetrics {
  automationConfidence: number;
  activeDecisions: number;
  interventionsExecuted: number;
  approvalLatency: number;
}

export function getDecisionAutomationMetrics(): DecisionAutomationMetrics {
  return {
    automationConfidence: 94,
    activeDecisions: 18,
    interventionsExecuted: 142,
    approvalLatency: 1.2
  };
}