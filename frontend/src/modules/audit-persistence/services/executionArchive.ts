// src/modules/audit-persistence/services/executionArchive.ts

import { useAuditStore } from "../store/auditStore";

import type {
  ExecutionArchiveRecord,
} from "../types/audit.types";

export class ExecutionArchive {
  archive(
    record: ExecutionArchiveRecord
  ) {
    useAuditStore
      .getState()
      .addExecutionArchive(
        record
      );
  }

  getArchives() {
    return useAuditStore
      .getState()
      .executionArchives;
  }

  totalArchives() {
    return this
      .getArchives()
      .length;
  }
}

export const executionArchive =
  new ExecutionArchive();