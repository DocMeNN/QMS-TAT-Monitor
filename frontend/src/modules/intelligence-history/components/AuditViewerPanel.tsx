// src/modules/intelligence-history/components/AuditViewerPanel.tsx

import { useMemo } from "react";

import { auditEngine } from "../services/auditEngine";
import { useIntelligenceHistoryStore } from "../store/intelligenceHistoryStore";

export default function AuditViewerPanel() {
  const records =
    useIntelligenceHistoryStore(
      (state) => state.records
    );

  const audit = useMemo(() => {
    return auditEngine.generate(records);
  }, [records]);

  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Audit Viewer
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded border p-3">
          <div className="text-sm text-gray-500">
            Total Events
          </div>

          <div className="text-xl font-bold">
            {audit.totalEvents}
          </div>
        </div>

        <div className="rounded border p-3">
          <div className="text-sm text-gray-500">
            Executed Actions
          </div>

          <div className="text-xl font-bold">
            {audit.executedActions}
          </div>
        </div>

        <div className="rounded border p-3">
          <div className="text-sm text-gray-500">
            Propagations
          </div>

          <div className="text-xl font-bold">
            {audit.propagatedExecutions}
          </div>
        </div>

        <div className="rounded border p-3">
          <div className="text-sm text-gray-500">
            Cognitive Signals
          </div>

          <div className="text-xl font-bold">
            {audit.cognitiveSignals}
          </div>
        </div>
      </div>

      {audit.latestTimestamp && (
        <div className="mt-4 text-sm text-gray-500">
          Latest Activity:{" "}
          {new Date(
            audit.latestTimestamp
          ).toLocaleString()}
        </div>
      )}
    </div>
  );
}