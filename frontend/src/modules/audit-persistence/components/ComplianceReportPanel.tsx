// src/modules/audit-persistence/components/ComplianceReportPanel.tsx

import { useMemo } from "react";

import { complianceReportGenerator } from "../services/complianceReportGenerator";

export default function ComplianceReportPanel() {
  const report = useMemo(
    () =>
      complianceReportGenerator.generate(),
    []
  );

  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Compliance Report
      </h2>

      <div className="space-y-3">
        <div>
          <strong>
            Generated:
          </strong>{" "}
          {new Date(
            report.generatedAt
          ).toLocaleString()}
        </div>

        <div>
          <strong>
            Audit Records:
          </strong>{" "}
          {
            report.totalAuditRecords
          }
        </div>

        <div>
          <strong>
            Decision Archives:
          </strong>{" "}
          {
            report.totalDecisionArchives
          }
        </div>

        <div>
          <strong>
            Execution Archives:
          </strong>{" "}
          {
            report.totalExecutionArchives
          }
        </div>

        <div>
          <strong>
            Critical Events:
          </strong>{" "}
          {report.criticalEvents}
        </div>

        <div>
          <strong>
            Compliance Score:
          </strong>{" "}
          {
            report.complianceScore
          }
          %
        </div>
      </div>
    </div>
  );
}