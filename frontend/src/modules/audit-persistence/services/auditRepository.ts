// src/modules/audit-persistence/services/auditRepository.ts

import { useAuditStore } from "../store/auditStore";

import type {
  AuditRecord,
} from "../types/audit.types";

export class AuditRepository {
  saveAuditRecord(
    record: AuditRecord
  ) {
    useAuditStore
      .getState()
      .addAuditRecord(record);
  }

  getAllAuditRecords() {
    return useAuditStore
      .getState()
      .auditRecords;
  }

  getAuditRecordById(
    id: string
  ) {
    return this
      .getAllAuditRecords()
      .find(
        (record) =>
          record.id === id
      );
  }

  count() {
    return this
      .getAllAuditRecords()
      .length;
  }
}

export const auditRepository =
  new AuditRepository();