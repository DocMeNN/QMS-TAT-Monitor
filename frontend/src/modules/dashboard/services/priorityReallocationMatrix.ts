//src/modules/dashboard/services/priorityReallocationMatrix.ts

export interface ReallocationDecision {
  resourceShift: string;
  urgencyBoost: number;
}

class PriorityReallocationMatrix {
  optimize(backlog: number): ReallocationDecision {
    return {
      resourceShift:
        backlog > 50
          ? "Critical Team Reinforcement"
          : "Balanced Distribution",

      urgencyBoost: Math.min(backlog * 2, 100)
    };
  }
}

export const priorityReallocationMatrix =
  new PriorityReallocationMatrix();