// src/modules/dashboard/services/incidentResponseEngine.ts

/**
 * Autonomous response selector
 */

export const resolveIncidentResponse = (
  severity: number
): string => {
  if (severity > 90) return "Initiate Rollback Arbitration";
  if (severity > 70) return "Trigger Autonomous Mitigation";
  if (severity > 50) return "Escalate to Recovery Engine";
  return "Monitor";
};