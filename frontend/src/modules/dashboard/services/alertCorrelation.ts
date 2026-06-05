// src/modules/dashboard/services/alertCorrelation.ts

/**
 * Correlates events for root cause grouping
 */

export interface CorrelationResult {
  clusterId: string;
  duplicateSuppressed: boolean;
}

export const correlateAlert = (
  signal: number
): CorrelationResult => {
  return {
    clusterId: `CLUSTER-${Math.floor(signal * 10)}`,
    duplicateSuppressed: signal < 40,
  };
};