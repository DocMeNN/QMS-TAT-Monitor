//src/modules/dashboard/types/mitigation.ts

export type MitigationActionType =
  | "reroute_load"
  | "reduce_polling"
  | "promote_backup"
  | "isolate_node"
  | "rebalance_quorum";

export type MitigationStatus =
  | "pending"
  | "executing"
  | "completed"
  | "failed";

export interface MitigationAction {
  id: string;
  type: MitigationActionType;
  targetNode: string;
  initiatedAt: number;
  completedAt?: number;
  status: MitigationStatus;
  reason: string;
  executionTime?: number;
}