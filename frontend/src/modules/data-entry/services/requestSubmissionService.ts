// src/modules/data-entry/services/requestSubmissionService.ts

import type { RequestPayload }
  from "../types/request.types";

import { normalizeRequest }
  from "../utils/requestNormalizer";

export async function submitRequest(
  request: RequestPayload
) {
  const normalized =
    normalizeRequest(request);

  await new Promise((resolve) =>
    setTimeout(resolve, 800)
  );

  return {
    success: true,
    payload: normalized,
    timestamp: new Date().toISOString(),
  };
}