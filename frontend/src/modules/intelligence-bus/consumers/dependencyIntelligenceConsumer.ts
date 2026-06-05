// src/modules/intelligence-bus/consumers/dependencyIntelligenceConsumer.ts

/**
 * Dependency Intelligence Consumer
 * --------------------------------------------------
 * Tracks dependency propagation risk.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";

export function registerDependencyIntelligenceConsumer() {
  const store =
    useIntelligenceStore.getState();

  store.registerConsumer(
    "EXECUTION_PROPAGATED",
    (event) => {
      const payload =
        typeof event.payload ===
          "object" &&
        event.payload !== null
          ? (event.payload as Record<
              string,
              unknown
            >)
          : {};

      const coordination =
        typeof payload.coordination ===
          "object" &&
        payload.coordination !== null
          ? (payload.coordination as Record<
              string,
              unknown
            >)
          : {};

      const dependencyRisk =
        Number(
          coordination.dependencyRisk ??
            50
        );

      console.log(
        "[Dependency Intelligence]",
        {
          dependencyRisk,
        }
      );

      store.emit({
        type:
          "COGNITIVE_SIGNAL",

        payload: {
          domain:
            "dependency-intelligence",

          dependencyRisk,
        },

        timestamp:
          new Date().toISOString(),
      });
    }
  );
}