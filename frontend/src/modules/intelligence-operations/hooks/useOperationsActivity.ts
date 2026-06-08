// src/modules/intelligence-operations/hooks/useOperationsActivity.ts

import {
  useMemo,
} from "react";

import {
  useOperationsStore,
} from "../store/operationsStore";

export function useOperationsActivity() {
  const operations =
    useOperationsStore(
      (state) =>
        state.operations
    );

  return useMemo(
    () =>
      [...operations].sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      ),
    [operations]
  );
}

export default useOperationsActivity;