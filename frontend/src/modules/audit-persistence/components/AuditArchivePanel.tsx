// src/modules/audit-persistence/components/AuditArchivePanel.tsx

import { useAuditStore } from "../store/auditStore";

export default function AuditArchivePanel() {
  const auditRecords =
    useAuditStore(
      (state) =>
        state.auditRecords
    );

  const decisionArchives =
    useAuditStore(
      (state) =>
        state.decisionArchives
    );

  const executionArchives =
    useAuditStore(
      (state) =>
        state.executionArchives
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Audit Archive Center
        </h1>

        <p className="text-sm text-gray-500">
          Persistent audit,
          execution, and
          decision archives
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">
            Audit Records
          </div>

          <div className="mt-2 text-2xl font-bold">
            {auditRecords.length}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">
            Decision Archives
          </div>

          <div className="mt-2 text-2xl font-bold">
            {
              decisionArchives.length
            }
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">
            Execution Archives
          </div>

          <div className="mt-2 text-2xl font-bold">
            {
              executionArchives.length
            }
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h2 className="mb-4 text-lg font-semibold">
          Audit Records
        </h2>

        <div className="space-y-2">
          {auditRecords.map(
            (record) => (
              <div
                key={record.id}
                className="rounded border p-3"
              >
                <div className="font-medium">
                  {
                    record.eventType
                  }
                </div>

                <div className="text-xs text-gray-500">
                  {
                    record.timestamp
                  }
                </div>
              </div>
            )
          )}

          {auditRecords.length ===
            0 && (
            <div className="text-sm text-gray-500">
              No audit records
              archived.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}