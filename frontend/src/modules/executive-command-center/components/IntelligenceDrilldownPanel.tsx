// src/modules/executive-command-center/components/IntelligenceDrilldownPanel.tsx

import { useState } from "react";

import { useAuditStore } from "../../audit-persistence/store/auditStore";

export default function IntelligenceDrilldownPanel() {
  const auditRecords =
    useAuditStore(
      (state) =>
        state.auditRecords
    );

  const [selectedId, setSelectedId] =
    useState<string>();

  const selectedRecord =
    auditRecords.find(
      (record) =>
        record.id === selectedId
    );

  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Intelligence Drilldown
      </h2>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          {auditRecords.map(
            (record) => (
              <button
                key={record.id}
                onClick={() =>
                  setSelectedId(
                    record.id
                  )
                }
                className="w-full rounded-lg border p-3 text-left"
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
              </button>
            )
          )}
        </div>

        <div className="rounded-lg border p-4">
          {!selectedRecord && (
            <div className="text-sm text-gray-500">
              Select an event.
            </div>
          )}

          {selectedRecord && (
            <pre className="overflow-auto text-xs">
              {JSON.stringify(
                selectedRecord,
                null,
                2
              )}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}