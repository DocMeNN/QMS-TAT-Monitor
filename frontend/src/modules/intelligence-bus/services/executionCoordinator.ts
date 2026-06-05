// src/modules/intelligence-bus/services/executionCoordinator.ts

/**
 * Execution Coordinator
 * --------------------------------------------------
 * Cross-module intelligence propagation engine.
 *
 * Receives completed autonomous executions and
 * synchronizes downstream intelligence domains.
 */

import {
  useDashboardStore,
} from "../../dashboard/store/dashboardStore";

export interface ExecutionCoordinationResult {
  strategyConfidence: number;
  slaProtection: number;
  escalationRisk: number;
  dependencyRisk: number;
  recommendation: string;
}

export class ExecutionCoordinator {
  coordinate(
    severity: number
  ): ExecutionCoordinationResult {
    const strategyConfidence =
      Math.min(
        100,
        Math.round(
          50 + severity * 0.4
        )
      );

    const slaProtection =
      Math.min(
        100,
        Math.round(
          60 + severity * 0.3
        )
      );

    const escalationRisk =
      Math.min(
        100,
        Math.round(
          severity * 0.9
        )
      );

    const dependencyRisk =
      Math.min(
        100,
        Math.round(
          severity * 0.7
        )
      );

    const recommendation =
      severity >= 90
        ? "Immediate Executive Oversight"
        : severity >= 75
        ? "Enhanced Mitigation"
        : severity >= 50
        ? "Continuous Monitoring"
        : "Normal Operations";

    return {
      strategyConfidence,
      slaProtection,
      escalationRisk,
      dependencyRisk,
      recommendation,
    };
  }

  apply(
    severity: number
  ): ExecutionCoordinationResult {
    const result =
      this.coordinate(
        severity
      );

    const dashboard =
      useDashboardStore.getState();

    dashboard.updateExecutiveDecision(
      {
        recommendation:
          result.recommendation,

        confidence:
          result.strategyConfidence /
          100,
      }
    );

    return result;
  }
}

export const executionCoordinator =
  new ExecutionCoordinator();