// src/modules/data-entry/services/assignmentService.ts

import { resolveOwner } from "../utils/ownershipResolver";
import { slaRules } from "../validation/slaRules";
import type { RequestPayload } from "../types/request.types";

export function assignRequest(request: RequestPayload) {
  const slaHours =
    slaRules[
      request.priority as keyof typeof slaRules
    ];

  return {
    owner: resolveOwner(request.category),
    queue: `${request.category} Queue`,
    slaHours,
  };
}