// src/modules/intelligence-bus/consumers/rollbackArbitrationConsumer.ts

/**
 * Rollback Arbitration Consumer
 * --------------------------------------------------
 * Determines whether rollback actions
 * should be considered after execution.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";

export function registerRollbackArbitrationConsumer() {
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

      const action =
        typeof payload.action ===
          "object" &&
        payload.action !== null
          ? (payload.action as Record<
              string,
              unknown
            >)
          : {};

      const severity =
        Number(
          action.severity ?? 0
        );

      const rollbackRequired =
        severity >= 95;

      console.log(
        "[Rollback Arbitration]",
        {
          rollbackRequired,
        }
      );

      store.emit({
        type:
          "COGNITIVE_SIGNAL",

        payload: {
          domain:
            "rollback-arbitration",

          rollbackRequired,
        },

        timestamp:
          new Date().toISOString(),
      });
    }
  );
}