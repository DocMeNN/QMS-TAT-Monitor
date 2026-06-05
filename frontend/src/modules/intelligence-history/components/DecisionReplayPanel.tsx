// src/modules/intelligence-history/components/DecisionReplayPanel.tsx

import { useMemo, useState } from "react";

import { useIntelligenceHistoryStore } from "../store/intelligenceHistoryStore";
import { DecisionReplayEngine } from "../services/decisionReplayEngine";

export default function DecisionReplayPanel() {
  const records =
    useIntelligenceHistoryStore(
      (state) => state.records
    );

  const [searchValue, setSearchValue] =
    useState("");

  const replay = useMemo(() => {
    if (!searchValue.trim()) {
      return null;
    }

    const filteredRecords =
      records.filter(
        (record) =>
          record.eventType
            .toLowerCase()
            .includes(
              searchValue.toLowerCase()
            ) ||
          record.id
            .toLowerCase()
            .includes(
              searchValue.toLowerCase()
            )
      );

    return DecisionReplayEngine.replay(
      filteredRecords
    );
  }, [searchValue, records]);

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Decision Replay Engine
        </h2>

        <p className="text-sm text-gray-500">
          Reconstruct autonomous decision chains
        </p>
      </div>

      <input
        value={searchValue}
        onChange={(event) =>
          setSearchValue(
            event.target.value
          )
        }
        placeholder="Search by Event Type or Event ID"
        className="mb-4 w-full rounded border p-2"
      />

      {!replay && (
        <div className="text-sm text-gray-500">
          Enter an event type or event ID
          to replay intelligence history.
        </div>
      )}

      {replay && (
        <div className="space-y-3">
          <div className="rounded-lg border p-3">
            <div>
              <strong>Steps:</strong>{" "}
              {replay.totalSteps}
            </div>

            <div>
              <strong>Generated:</strong>{" "}
              {new Date(
                replay.generatedAt
              ).toLocaleString()}
            </div>
          </div>

          {replay.steps.map(
            (step, index) => (
              <div
                key={`${step.timestamp}-${index}`}
                className="rounded-lg border p-3"
              >
                <div className="font-medium">
                  {step.eventType}
                </div>

                <div className="text-sm text-gray-600">
                  {step.description}
                </div>

                <div className="mt-1 text-xs text-gray-500">
                  {new Date(
                    step.timestamp
                  ).toLocaleString()}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}