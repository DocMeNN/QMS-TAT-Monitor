// src/modules/dashboard/services/notificationRouter.ts

/**
 * Determines escalation destination
 */

export type NotificationTarget =
  | "Operations"
  | "Engineering"
  | "Supervisor"
  | "Executive Core";

export const routeNotification = (
  severity: number
): NotificationTarget => {
  if (severity > 90) return "Executive Core";
  if (severity > 70) return "Supervisor";
  if (severity > 50) return "Engineering";
  return "Operations";
};