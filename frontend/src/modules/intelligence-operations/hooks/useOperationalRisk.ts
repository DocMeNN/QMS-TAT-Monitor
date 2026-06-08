// src/modules/intelligence-operations/hooks/useOperationalRisk.ts

import {
  useMemo,
} from "react";

import {
  useOperationsStore,
} from "../store/operationsStore";

import {
  operationsRiskEngine,
} from "../services/operationsRiskEngine";

export function useOperationalRisk() {
  const operations =
    useOperationsStore(
      (state) =>
        state.operations
    );

  return useMemo(
    () =>
      operationsRiskEngine.assess(
        operations
      ),
    [operations]
  );
}

export default useOperationalRisk;