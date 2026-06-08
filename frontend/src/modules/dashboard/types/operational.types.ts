// src/modules/dashboard/types/operational.types.ts

export type OperationalStatus =
  | "HEALTHY"
  | "WARNING"
  | "CRITICAL";

export interface LaboratoryQueue {
  id: string;

  department: string;

  activeRequests: number;

  completedToday: number;

  breachedToday: number;

  averageTatHours: number;

  utilization: number;

  status: OperationalStatus;
}

export interface StaffLoad {
  id: string;

  name: string;

  department: string;

  assignedCases: number;

  capacity: number;

  utilization: number;

  status: OperationalStatus;
}

export interface TatForecast {
  department: string;

  projectedTatHours: number;

  projectedBreachRisk: number;

  confidence: number;
}

export interface OperationalSnapshot {
  timestamp: string;

  queues: LaboratoryQueue[];

  staff: StaffLoad[];

  forecasts: TatForecast[];

  overallHealth: OperationalStatus;
}