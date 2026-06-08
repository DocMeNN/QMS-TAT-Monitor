// src/modules/intelligence-operations/hooks/useOperationsDashboard.ts

import {
  useOperationsStore,
} from "../store/operationsStore";

import {
  useOperationsMetrics,
} from "./useOperationsMetrics";

import {
  useOperationsActivity,
} from "./useOperationsActivity";

export function useOperationsDashboard() {
  const operations =
    useOperationsStore(
      (state) =>
        state.operations
    );

  const metrics =
    useOperationsMetrics();

  const activity =
    useOperationsActivity();

  return {
    operations,

    activity,

    metrics,

    activeOperations:
      operations.filter(
        (operation) =>
          operation.status ===
          "RUNNING"
      ),

    completedOperations:
      operations.filter(
        (operation) =>
          operation.status ===
          "COMPLETED"
      ),

    criticalOperations:
      operations.filter(
        (operation) =>
          operation.severity ===
          "CRITICAL"
      ),
  };
}

export default useOperationsDashboard;