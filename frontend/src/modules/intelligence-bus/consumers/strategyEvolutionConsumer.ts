// src/modules/intelligence-bus/consumers/strategyEvolutionConsumer.ts

/**
 * Strategy Evolution Consumer
 * --------------------------------------------------
 * Learns from execution propagation events and
 * continuously evolves autonomous strategy confidence.
 */

import { useDashboardStore } from "../../dashboard/store/dashboardStore";

import { useIntelligenceStore } from "../store/intelligenceStore";

export function registerStrategyEvolutionConsumer() {
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

      const confidence =
        Number(
          coordination.strategyConfidence ??
            50
        );

      const dashboard =
        useDashboardStore.getState();

      dashboard.updateExecutiveDecision(
        {
          recommendation:
            confidence >= 90
              ? "Autonomous Optimization"
              : confidence >= 75
              ? "Enhanced Mitigation"
              : confidence >= 50
              ? "Continuous Monitoring"
              : "Manual Review",

          confidence:
            confidence / 100,
        }
      );

      console.log(
        "[Strategy Evolution]",
        {
          confidence,
        }
      );

      store.emit({
        type:
          "COGNITIVE_SIGNAL",

        payload: {
          domain:
            "strategy-evolution",

          confidence,

          recommendation:
            confidence >= 90
              ? "Autonomous Optimization"
              : confidence >= 75
              ? "Enhanced Mitigation"
              : confidence >= 50
              ? "Continuous Monitoring"
              : "Manual Review",
        },

        timestamp:
          new Date().toISOString(),
      });
    }
  );
}