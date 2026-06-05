// src/modules/intelligence-history/services/executionTimeline.ts

import type { HistoryRecord } from "../types/history.types";

export interface TimelineNode {
  id: string;
  eventType: string;
  timestamp: string;
  title: string;
  description: string;
  metadata?: unknown;
}

export interface TimelineGroup {
  date: string;
  events: TimelineNode[];
}

export class ExecutionTimeline {
  static build(
    records: HistoryRecord[]
  ): TimelineGroup[] {
    const sorted = [...records].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() -
        new Date(b.timestamp).getTime()
    );

    const groups: Record<
      string,
      TimelineNode[]
    > = {};

    sorted.forEach((record) => {
      const date =
        record.timestamp.split("T")[0];

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push({
        id: record.id,
        eventType: record.eventType,
        timestamp: record.timestamp,
        title: this.buildTitle(
          record.eventType
        ),
        description:
          this.buildDescription(record),
        metadata: record.payload,
      });
    });

    return Object.entries(groups).map(
      ([date, events]) => ({
        date,
        events,
      })
    );
  }

  private static buildTitle(
    eventType: string
  ): string {
    switch (eventType) {
      case "REQUEST_CREATED":
        return "Request Submitted";

      case "ALERT_CREATED":
        return "Alert Generated";

      case "INCIDENT_DETECTED":
        return "Incident Predicted";

      case "DECISION_CREATED":
        return "Executive Decision Generated";

      case "ACTION_CREATED":
        return "Action Generated";

      case "ACTION_EXECUTED":
        return "Action Executed";

      case "EXECUTION_PROPAGATED":
        return "Execution Propagated";

      case "COGNITIVE_SIGNAL":
        return "Cognitive Signal Issued";

      default:
        return eventType;
    }
  }

  private static buildDescription(
    record: HistoryRecord
  ): string {
    return record.eventType;
  }
}