// src/modules/executive-command-center/components/ExecutiveActivityStream.tsx

import { useMemo } from "react";

import { useAuditStore } from "../../audit-persistence/store/auditStore";

export default function ExecutiveActivityStream() {
  const auditRecords =
    useAuditStore(
      (state) =>
        state.auditRecords
    );

  const latestEvents =
    useMemo(
      () =>
        [...auditRecords]
          .sort(
            (a, b) =>
              new Date(
                b.timestamp
              ).getTime() -
              new Date(
                a.timestamp
              ).getTime()
          )
          .slice(0, 15),
      [auditRecords]
    );

  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Executive Activity Stream
      </h2>

      <div className="space-y-3">
        {latestEvents.length === 0 && (
          <div className="text-sm text-gray-500">
            No activity available.
          </div>
        )}

        {latestEvents.map(
          (event) => (
            <div
              key={event.id}
              className="rounded-lg border p-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {event.eventType}
                </span>

                <span className="text-xs text-gray-500">
                  {
                    event.timestamp
                  }
                </span>
              </div>

              <div className="mt-1 text-sm text-gray-600">
                Category:
                {" "}
                {event.category}
              </div>

              <div className="text-sm text-gray-600">
                Status:
                {" "}
                {event.status ??
                  "n/a"}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}