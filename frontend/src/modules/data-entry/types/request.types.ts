// src/modules/data-entry/types/request.types.ts

export type PriorityLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type RequestStatus =
  | "PENDING"
  | "VALIDATED"
  | "ASSIGNED"
  | "SUBMITTED"
  | "QUEUED";

export interface Request {
  id: string;
  title: string;
  requester?: string;
  department: string;
  description?: string;
  category: string;
  priority: PriorityLevel;
  estimatedHours?: number;
  slaHours: number;
  owner: string;
  status: RequestStatus;
  createdAt: string;
}

export interface RequestPayload {
  title: string;
  requester: string;
  department: string;
  description: string;
  category: string;
  priority: PriorityLevel;
  estimatedHours: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface AssignmentResult {
  owner: string;
  queue: string;
  slaHours: number;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
}