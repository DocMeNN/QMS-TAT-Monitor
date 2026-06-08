// src/modules/intelligence-operations/types/operations.types.ts

export type OperationSeverity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type OperationStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export type OperationCategory =
  | "WORKFLOW"
  | "SLA"
  | "INCIDENT"
  | "ALERT"
  | "ESCALATION"
  | "EXECUTIVE";

export interface OperationAction {
  id: string;

  title: string;

  description: string;

  category: OperationCategory;

  severity: OperationSeverity;

  status: OperationStatus;

  createdAt: string;

  completedAt?: string;

  metadata?: Record<
    string,
    unknown
  >;
}

export interface OperationExecutionResult {
  success: boolean;

  message: string;

  actionId: string;

  executedAt: string;
}