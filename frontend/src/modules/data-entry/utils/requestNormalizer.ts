// src/modules/data-entry/utils/requestNormalizer.ts

import type { RequestPayload }
  from "../types/request.types";

export function normalizeRequest(
  request: RequestPayload
): RequestPayload {
  return {
    ...request,
    title: request.title.trim(),
    requester: request.requester.trim(),
    department: request.department.trim(),
    description: request.description.trim(),
    category: request.category.trim(),
  };
}