// src/modules/intelligence-bus/store/intelligenceStore.ts

import { create } from "zustand";

import type {
  IntelligenceEvent,
  IntelligenceState,
} from "../types/intelligence.types";

type ConsumerCallback = (
  event: IntelligenceEvent
) => void;

interface RuntimeMetrics {
  totalSignals: number;
  totalAlerts: number;
  totalDecisions: number;
  totalExecutions: number;
  lastSignalAt: string | null;
}

interface IntelligenceStore
  extends IntelligenceState {
  emit: (
    event: IntelligenceEvent
  ) => void;

  registerConsumer: (
    eventType: string,
    callback: ConsumerCallback
  ) => void;

  consumers: Record<
    string,
    ConsumerCallback[]
  >;

  runtime: RuntimeMetrics;
}

export const useIntelligenceStore =
  create<IntelligenceStore>(
    (set, get) => ({
      systemHealth: "healthy",

      alerts: [],

      decisions: [],

      signals: [],

      consumers: {},

      runtime: {
        totalSignals: 0,
        totalAlerts: 0,
        totalDecisions: 0,
        totalExecutions: 0,
        lastSignalAt: null,
      },

      emit: (event) => {
        const state = get();

        const listeners =
          state.consumers[
            event.type
          ] ?? [];

        listeners.forEach(
          (callback) =>
            callback(event)
        );

        set((current) => {
          const nextAlerts =
            event.type ===
            "ALERT_CREATED"
              ? [
                  ...current.alerts,
                  event,
                ]
              : current.alerts;

          const nextDecisions =
            event.type ===
            "DECISION_CREATED"
              ? [
                  ...current.decisions,
                  event,
                ]
              : current.decisions;

          return {
            alerts: nextAlerts,

            decisions:
              nextDecisions,

            signals: [
              ...current.signals,
              event,
            ],

            runtime: {
              totalSignals:
                current.runtime
                  .totalSignals + 1,

              totalAlerts:
                event.type ===
                "ALERT_CREATED"
                  ? current.runtime
                      .totalAlerts + 1
                  : current.runtime
                      .totalAlerts,

              totalDecisions:
                event.type ===
                "DECISION_CREATED"
                  ? current.runtime
                      .totalDecisions + 1
                  : current.runtime
                      .totalDecisions,

              totalExecutions:
                current.runtime
                  .totalExecutions + 1,

              lastSignalAt:
                new Date().toISOString(),
            },
          };
        });
      },

      registerConsumer: (
        eventType,
        callback
      ) =>
        set((state) => ({
          consumers: {
            ...state.consumers,

            [eventType]: [
              ...(
                state.consumers[
                  eventType
                ] ?? []
              ),
              callback,
            ],
          },
        })),
    })
  );