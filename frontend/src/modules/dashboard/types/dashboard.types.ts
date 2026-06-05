// src/modules/dashboard/types/dashboard.types.ts

/**
 * Dashboard Types
 * ----------------
 * Shared type contracts for
 * dashboard analytics visualization.
 *
 * Phase 10 Enhancements
 * ---------------------
 * - Unified trend point schema
 * - Throughput chart contracts
 * - Compliance chart contracts
 * - Completion trend contracts
 *
 * MeRulz Compliance
 * -----------------
 * - Modular type isolation
 * - Fully documented
 * - Production-grade strict typing
 */


/* ============================================================
   Core Metrics
============================================================ */

export interface DashboardMetrics {
  total_requests: number;
  avg_tat_hours: number;
  completed: number;
  breached_sla: number;
}


/* ============================================================
   Generic Trend Point
============================================================ */

export interface TrendPoint {
  label: string;
  value: number;
}


/* ============================================================
   Metric Card Props
============================================================ */

export interface MetricCardProps {
  title: string;
  value: string | number;
}


/* ============================================================
   Analytics Payload
============================================================ */

export interface DashboardAnalytics {
  metrics: DashboardMetrics;
  throughput: TrendPoint[];
  compliance_trend: TrendPoint[];
  completion_trend: TrendPoint[];
  completion_rate: number;
  sla_compliance: number;
  system_health: string;
  last_updated: string;
}