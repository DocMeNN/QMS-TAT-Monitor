// src/modules/intelligence-bus/events/eventFactory.ts

import type {
  IntelligenceEvent,
  IntelligenceEventType,
} from "../types/intelligence.types";

export function createEvent(
  type: IntelligenceEventType,
  payload: unknown
): IntelligenceEvent {
  return {
    type,
    payload,
    timestamp: new Date().toISOString(),
  };
}