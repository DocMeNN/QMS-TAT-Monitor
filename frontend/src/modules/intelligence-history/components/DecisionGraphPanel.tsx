// src/modules/intelligence-history/components/DecisionGraphPanel.tsx

import { useMemo } from "react";

import { decisionGraphBuilder } from "../services/decisionGraphBuilder";
import { useIntelligenceHistoryStore } from "../store/intelligenceHistoryStore";

export default function DecisionGraphPanel() {
  const records =
    useIntelligenceHistoryStore(
      (state) => state.records
    );

  const graph = useMemo(() => {
    return decisionGraphBuilder.build(
      records
    );
  }, [records]);

  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Decision Graph
      </h2>

      <div className="space-y-3">
        {graph.nodes.map((node, index) => (
          <div
            key={node.id}
            className="rounded border p-3"
          >
            <div className="font-medium">
              {index + 1}. {node.label}
            </div>

            {graph.edges[index] && (
              <div className="mt-2 text-xs text-gray-500">
                ↓
                {" "}
                {
                  graph.edges[index]
                    .target
                }
              </div>
            )}
          </div>
        ))}
      </div>

      {graph.nodes.length === 0 && (
        <div className="text-sm text-gray-500">
          No decision graph available.
        </div>
      )}
    </div>
  );
}