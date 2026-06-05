// src/modules/dashboard/services/incidentPredictor.ts

/**
 * Predicts operational impact severity
 */

export interface IncidentPrediction {
  severity: number;
  slaRisk: number;
  blastRadius: number;
}

export const predictIncident = (signal: number): IncidentPrediction => {
  return {
    severity: signal * 1.15,
    slaRisk: Math.min(signal / 100, 1),
    blastRadius: Math.floor(signal / 15),
  };
};