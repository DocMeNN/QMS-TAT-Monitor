// src/modules/audit-persistence/types/audit.types.ts

export interface AuditRecord {
  id: string;
  sourceEventId: string;
  category: "decision" | "execution" | "audit";
  eventType: string;
  severity?: number;
  status?: string;
  timestamp: string;
  payload?: Record<string, unknown>;
}

export interface DecisionArchiveRecord {
  id: string;
  decisionId: string;
  recommendation: string;
  severity: number;
  timestamp: string;
  payload?: Record<string, unknown>;
}

export interface ExecutionArchiveRecord {
  id: string;
  executionId: string;
  actionType: string;
  status: string;
  severity: number;
  timestamp: string;
  payload?: Record<string, unknown>;
}