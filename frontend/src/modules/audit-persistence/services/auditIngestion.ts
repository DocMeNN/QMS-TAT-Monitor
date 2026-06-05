// src/modules/audit-persistence/services/auditIngestion.ts

import { auditRepository } from "./auditRepository";
import { decisionArchive } from "./decisionArchive";
import { executionArchive } from "./executionArchive";

import type {
  AuditRecord,
  DecisionArchiveRecord,
  ExecutionArchiveRecord,
} from "../types/audit.types";

export class AuditIngestion {
  ingestAuditRecord(
    record: AuditRecord
  ) {
    auditRepository.saveAuditRecord(
      record
    );

    if (
      record.eventType ===
      "DECISION_CREATED"
    ) {
      const decisionRecord: DecisionArchiveRecord =
        {
          id: `decision-${record.id}`,
          decisionId:
            record.sourceEventId,
          recommendation:
            String(
              record.payload
                ?.recommendation ??
                "Unknown"
            ),
          severity:
            record.severity ?? 0,
          timestamp:
            record.timestamp,
          payload:
            record.payload,
        };

      decisionArchive.archive(
        decisionRecord
      );
    }

    if (
      record.eventType ===
        "ACTION_EXECUTED" ||
      record.eventType ===
        "EXECUTION_PROPAGATED"
    ) {
      const executionRecord: ExecutionArchiveRecord =
        {
          id: `execution-${record.id}`,
          executionId:
            record.sourceEventId,
          actionType: String(
            record.payload
              ?.actionType ??
              "Unknown"
          ),
          status:
            record.status ??
            "unknown",
          severity:
            record.severity ?? 0,
          timestamp:
            record.timestamp,
          payload:
            record.payload,
        };

      executionArchive.archive(
        executionRecord
      );
    }
  }
}

export const auditIngestion =
  new AuditIngestion();