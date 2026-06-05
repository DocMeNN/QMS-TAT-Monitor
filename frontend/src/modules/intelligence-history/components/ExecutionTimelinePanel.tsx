// src/modules/intelligence-history/components/ExecutionTimelinePanel.tsx

import { useMemo } from "react";

import { useIntelligenceHistoryStore } from "../store/intelligenceHistoryStore";
import { ExecutionTimeline } from "../services/executionTimeline";

export default function ExecutionTimelinePanel() {
  const records =
    useIntelligenceHistoryStore(
      (state) => state.records
    );

  const timeline = useMemo(() => {
    return ExecutionTimeline.build(records);
  }, [records]);

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Execution Timeline
        </h2>

        <p className="text-sm text-gray-500">
          Replayable intelligence event history
        </p>
      </div>

      <div className="space-y-6">
        {timeline.map((group) => (
          <div key={group.date}>
            <h3 className="mb-3 text-sm font-bold text-gray-600">
              {group.date}
            </h3>

            <div className="space-y-3">
              {group.events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {event.title}
                    </span>

                    <span className="text-xs text-gray-500">
                      {new Date(
                        event.timestamp
                      ).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="mt-1 text-sm text-gray-600">
                    {event.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {timeline.length === 0 && (
          <div className="text-center text-sm text-gray-500">
            No intelligence history available
          </div>
        )}
      </div>
    </div>
  );
}