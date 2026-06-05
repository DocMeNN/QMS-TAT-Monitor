// src/modules/executive-command-center/components/LiveIntelligenceFeed.tsx

import { useIntelligenceHistoryStore } from "../../intelligence-history/store/intelligenceHistoryStore";

export default function LiveIntelligenceFeed() {
  const records =
    useIntelligenceHistoryStore(
      (state) => state.records
    );

  const latest =
    [...records].slice(0, 10);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Live Intelligence Feed
      </h2>

      <div className="space-y-3">
        {latest.map((record) => (
          <div
            key={record.id}
            className="rounded-lg border p-3"
          >
            <div className="font-medium">
              {record.eventType}
            </div>

            <div className="text-xs text-gray-500">
              {new Date(
                record.timestamp
              ).toLocaleString()}
            </div>
          </div>
        ))}

        {latest.length === 0 && (
          <div className="text-sm text-gray-500">
            No intelligence events available.
          </div>
        )}
      </div>
    </div>
  );
}