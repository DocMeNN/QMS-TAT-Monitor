// src/modules/executive-command-center/components/DecisionCenterPanel.tsx

import { useMemo } from "react";

import { useIntelligenceHistoryStore } from "../../intelligence-history/store/intelligenceHistoryStore";

export default function DecisionCenterPanel() {
  const records =
    useIntelligenceHistoryStore(
      (state) => state.records
    );

  const decisions = useMemo(() => {
    return records
      .filter(
        (record) =>
          record.eventType ===
          "DECISION_CREATED"
      )
      .slice(0, 20);
  }, [records]);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Decision Center
        </h2>

        <p className="text-sm text-gray-500">
          Executive recommendations and
          autonomous decisions
        </p>
      </div>

      <div className="space-y-3">
        {decisions.map((decision) => (
          <div
            key={decision.id}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {decision.eventType}
              </span>

              <span className="text-xs text-gray-500">
                {new Date(
                  decision.timestamp
                ).toLocaleString()}
              </span>
            </div>

            <div className="mt-3">
              <pre className="overflow-auto text-xs text-gray-600">
                {JSON.stringify(
                  decision.payload,
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        ))}

        {decisions.length === 0 && (
          <div className="text-sm text-gray-500">
            No executive decisions available.
          </div>
        )}
      </div>
    </div>
  );
}