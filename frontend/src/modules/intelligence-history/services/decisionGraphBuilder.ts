// src/modules/intelligence-history/services/decisionGraphBuilder.ts

import type { HistoryRecord } from "../types/history.types";

export interface DecisionGraphNode {
  id: string;
  label: string;
  eventType: string;
}

export interface DecisionGraphEdge {
  source: string;
  target: string;
}

export interface DecisionGraph {
  nodes: DecisionGraphNode[];
  edges: DecisionGraphEdge[];
}

export class DecisionGraphBuilder {
  build(
    records: HistoryRecord[]
  ): DecisionGraph {
    const sorted = [...records].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() -
        new Date(b.timestamp).getTime()
    );

    const nodes: DecisionGraphNode[] = [];
    const edges: DecisionGraphEdge[] = [];

    sorted.forEach((record, index) => {
      nodes.push({
        id: record.id,
        label: record.eventType,
        eventType: record.eventType,
      });

      if (index > 0) {
        edges.push({
          source: sorted[index - 1].id,
          target: record.id,
        });
      }
    });

    return {
      nodes,
      edges,
    };
  }
}

export const decisionGraphBuilder =
  new DecisionGraphBuilder();