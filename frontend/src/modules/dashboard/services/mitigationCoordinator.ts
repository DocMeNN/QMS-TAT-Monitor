//src/modules/dashboard/services/mitigationCoordinator.ts

import { federation } from "./resilienceFederation";
import { recoveryLearningEngine }
  from "./recoveryLearningEngine";
import { strategyEvolutionEngine }
  from "./strategyEvolutionEngine";
import type { MitigationAction } from "../types/mitigation";

class MitigationCoordinator {
  private actions: MitigationAction[] = [];

  execute(
    targetNode: string,
    reason: string,
    degradationScore = 90
  ): MitigationAction {
    const decision =
      strategyEvolutionEngine.select(
        targetNode,
        degradationScore
      );

    const action: MitigationAction = {
      id: crypto.randomUUID(),
      type:
        decision.selectedStrategy as MitigationAction["type"],
      targetNode,
      initiatedAt: Date.now(),
      status: "executing",
      reason
    };

    this.actions.unshift(action);

    this.applyAction(action, degradationScore);

    return action;
  }

  private applyAction(
    action: MitigationAction,
    degradationScore: number
  ) {
    try {
      switch (action.type) {
        case "reroute_load":
          federation.redistributeLoad(action.targetNode);
          break;

        case "reduce_polling":
          federation.reduceClusterPolling();
          break;

        case "promote_backup":
          federation.promoteBackupNode(action.targetNode);
          break;

        case "isolate_node":
          federation.isolateNode(action.targetNode);
          break;

        case "rebalance_quorum":
          federation.rebalanceQuorum();
          break;
      }

      setTimeout(() => {
        action.status = "completed";
        action.completedAt = Date.now();
        action.executionTime =
          action.completedAt -
          action.initiatedAt;

        recoveryLearningEngine.record({
          actionId: action.id,
          nodeId: action.targetNode,
          strategy: action.type,
          degradationScore,
          recoveryTime:
            action.executionTime,
          success: true,
          timestamp: Date.now()
        });

      }, 3000);

    } catch {
      action.status = "failed";
    }
  }

  getActions() {
    return this.actions.slice(0, 20);
  }
}

export const mitigationCoordinator =
  new MitigationCoordinator();