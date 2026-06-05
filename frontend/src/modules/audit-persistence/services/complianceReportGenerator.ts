// src/modules/audit-persistence/services/complianceReportGenerator.ts

import { useAuditStore } from "../store/auditStore";

export interface ComplianceReport {
  generatedAt: string;
  totalAuditRecords: number;
  totalDecisionArchives: number;
  totalExecutionArchives: number;
  criticalEvents: number;
  complianceScore: number;
}

export class ComplianceReportGenerator {
  generate(): ComplianceReport {
    const state =
      useAuditStore.getState();

    const criticalEvents =
      state.auditRecords.filter(
        (record) =>
          (record.severity ?? 0) >=
          80
      ).length;

    const totalRecords =
      state.auditRecords.length;

    const complianceScore =
      totalRecords === 0
        ? 100
        : Math.max(
            0,
            100 -
              Math.round(
                (criticalEvents /
                  totalRecords) *
                  100
              )
          );

    return {
      generatedAt:
        new Date().toISOString(),

      totalAuditRecords:
        totalRecords,

      totalDecisionArchives:
        state.decisionArchives
          .length,

      totalExecutionArchives:
        state.executionArchives
          .length,

      criticalEvents,

      complianceScore,
    };
  }
}

export const complianceReportGenerator =
  new ComplianceReportGenerator();