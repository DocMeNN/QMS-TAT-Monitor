// src/modules/intelligence-bus/types/intelligence.types.ts

/**
 * Intelligence Bus Types
 * --------------------------------------------------
 * Canonical event contracts for autonomous cognition.
 */

export type IntelligenceEventType =
  | "REQUEST_CREATED"
  | "ALERT_CREATED"
  | "INCIDENT_DETECTED"
  | "DECISION_CREATED"
  | "ORCHESTRATION_TRIGGERED"
  | "ACTION_CREATED"
  | "ACTION_EXECUTED"
  | "ALERT_RAISED"
  | "DECISION_TRIGGERED"
  | "METRICS_UPDATED"
  | "SYSTEM_HEALTH_CHANGED"
  | "COGNITIVE_SIGNAL"
  | "EXECUTION_PROPAGATED";

export interface IntelligenceEvent {
  type: IntelligenceEventType;
  payload: unknown;
  timestamp: string;
}

export interface IntelligenceState {
  systemHealth: string;
  alerts: unknown[];
  decisions: unknown[];
  signals: IntelligenceEvent[];
}