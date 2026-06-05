// src/modules/audit-persistence/services/complianceExportService.ts

import auditRepository from "../repositories/auditRepository";

export interface ComplianceReport {
  generatedAt: string;

  score: number;

  metrics: {
    totalAuditRecords: number;
    totalDecisionArchives: number;
    totalExecutionArchives: number;
    highSeverityEvents: number;
    activeIssues: number;
  };

  findings: string[];

  recommendations: string[];
}

class ComplianceExportService {
  generateReport(): ComplianceReport {
    const metrics =
      auditRepository.getMetrics();

    const findings: string[] = [];

    const recommendations: string[] =
      [];

    if (
      metrics.highSeverityEvents > 0
    ) {
      findings.push(
        `${metrics.highSeverityEvents} high severity events detected`
      );

      recommendations.push(
        "Review high severity audit events"
      );
    }

    if (
      metrics.activeIssues > 0
    ) {
      findings.push(
        `${metrics.activeIssues} active issues remain unresolved`
      );

      recommendations.push(
        "Resolve active operational issues"
      );
    }

    const score =
      Math.max(
        0,
        100 -
          metrics.highSeverityEvents *
            2 -
          metrics.activeIssues * 3
      );

    return {
      generatedAt:
        new Date().toISOString(),

      score,

      metrics,

      findings,

      recommendations,
    };
  }

  exportAsJson(): string {
    return JSON.stringify(
      this.generateReport(),
      null,
      2
    );
  }

  downloadFilename(): string {
    const timestamp =
      new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    return `compliance-report-${timestamp}.json`;
  }
}

export const complianceExportService =
  new ComplianceExportService();

export default complianceExportService;