// src/modules/intelligence-operations/services/auditOperationsBridge.ts

import type {
  AuditRecord,
} from "../../audit-persistence/types/audit.types";

import {
  operationsEngine,
} from "./operationsEngine";

export class AuditOperationsBridge {
  createAuditOperation(
    audit: AuditRecord
  ) {
    return operationsEngine.createOperation(
      audit.eventType,
      "Audit event archived",
      "INCIDENT",
      "LOW"
    );
  }
}

export const auditOperationsBridge =
  new AuditOperationsBridge();

export default auditOperationsBridge;