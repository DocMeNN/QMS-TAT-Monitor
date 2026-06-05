// src/modules/intelligence-bus/index.ts

// Core
export { eventBus } from "./services/eventBus";
export { createEvent } from "./utils/createEvent";

// Store
export { useIntelligenceStore } from "./store/intelligenceStore";

// Services
export { propagate } from "./services/propagationEngine";

// Hooks
export { useIntelligenceBus } from "./hooks/useIntelligenceBus";
export { useSignalSubscription } from "./hooks/useSignalSubscription";

// Event factory
export * from "./events/eventFactory";

// Types
export type {
  IntelligenceEvent,
  IntelligenceState,
} from "./types/intelligence.types";