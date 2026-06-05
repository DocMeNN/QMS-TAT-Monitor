// src/modules/intelligence-history/components/IntelligenceHistoryDashboard.tsx

import { useMemo, useState } from "react";

import HistoryMetricsPanel from "./HistoryMetricsPanel";
import HistoryFilters from "./HistoryFilters";
import HistorySearchBar from "./HistorySearchBar";
import ExecutionTimelinePanel from "./ExecutionTimelinePanel";
import DecisionReplayPanel from "./DecisionReplayPanel";

import { useIntelligenceHistoryStore } from "../store/intelligenceHistoryStore";

export default function IntelligenceHistoryDashboard() {
  const records =
    useIntelligenceHistoryStore(
      (state) => state.records
    );

  const [search, setSearch] =
    useState("");

  const [eventType, setEventType] =
    useState("ALL");

  const filteredRecords =
    useMemo(() => {
      return records.filter(
        (record) => {
          const matchesType =
            eventType === "ALL"
              ? true
              : record.eventType ===
                eventType;

          const searchValue =
            search.toLowerCase();

          const matchesSearch =
            !searchValue ||
            record.eventType
              .toLowerCase()
              .includes(searchValue) ||
            record.id
              .toLowerCase()
              .includes(searchValue);

          return (
            matchesType &&
            matchesSearch
          );
        }
      );
    }, [
      records,
      eventType,
      search,
    ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Intelligence History Center
        </h1>

        <p className="text-sm text-gray-500">
          Audit, replay, and forensic
          intelligence analysis
        </p>
      </div>

      <HistoryMetricsPanel />

      <HistorySearchBar
        value={search}
        onChange={setSearch}
      />

      <HistoryFilters
        selectedType={eventType}
        onTypeChange={setEventType}
      />

      <div className="rounded-xl border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">
            Archived Events
          </h2>

          <span className="text-sm text-gray-500">
            {filteredRecords.length} events
          </span>
        </div>

        <div className="max-h-[500px] overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">
                  Event
                </th>

                <th className="p-2 text-left">
                  Event ID
                </th>

                <th className="p-2 text-left">
                  Timestamp
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map(
                (record) => (
                  <tr
                    key={record.id}
                    className="border-b"
                  >
                    <td className="p-2">
                      {
                        record.eventType
                      }
                    </td>

                    <td className="p-2 font-mono text-xs">
                      {record.id}
                    </td>

                    <td className="p-2">
                      {new Date(
                        record.timestamp
                      ).toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ExecutionTimelinePanel />

      <DecisionReplayPanel />
    </div>
  );
}