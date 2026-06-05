// src/modules/intelligence-history/services/decisionReplayEngine.ts

import type { HistoryRecord } from "../types/history.types";

export interface ReplayStep {
  eventType: string;
  timestamp: string;
  description: string;
  payload?: unknown;
}

export interface ReplayResult {
  totalSteps: number;
  generatedAt: string;
  steps: ReplayStep[];
}

export class DecisionReplayEngine {
  static replay(
    history: HistoryRecord[]
  ): ReplayResult {
    const records = [...history].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() -
        new Date(b.timestamp).getTime()
    );

    const steps: ReplayStep[] =
      records.map((record) => ({
        eventType: record.eventType,
        timestamp: record.timestamp,
        description: this.describe(record),
        payload: record.payload,
      }));

    return {
      totalSteps: steps.length,
      generatedAt: new Date().toISOString(),
      steps,
    };
  }

  private static describe(
    record: HistoryRecord
  ): string {
    switch (record.eventType) {
      case "REQUEST_CREATED":
        return "Request entered into autonomous runtime";

      case "ALERT_CREATED":
        return "Alert intelligence generated";

      case "INCIDENT_DETECTED":
        return "Incident prediction calculated";

      case "DECISION_CREATED":
        return "Executive recommendation produced";

      case "ACTION_CREATED":
        return "Execution action generated";

      case "ACTION_EXECUTED":
        return "Execution action completed";

      case "EXECUTION_PROPAGATED":
        return "Execution outcome propagated";

      case "COGNITIVE_SIGNAL":
        return "Cognitive arbitration signal produced";

      default:
        return record.eventType;
    }
  }
}