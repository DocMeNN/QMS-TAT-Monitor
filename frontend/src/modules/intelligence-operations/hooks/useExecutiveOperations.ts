// src/modules/intelligence-operations/hooks/useExecutiveOperations.ts

import {
  useMemo,
} from "react";

import {
  useOperationalRisk,
} from "./useOperationalRisk";

import {
  operationsDecisionEngine,
} from "../services/operationsDecisionEngine";

import {
  operationsEscalationEngine,
} from "../services/operationsEscalationEngine";

import {
  operationsMitigationEngine,
} from "../services/operationsMitigationEngine";

export function useExecutiveOperations() {
  const risk =
    useOperationalRisk();

  return useMemo(() => {
    const decision =
      operationsDecisionEngine.createDecision(
        risk
      );

    const escalation =
      operationsEscalationEngine.evaluate(
        decision
      );

    const mitigation =
      operationsMitigationEngine.createPlan(
        decision
      );

    return {
      risk,

      decision,

      escalation,

      mitigation,
    };
  }, [risk]);
}

export default useExecutiveOperations;