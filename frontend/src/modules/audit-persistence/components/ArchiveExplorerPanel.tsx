// src/modules/audit-persistence/components/ArchiveExplorerPanel.tsx

import { useState } from "react";

import { useAuditStore } from "../store/auditStore";

export default function ArchiveExplorerPanel() {
  const [search, setSearch] =
    useState("");

  const auditRecords =
    useAuditStore(
      (state) =>
        state.auditRecords
    );

  const filteredRecords =
    auditRecords.filter(
      (record) =>
        !search ||
        record.eventType
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Archive Explorer
      </h2>

      <input
        value={search}
        onChange={(event) =>
          setSearch(
            event.target.value
          )
        }
        placeholder="Search archive..."
        className="mb-4 w-full rounded border p-2"
      />

      <div className="space-y-2">
        {filteredRecords.map(
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

        {filteredRecords.length ===
          0 && (
          <div className="text-sm text-gray-500">
            No archive records
            found.
          </div>
        )}
      </div>
    </div>
  );
}