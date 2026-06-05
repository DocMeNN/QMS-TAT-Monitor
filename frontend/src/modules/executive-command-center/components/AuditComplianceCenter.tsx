// src/modules/executive-command-center/components/AuditComplianceCenter.tsx

import { useMemo } from "react";

import { complianceReportGenerator } from "../../audit-persistence/services/complianceReportGenerator";

export default function AuditComplianceCenter() {
  const report = useMemo(() => {
    return complianceReportGenerator.generate();
  }, []);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Audit & Compliance Center
        </h2>

        <p className="text-sm text-gray-500">
          Governance, audit, and compliance
          visibility
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Metric
          label="Audit Records"
          value={
            report.totalAuditRecords
          }
        />

        <Metric
          label="Decision Archives"
          value={
            report.totalDecisionArchives
          }
        />

        <Metric
          label="Execution Archives"
          value={
            report.totalExecutionArchives
          }
        />

        <Metric
          label="Compliance Score"
          value={`${report.complianceScore}%`}
        />
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Generated:{" "}
        {new Date(
          report.generatedAt
        ).toLocaleString()}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}