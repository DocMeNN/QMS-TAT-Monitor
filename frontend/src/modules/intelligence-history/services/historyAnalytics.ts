// src/modules/intelligence-history/services/historyAnalytics.ts

/**
 * History Analytics
 * --------------------------------------------------
 * Provides intelligence audit metrics.
 */

import {
  useIntelligenceHistoryStore,
} from "../store/intelligenceHistoryStore";

export class HistoryAnalytics {
  totalEvents(): number {
    return (
      useIntelligenceHistoryStore
        .getState()
        .totalRecords
    );
  }

  latestEventType():
    | string
    | null {
    const records =
      useIntelligenceHistoryStore
        .getState()
        .records;

    return records.length
      ? records[0].eventType
      : null;
  }

  eventBreakdown() {
    const records =
      useIntelligenceHistoryStore
        .getState()
        .records;

    return records.reduce(
      (
        accumulator,
        record
      ) => {
        accumulator[
          record.eventType
        ] =
          (accumulator[
            record.eventType
          ] ?? 0) + 1;

        return accumulator;
      },
      {} as Record<
        string,
        number
      >
    );
  }
}

export const historyAnalytics =
  new HistoryAnalytics();