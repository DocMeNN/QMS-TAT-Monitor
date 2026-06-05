// src/modules/intelligence-bus/events/eventRegistry.ts

import type { IntelligenceEventType } from "../types/intelligence.types";

export const EVENT_REGISTRY: IntelligenceEventType[] = [
  "ALERT_RAISED",
  "DECISION_TRIGGERED",
  "METRICS_UPDATED",
  "SYSTEM_HEALTH_CHANGED",
  "COGNITIVE_SIGNAL",
  "EXECUTION_PROPAGATED",
];