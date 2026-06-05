//src/modules/dashboard/services/executiveDecisionCore.ts

export interface ExecutiveDecision {
  command: string;
  confidence: number;
  executionMode:
    | "MONITOR"
    | "OPTIMIZE"
    | "INTERVENE"
    | "EMERGENCY_OVERRIDE";
}

class ExecutiveDecisionCore {
  decide(systemStress: number): ExecutiveDecision {
    let executionMode:
      ExecutiveDecision["executionMode"] = "MONITOR";

    let command = "Passive Observation";

    if (systemStress > 80) {
      executionMode = "EMERGENCY_OVERRIDE";
      command = "Immediate Global Mitigation Override";
    } else if (systemStress > 60) {
      executionMode = "INTERVENE";
      command = "Deploy Coordinated Intervention";
    } else if (systemStress > 35) {
      executionMode = "OPTIMIZE";
      command = "Adaptive Resource Optimization";
    }

    return {
      command,
      confidence: Math.min(systemStress + 15, 100),
      executionMode
    };
  }
}

export const executiveDecisionCore =
  new ExecutiveDecisionCore();