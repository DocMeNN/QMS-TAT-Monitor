// src/modules/workflow-management/types/workflow.types.ts

import type {
  PriorityLevel,
  Request,
} from "../../data-entry/types/request.types";

export type LaboratoryDepartment =
  | "HAEMATOLOGY"
  | "CHEMICAL_PATHOLOGY"
  | "MICROBIOLOGY"
  | "HISTOPATHOLOGY"
  | "IMMUNOLOGY"
  | "BLOOD_BANKING"
  | "MOLECULAR_DIAGNOSTICS"
  | "CYTOLOGY";

export type WorkflowStatus =
  | "DRAFT"
  | "ACTIVE"
  | "PAUSED"
  | "COMPLETED"
  | "CANCELLED";

export type WorkflowStageStatus =
  | "PENDING"
  | "READY"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "SKIPPED"
  | "BLOCKED"
  | "FAILED";

export type WorkflowTransitionType =
  | "SEQUENTIAL"
  | "CONDITIONAL"
  | "PARALLEL";

export interface WorkflowRoleAssignment {
  role: string;
  department: LaboratoryDepartment;
}

export interface WorkflowStage {
  id: string;

  name: string;

  description?: string;

  order: number;

  tatHours: number;

  mandatory: boolean;

  assignment?: WorkflowRoleAssignment;
}

export interface WorkflowTransition {
  id: string;

  fromStageId: string;

  toStageId: string;

  type: WorkflowTransitionType;

  condition?: string;
}

export interface WorkflowDefinition {
  id: string;

  code: string;

  name: string;

  department: LaboratoryDepartment;

  description?: string;

  version: number;

  status: WorkflowStatus;

  stages: WorkflowStage[];

  transitions: WorkflowTransition[];

  createdAt: string;

  updatedAt: string;
}

export interface WorkflowStageExecution {
  stageId: string;

  status: WorkflowStageStatus;

  assignedTo?: string;

  startedAt?: string;

  completedAt?: string;

  durationMinutes?: number;

  comments?: string;
}

export interface WorkflowMetrics {
  totalStages: number;

  completedStages: number;

  pendingStages: number;

  blockedStages: number;

  failedStages: number;

  completionPercentage: number;

  totalTatHours: number;

  elapsedHours: number;

  breached: boolean;
}

export interface WorkflowInstance {
  id: string;

  workflowId: string;

  requestId: string;

  request: Request;

  status: WorkflowStatus;

  currentStageId: string;

  previousStageId?: string;

  nextStageId?: string;

  executions: WorkflowStageExecution[];

  metrics: WorkflowMetrics;

  startedAt: string;

  completedAt?: string;
}

export interface WorkflowExecutionEvent {
  id: string;

  workflowInstanceId: string;

  workflowId: string;

  stageId: string;

  eventType: string;

  timestamp: string;

  payload?: Record<string, unknown>;
}

export interface WorkflowAssignment {
  workflowInstanceId: string;

  stageId: string;

  assignedUser: string;

  assignedRole: string;

  assignedDepartment: LaboratoryDepartment;

  assignedAt: string;
}

export interface WorkflowBottleneck {
  workflowInstanceId: string;

  stageId: string;

  stageName: string;

  elapsedHours: number;

  tatHours: number;

  severity: number;
}

export interface WorkflowFilter {
  department?: LaboratoryDepartment;

  status?: WorkflowStatus;

  priority?: PriorityLevel;
}