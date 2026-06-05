//src/modules/dashboard/services/dependencyIntelligence.ts

export interface DependencyInsight {
  affectedSystems: number;
  propagationRisk: number;
  dependencyHealth: "STABLE" | "DEGRADED" | "FRAGILE";
}

class DependencyIntelligence {
  analyze(activeIncidents: number): DependencyInsight {
    const affectedSystems = activeIncidents * 3;
    const propagationRisk = Math.min(activeIncidents * 14, 100);

    let dependencyHealth: DependencyInsight["dependencyHealth"] =
      "STABLE";

    if (propagationRisk > 70) {
      dependencyHealth = "FRAGILE";
    } else if (propagationRisk > 40) {
      dependencyHealth = "DEGRADED";
    }

    return {
      affectedSystems,
      propagationRisk,
      dependencyHealth
    };
  }
}

export const dependencyIntelligence =
  new DependencyIntelligence();