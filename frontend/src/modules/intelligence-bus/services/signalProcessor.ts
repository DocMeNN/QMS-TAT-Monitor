// src/modules/intelligence-bus/services/signalProcessor.ts

export type SignalPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface IntelligenceSignal {
  id: string;
  type: string;
  source: string;
  payload: unknown;
  timestamp: string;
}

export interface ProcessedSignal
  extends IntelligenceSignal {
  priority: SignalPriority;
  score: number;
}

export class SignalProcessor {
  private static instance: SignalProcessor;

  private constructor() {}

  static getInstance(): SignalProcessor {
    if (!SignalProcessor.instance) {
      SignalProcessor.instance =
        new SignalProcessor();
    }

    return SignalProcessor.instance;
  }

  process(
    signal: IntelligenceSignal
  ): ProcessedSignal {
    const score =
      this.calculateSignalScore(
        signal
      );

    return {
      ...signal,
      score,
      priority:
        this.determinePriority(
          score
        ),
    };
  }

  private calculateSignalScore(
    signal: IntelligenceSignal
  ): number {
    switch (signal.type) {
      case "REQUEST_CREATED":
        return 55;

      case "REQUEST_UPDATED":
        return 65;

      case "REQUEST_COMPLETED":
        return 40;

      case "ALERT_TRIGGERED":
        return 85;

      case "INCIDENT_PREDICTED":
        return 90;

      case "DECISION_RECALCULATED":
        return 75;

      default:
        return 50;
    }
  }

  private determinePriority(
    score: number
  ): SignalPriority {
    if (score >= 90) {
      return "critical";
    }

    if (score >= 75) {
      return "high";
    }

    if (score >= 50) {
      return "medium";
    }

    return "low";
  }
}

export const signalProcessor =
  SignalProcessor.getInstance();