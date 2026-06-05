// src/modules/intelligence-history/services/auditEngine.ts

import type { HistoryRecord } from "../types/history.types";

export interface AuditSummary {
  totalEvents: number;
  executedActions: number;
  propagatedExecutions: number;
  cognitiveSignals: number;
  latestTimestamp: string | null;
}

export class AuditEngine {
  generate(
    records: HistoryRecord[]
  ): AuditSummary {
    return {
      totalEvents: records.length,

      executedActions: records.filter(
        (record) =>
          record.eventType === "ACTION_EXECUTED"
      ).length,

      propagatedExecutions: records.filter(
        (record) =>
          record.eventType ===
          "EXECUTION_PROPAGATED"
      ).length,

      cognitiveSignals: records.filter(
        (record) =>
          record.eventType ===
          "COGNITIVE_SIGNAL"
      ).length,

      latestTimestamp:
        records.length > 0
          ? records[0].timestamp
          : null,
    };
  }
}

export const auditEngine =
  new AuditEngine();