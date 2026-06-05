// src/modules/intelligence-history/types/history.types.ts

/**
 * Intelligence History Types
 * --------------------------------------------------
 * Persistent audit contracts for autonomous
 * intelligence execution.
 */

export type HistoryEventType =
  | "REQUEST_CREATED"
  | "ALERT_CREATED"
  | "INCIDENT_DETECTED"
  | "DECISION_CREATED"
  | "ACTION_CREATED"
  | "ACTION_EXECUTED"
  | "EXECUTION_PROPAGATED"
  | "COGNITIVE_SIGNAL";

export interface HistoryRecord {
  id: string;

  eventType: HistoryEventType;

  payload: unknown;

  timestamp: string;
}

export interface IntelligenceHistoryState {
  records: HistoryRecord[];

  totalRecords: number;

  lastRecordedAt: string | null;
}