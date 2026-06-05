// src/modules/intelligence-bus/services/propagationEngine.ts

import { routeSignal } from "./signalRouter";

import type {
  IntelligenceEvent,
} from "../types/intelligence.types";

export function propagate(
  event: IntelligenceEvent
) {
  if (!event?.type) return;

  routeSignal(event);
}