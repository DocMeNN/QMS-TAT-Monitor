//src/modules/dashboard/services/rollbackArbitrationEngine.ts

import type { RollbackEvent }
  from "../types/rollbackArbitration";

import { metaGovernanceEngine }
  from "./metaGovernanceEngine";
import { policyMutationEngine }
  from "./policyMutationEngine";

class RollbackArbitrationEngine {
  private history: RollbackEvent[] = [];

  evaluate() {
    const audit =
      metaGovernanceEngine.latest();

    if (!audit || audit.approved) {
      return null;
    }

    const rollback =
      policyMutationEngine.rollback();

    if (!rollback) {
      return null;
    }

    const event: RollbackEvent = {
      id: crypto.randomUUID(),
      rejectedVersion:
        audit.policyVersion,
      restoredVersion:
        rollback.version,
      reason:
        "Rejected mutation automatically reverted",
      timestamp: Date.now()
    };

    this.history.unshift(event);

    return event;
  }

  getHistory() {
    return this.history;
  }

  latest() {
    return this.history[0];
  }
}

export const rollbackArbitrationEngine =
  new RollbackArbitrationEngine();