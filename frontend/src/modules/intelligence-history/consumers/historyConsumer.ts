// src/modules/intelligence-history/consumers/historyConsumer.ts

/**
 * History Consumer
 * --------------------------------------------------
 * Records all intelligence activity into the
 * autonomous audit layer.
 */

import {
  historyRecorder,
} from "../services/historyRecorder";

import {
  useIntelligenceHistoryStore,
} from "../store/intelligenceHistoryStore";

import {
  useIntelligenceStore,
} from "../../intelligence-bus/store/intelligenceStore";

import type {
  HistoryEventType,
} from "../types/history.types";

const TRACKED_EVENTS: HistoryEventType[] =
  [
    "REQUEST_CREATED",
    "ALERT_CREATED",
    "INCIDENT_DETECTED",
    "DECISION_CREATED",
    "ACTION_CREATED",
    "ACTION_EXECUTED",
    "EXECUTION_PROPAGATED",
    "COGNITIVE_SIGNAL",
  ];

export function registerHistoryConsumer() {
  const intelligenceStore =
    useIntelligenceStore.getState();

  TRACKED_EVENTS.forEach(
    (eventType) => {
      intelligenceStore.registerConsumer(
        eventType,
        (event) => {
          const record =
            historyRecorder.createRecord(
              eventType,
              event.payload
            );

          useIntelligenceHistoryStore
            .getState()
            .addRecord(
              record
            );

          console.log(
            "[History Consumer]",
            record
          );
        }
      );
    }
  );
}