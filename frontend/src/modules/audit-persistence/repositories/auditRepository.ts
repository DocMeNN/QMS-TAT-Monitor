// src/modules/audit-persistence/repositories/auditRepository.ts

import type {
  AuditRecord,
  DecisionArchiveRecord,
  ExecutionArchiveRecord,
} from "../types/audit.types";

class AuditRepository {
  private auditRecords: AuditRecord[] = [];

  private decisionArchives: DecisionArchiveRecord[] = [];

  private executionArchives: ExecutionArchiveRecord[] = [];

  saveAuditRecord(
    record: AuditRecord
  ): AuditRecord {
    this.auditRecords.unshift(record);

    return record;
  }

  saveDecisionArchive(
    record: DecisionArchiveRecord
  ): DecisionArchiveRecord {
    this.decisionArchives.unshift(record);

    return record;
  }

  saveExecutionArchive(
    record: ExecutionArchiveRecord
  ): ExecutionArchiveRecord {
    this.executionArchives.unshift(record);

    return record;
  }

  getAuditRecords(): AuditRecord[] {
    return [...this.auditRecords];
  }

  getDecisionArchives(): DecisionArchiveRecord[] {
    return [...this.decisionArchives];
  }

  getExecutionArchives(): ExecutionArchiveRecord[] {
    return [...this.executionArchives];
  }

  getAuditRecordById(
    id: string
  ): AuditRecord | undefined {
    return this.auditRecords.find(
      (record) => record.id === id
    );
  }

  getDecisionArchiveById(
    id: string
  ): DecisionArchiveRecord | undefined {
    return this.decisionArchives.find(
      (record) => record.id === id
    );
  }

  getExecutionArchiveById(
    id: string
  ): ExecutionArchiveRecord | undefined {
    return this.executionArchives.find(
      (record) => record.id === id
    );
  }

  getAuditRecordsByCategory(
    category: AuditRecord["category"]
  ): AuditRecord[] {
    return this.auditRecords.filter(
      (record) =>
        record.category === category
    );
  }

  getAuditRecordsByEventType(
    eventType: string
  ): AuditRecord[] {
    return this.auditRecords.filter(
      (record) =>
        record.eventType === eventType
    );
  }

  getAuditRecordsBySeverity(
    minimumSeverity: number
  ): AuditRecord[] {
    return this.auditRecords.filter(
      (record) =>
        (record.severity ?? 0) >=
        minimumSeverity
    );
  }

  getAuditRecordsByStatus(
    status: string
  ): AuditRecord[] {
    return this.auditRecords.filter(
      (record) =>
        record.status === status
    );
  }

  getLatestAuditRecords(
    limit = 25
  ): AuditRecord[] {
    return this.auditRecords.slice(
      0,
      limit
    );
  }

  getLatestDecisionArchives(
    limit = 25
  ): DecisionArchiveRecord[] {
    return this.decisionArchives.slice(
      0,
      limit
    );
  }

  getLatestExecutionArchives(
    limit = 25
  ): ExecutionArchiveRecord[] {
    return this.executionArchives.slice(
      0,
      limit
    );
  }

  deleteAuditRecord(
    id: string
  ): boolean {
    const initialLength =
      this.auditRecords.length;

    this.auditRecords =
      this.auditRecords.filter(
        (record) =>
          record.id !== id
      );

    return (
      this.auditRecords.length !==
      initialLength
    );
  }

  deleteDecisionArchive(
    id: string
  ): boolean {
    const initialLength =
      this.decisionArchives.length;

    this.decisionArchives =
      this.decisionArchives.filter(
        (record) =>
          record.id !== id
      );

    return (
      this.decisionArchives.length !==
      initialLength
    );
  }

  deleteExecutionArchive(
    id: string
  ): boolean {
    const initialLength =
      this.executionArchives.length;

    this.executionArchives =
      this.executionArchives.filter(
        (record) =>
          record.id !== id
      );

    return (
      this.executionArchives.length !==
      initialLength
    );
  }

  clear(): void {
    this.auditRecords = [];
    this.decisionArchives = [];
    this.executionArchives = [];
  }

  getMetrics() {
    return {
      totalAuditRecords:
        this.auditRecords.length,

      totalDecisionArchives:
        this.decisionArchives.length,

      totalExecutionArchives:
        this.executionArchives.length,

      highSeverityEvents:
        this.auditRecords.filter(
          (record) =>
            (record.severity ?? 0) >= 8
        ).length,

      activeIssues:
        this.auditRecords.filter(
          (record) =>
            record.status ===
            "active"
        ).length,
    };
  }
}

export const auditRepository =
  new AuditRepository();

export default auditRepository;