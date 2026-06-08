// src/modules/data-entry-workspace/types/workspace.ts

export type WorkspaceRequestStatus =
  | "DRAFT"
  | "OPEN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type WorkspaceSLAStatus =
  | "ON_TRACK"
  | "AT_RISK"
  | "BREACHED"
  | "UNKNOWN";

export interface DashboardSummary {
  user_id: string;

  draft_requests: number;
  open_requests: number;
  in_progress_requests: number;
  completed_requests: number;
}

export interface WorkspaceRequestSummary {
  request_id: string;

  status: WorkspaceRequestStatus;

  workflow_stage?: string | null;

  assigned_to?: string | null;

  sla_status: WorkspaceSLAStatus;

  created_at?: string | null;

  updated_at?: string | null;
}

export interface WorkspaceRequestListResponse {
  total_records: number;

  page: number;

  page_size: number;

  items: WorkspaceRequestSummary[];
}

export interface WorkflowSnapshot {
  workflow_id?: string | null;

  current_stage?: string | null;

  state?: string | null;
}

export interface AssignmentSnapshot {
  assigned_to?: string | null;

  assigned_at?: string | null;
}

export interface SLASnapshot {
  status: WorkspaceSLAStatus;

  target_due_date?: string | null;

  remaining_minutes?: number | null;
}

export interface EscalationSnapshot {
  escalation_id?: string | null;

  status?: string | null;

  escalation_level?: string | null;

  created_at?: string | null;
}

export interface ApprovalSnapshot {
  approval_id?: string | null;

  status?: string | null;

  requested_by?: string | null;

  requested_at?: string | null;
}

export interface WorkspaceRequestDetails {
  request_id: string;

  request_status: WorkspaceRequestStatus;

  workflow: WorkflowSnapshot;

  assignment: AssignmentSnapshot;

  sla: SLASnapshot;

  escalation?: EscalationSnapshot | null;

  approval?: ApprovalSnapshot | null;

  created_at?: string | null;

  updated_at?: string | null;
}

export interface TimelineEvent {
  event_id: string;

  event_type: string;

  title: string;

  description?: string | null;

  actor?: string | null;

  timestamp: string;
}

export interface TimelineResponse {
  request_id: string;

  events: TimelineEvent[];
}