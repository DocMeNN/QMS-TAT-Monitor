// src/modules/intelligence-bus/services/signalRouter.ts

import type { IntelligenceEvent } from "../types/intelligence.types";

export function routeSignal(event: IntelligenceEvent) {
  console.log("Routing signal:", event.type);
}