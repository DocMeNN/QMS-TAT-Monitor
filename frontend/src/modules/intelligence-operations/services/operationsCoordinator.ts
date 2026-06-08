// src/modules/intelligence-operations/services/operationsCoordinator.ts

import {
  useOperationsStore,
} from "../store/operationsStore";

import {
  operationsEngine,
} from "./operationsEngine";

import type {
  OperationAction,
} from "../types/operations.types";

export class OperationsCoordinator {
  createAndRegister(
    operation: OperationAction
  ) {
    useOperationsStore
      .getState()
      .addOperation(
        operation
      );

    return operation;
  }

  execute(
    operation: OperationAction
  ) {
    const result =
      operationsEngine.execute(
        operation
      );

    useOperationsStore
      .getState()
      .updateOperation(
        operation.id,
        {
          status:
            result.success
              ? "COMPLETED"
              : "FAILED",

          completedAt:
            result.executedAt,
        }
      );

    return result;
  }
}

export const operationsCoordinator =
  new OperationsCoordinator();

export default operationsCoordinator;