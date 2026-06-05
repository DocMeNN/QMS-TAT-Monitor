// src/modules/intelligence-history/components/HistoryMetricsPanel.tsx

import { historyAnalytics } from "../services/historyAnalytics";

export default function HistoryMetricsPanel() {
  const totalEvents =
    historyAnalytics.totalEvents();

  const latestEvent =
    historyAnalytics.latestEventType();

  const breakdown =
    historyAnalytics.eventBreakdown();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border p-4 bg-white">
        <div className="text-sm text-gray-500">
          Total Events
        </div>

        <div className="mt-2 text-2xl font-bold">
          {totalEvents}
        </div>
      </div>

      <div className="rounded-xl border p-4 bg-white">
        <div className="text-sm text-gray-500">
          Latest Event
        </div>

        <div className="mt-2 font-semibold">
          {latestEvent ?? "N/A"}
        </div>
      </div>

      <div className="rounded-xl border p-4 bg-white">
        <div className="text-sm text-gray-500">
          Event Types
        </div>

        <div className="mt-2 text-2xl font-bold">
          {Object.keys(breakdown).length}
        </div>
      </div>
    </div>
  );
}