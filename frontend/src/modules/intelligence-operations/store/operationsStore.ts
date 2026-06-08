// src/modules/intelligence-operations/store/operationsStore.ts

import { create } from "zustand";

import type {
  OperationAction,
} from "../types/operations.types";

interface OperationsStoreState {
  operations: OperationAction[];

  addOperation: (
    operation: OperationAction
  ) => void;

  updateOperation: (
    id: string,
    updates: Partial<OperationAction>
  ) => void;

  clearOperations: () => void;
}

export const useOperationsStore =
  create<OperationsStoreState>(
    (set) => ({
      operations: [],

      addOperation: (
        operation
      ) =>
        set((state) => ({
          operations: [
            operation,
            ...state.operations,
          ],
        })),

      updateOperation: (
        id,
        updates
      ) =>
        set((state) => ({
          operations:
            state.operations.map(
              (operation) =>
                operation.id === id
                  ? {
                      ...operation,
                      ...updates,
                    }
                  : operation
            ),
        })),

      clearOperations: () =>
        set({
          operations: [],
        }),
    })
  );