// src/modules/intelligence-bus/consumers/executionConsumer.ts

/**
 * Execution Consumer
 * --------------------------------------------------
 * Final autonomous execution layer.
 * Converts executive decisions into executable actions.
 * Also propagates execution intelligence across
 * autonomous modules.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";

import {
  actionEngine,
} from "../services/actionEngine";

import {
  executionCoordinator,
} from "../services/executionCoordinator";

import {
  useDashboardStore,
} from "../../dashboard/store/dashboardStore";

export function registerExecutionConsumer() {
  const store =
    useIntelligenceStore.getState();

  store.registerConsumer(
    "DECISION_CREATED",
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

      const decision =
        String(
          payload.executiveDecision ??
            "Normal Operation"
        );

      const action =
        actionEngine.createAction(
          decision
        );

      useDashboardStore
        .getState()
        .addExecution({
          id: crypto.randomUUID(),

          actionType:
            action.type,

          title:
            action.title,

          status:
            "success",

          severity:
            action.severity,

          executedAt:
            action.createdAt,
        });

      const coordination =
        executionCoordinator.apply(
          action.severity
        );

      console.log(
        "[Execution Consumer]",
        action
      );

      console.log(
        "[Execution Coordination]",
        coordination
      );

      store.emit({
        type: "ACTION_CREATED",

        payload: {
          ...payload,
          action,
        },

        timestamp:
          new Date().toISOString(),
      });

      store.emit({
        type: "ACTION_EXECUTED",

        payload: {
          ...payload,
          action,
          coordination,
          executionStatus:
            "success",
        },

        timestamp:
          new Date().toISOString(),
      });

      store.emit({
        type:
          "EXECUTION_PROPAGATED",

        payload: {
          ...payload,
          action,
          coordination,
        },

        timestamp:
          new Date().toISOString(),
      });
    }
  );
}