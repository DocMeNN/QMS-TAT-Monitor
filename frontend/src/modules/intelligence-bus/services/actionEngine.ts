// src/modules/intelligence-bus/services/actionEngine.ts

/**
 * Action Engine
 * --------------------------------------------------
 * Converts executive decisions into executable actions.
 */

export type ActionType =
  | "CREATE_ESCALATION"
  | "CREATE_MITIGATION"
  | "CREATE_WATCHLIST"
  | "NO_ACTION";

export interface ExecutionAction {
  type: ActionType;
  title: string;
  description: string;
  severity: number;
  createdAt: string;
}

export class ActionEngine {
  createAction(
    decision: string
  ): ExecutionAction {
    const timestamp =
      new Date().toISOString();

    switch (decision) {
      case "Immediate Escalation":
        return {
          type: "CREATE_ESCALATION",
          title:
            "Emergency Escalation",
          description:
            "Critical intelligence event requires immediate escalation.",
          severity: 100,
          createdAt: timestamp,
        };

      case "Mitigation Required":
        return {
          type: "CREATE_MITIGATION",
          title:
            "Mitigation Workflow",
          description:
            "Risk threshold exceeded. Mitigation required.",
          severity: 80,
          createdAt: timestamp,
        };

      case "Monitor Closely":
        return {
          type: "CREATE_WATCHLIST",
          title:
            "Watchlist Monitoring",
          description:
            "Continuous monitoring initiated.",
          severity: 60,
          createdAt: timestamp,
        };

      default:
        return {
          type: "NO_ACTION",
          title:
            "Normal Operation",
          description:
            "No autonomous action required.",
          severity: 20,
          createdAt: timestamp,
        };
    }
  }
}

export const actionEngine =
  new ActionEngine();