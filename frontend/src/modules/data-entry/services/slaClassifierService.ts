// src/modules/data-entry/services/slaClassifierService.ts

import { slaRules }
  from "../validation/slaRules";

import type { PriorityLevel }
  from "../types/request.types";

export function classifySLA(
  priority: PriorityLevel
): number {
  return slaRules[priority];
}