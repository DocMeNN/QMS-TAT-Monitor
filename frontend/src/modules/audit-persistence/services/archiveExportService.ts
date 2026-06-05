// src/modules/audit-persistence/services/archiveExportService.ts

import type {
  AuditRecord,
  DecisionArchiveRecord,
  ExecutionArchiveRecord,
} from "../types/audit.types";

import auditRepository from "../repositories/auditRepository";

export interface ArchiveExportBundle {
  generatedAt: string;

  summary: {
    auditRecords: number;
    decisionArchives: number;
    executionArchives: number;
  };

  auditRecords: AuditRecord[];

  decisionArchives: DecisionArchiveRecord[];

  executionArchives: ExecutionArchiveRecord[];
}

class ArchiveExportService {
  generateArchiveBundle(): ArchiveExportBundle {
    const auditRecords =
      auditRepository.getAuditRecords();

    const decisionArchives =
      auditRepository.getDecisionArchives();

    const executionArchives =
      auditRepository.getExecutionArchives();

    return {
      generatedAt:
        new Date().toISOString(),

      summary: {
        auditRecords:
          auditRecords.length,

        decisionArchives:
          decisionArchives.length,

        executionArchives:
          executionArchives.length,
      },

      auditRecords,

      decisionArchives,

      executionArchives,
    };
  }

  exportAsJson(): string {
    return JSON.stringify(
      this.generateArchiveBundle(),
      null,
      2
    );
  }

  downloadFilename(): string {
    const timestamp =
      new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    return `audit-archive-${timestamp}.json`;
  }
}

export const archiveExportService =
  new ArchiveExportService();

export default archiveExportService;