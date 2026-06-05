// src/modules/audit-persistence/store/auditStore.ts

import { create } from "zustand";

import type {
  AuditRecord,
  DecisionArchiveRecord,
  ExecutionArchiveRecord,
} from "../types/audit.types";

interface AuditStoreState {
  auditRecords: AuditRecord[];

  decisionArchives: DecisionArchiveRecord[];

  executionArchives: ExecutionArchiveRecord[];

  addAuditRecord: (
    record: AuditRecord
  ) => void;

  addDecisionArchive: (
    record: DecisionArchiveRecord
  ) => void;

  addExecutionArchive: (
    record: ExecutionArchiveRecord
  ) => void;

  clearArchives: () => void;
}

export const useAuditStore =
  create<AuditStoreState>(
    (set) => ({
      auditRecords: [],

      decisionArchives: [],

      executionArchives: [],

      addAuditRecord: (record) =>
        set((state) => ({
          auditRecords: [
            record,
            ...state.auditRecords,
          ],
        })),

      addDecisionArchive: (
        record
      ) =>
        set((state) => ({
          decisionArchives: [
            record,
            ...state.decisionArchives,
          ],
        })),

      addExecutionArchive: (
        record
      ) =>
        set((state) => ({
          executionArchives: [
            record,
            ...state.executionArchives,
          ],
        })),

      clearArchives: () =>
        set({
          auditRecords: [],
          decisionArchives: [],
          executionArchives: [],
        }),
    })
  );