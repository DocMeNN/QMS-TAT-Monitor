// src/modules/intelligence-operations/hooks/useOperationsMetrics.ts

import {
  useMemo,
} from "react";

import {
  useOperationsStore,
} from "../store/operationsStore";

export interface OperationsMetrics {
  total: number;

  completed: number;

  running: number;

  failed: number;

  critical: number;

  completionRate: number;
}

export function useOperationsMetrics(): OperationsMetrics {
  const operations =
    useOperationsStore(
      (state) =>
        state.operations
    );

  return useMemo(() => {
    const total =
      operations.length;

    const completed =
      operations.filter(
        (operation) =>
          operation.status ===
          "COMPLETED"
      ).length;

    const running =
      operations.filter(
        (operation) =>
          operation.status ===
          "RUNNING"
      ).length;

    const failed =
      operations.filter(
        (operation) =>
          operation.status ===
          "FAILED"
      ).length;

    const critical =
      operations.filter(
        (operation) =>
          operation.severity ===
          "CRITICAL"
      ).length;

    return {
      total,

      completed,

      running,

      failed,

      critical,

      completionRate:
        total === 0
          ? 0
          : Math.round(
              (completed /
                total) *
                100
            ),
    };
  }, [operations]);
}

export default useOperationsMetrics;