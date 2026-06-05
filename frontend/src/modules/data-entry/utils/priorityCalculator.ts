// src/modules/data-entry/utils/priorityCalculator.ts

import type { PriorityLevel } from "../types/request.types";

export function calculatePriority(
  estimatedHours: number
): PriorityLevel {
  if (estimatedHours <= 4) return "LOW";
  if (estimatedHours <= 12) return "MEDIUM";
  if (estimatedHours <= 24) return "HIGH";
  return "CRITICAL";
}