// src/modules/intelligence-history/components/IntelligenceAuditPanel.tsx

/**
 * Intelligence Audit Panel
 * --------------------------------------------------
 * Displays autonomous audit history.
 */

import {
  useIntelligenceHistoryStore,
} from "../store/intelligenceHistoryStore";

export default function IntelligenceAuditPanel() {
  const records =
    useIntelligenceHistoryStore(
      (state) => state.records
    );

  const totalRecords =
    useIntelligenceHistoryStore(
      (state) =>
        state.totalRecords
    );

  return (
    <div
      className="
        bg-slate-900/85
        rounded-xl
        shadow-lg
        p-5
        border
        border-cyan-500/30
        text-slate-100
      "
    >
      <h2
        className="
          text-lg
          font-semibold
          text-cyan-300
          mb-4
        "
      >
        Intelligence Audit Trail
      </h2>

      <div className="mb-4">
        <p>
          Total Events:
          {" "}
          {totalRecords}
        </p>
      </div>

      <div
        className="
          space-y-2
          max-h-80
          overflow-y-auto
        "
      >
        {records
          .slice(0, 20)
          .map((record) => (
            <div
              key={record.id}
              className="
                border-b
                border-slate-700
                pb-2
              "
            >
              <div>
                {
                  record.eventType
                }
              </div>

              <div
                className="
                  text-xs
                  text-slate-400
                "
              >
                {
                  record.timestamp
                }
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}