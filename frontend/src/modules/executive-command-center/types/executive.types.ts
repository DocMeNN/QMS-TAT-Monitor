// src/modules/executive-command-center/types/executive.types.ts

export interface ExecutiveKPI {
  label: string;
  value: number | string;
  trend?: string;
}

export interface IntelligenceFeedItem {
  id: string;
  title: string;
  description: string;
  severity: number;
  timestamp: string;
}

export interface CommandGridItem {
  id: string;
  title: string;
  description: string;
  status: "active" | "idle" | "warning";
}

export interface ExecutiveOverview {
  totalRequests: number;
  activeAlerts: number;
  predictedIncidents: number;
  executions: number;
}