// src/modules/audit-persistence/services/decisionArchive.ts

import { useAuditStore } from "../store/auditStore";

import type {
  DecisionArchiveRecord,
} from "../types/audit.types";

export class DecisionArchive {
  archive(
    record: DecisionArchiveRecord
  ) {
    useAuditStore
      .getState()
      .addDecisionArchive(
        record
      );
  }

  getArchives() {
    return useAuditStore
      .getState()
      .decisionArchives;
  }

  totalArchives() {
    return this
      .getArchives()
      .length;
  }
}

export const decisionArchive =
  new DecisionArchive();