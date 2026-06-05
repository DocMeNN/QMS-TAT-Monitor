// src/modules/intelligence-history/services/historyRecorder.ts

/**
 * History Recorder
 * --------------------------------------------------
 * Creates immutable intelligence history records.
 */

import type {
  HistoryEventType,
  HistoryRecord,
} from "../types/history.types";

export class HistoryRecorder {
  createRecord(
    eventType: HistoryEventType,
    payload: unknown
  ): HistoryRecord {
    return {
      id: crypto.randomUUID(),

      eventType,

      payload,

      timestamp:
        new Date().toISOString(),
    };
  }
}

export const historyRecorder =
  new HistoryRecorder();