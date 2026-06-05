//src/modules/dashboard/services/slaPreservationEngine.ts

export interface SlaDefense {
  protectionScore: number;
  predictedPreservation: number;
  mode: "PASSIVE" | "ACTIVE" | "AGGRESSIVE";
}

class SlaPreservationEngine {
  defend(breachThreat: number): SlaDefense {
    const protectionScore =
      Math.max(100 - breachThreat, 10);

    let mode: SlaDefense["mode"] = "PASSIVE";

    if (breachThreat > 70) {
      mode = "AGGRESSIVE";
    } else if (breachThreat > 40) {
      mode = "ACTIVE";
    }

    return {
      protectionScore,
      predictedPreservation:
        protectionScore * 0.95,
      mode
    };
  }
}

export const slaPreservationEngine =
  new SlaPreservationEngine();