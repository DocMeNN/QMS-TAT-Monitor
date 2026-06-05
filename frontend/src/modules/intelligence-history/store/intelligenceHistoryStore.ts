// src/modules/intelligence-history/store/intelligenceHistoryStore.ts

/**
 * Intelligence History Store
 * --------------------------------------------------
 * Central audit memory for autonomous intelligence.
 */

import { create } from "zustand";

import type {
  HistoryRecord,
  IntelligenceHistoryState,
} from "../types/history.types";

interface HistoryStore
  extends IntelligenceHistoryState {
  addRecord: (
    record: HistoryRecord
  ) => void;

  clearHistory: () => void;
}

export const useIntelligenceHistoryStore =
  create<HistoryStore>(
    (set) => ({
      records: [],

      totalRecords: 0,

      lastRecordedAt: null,

      addRecord: (
        record
      ) =>
        set((state) => ({
          records: [
            record,
            ...state.records,
          ].slice(0, 5000),

          totalRecords:
            state.totalRecords + 1,

          lastRecordedAt:
            record.timestamp,
        })),

      clearHistory: () =>
        set({
          records: [],
          totalRecords: 0,
          lastRecordedAt: null,
        }),
    })
  );