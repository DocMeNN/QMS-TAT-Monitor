// src/modules/data-entry/validation/validationRules.ts

import type { RequestPayload } from "../types/request.types";

export function validateRequest(
  request: RequestPayload
): string[] {
  const errors: string[] = [];

  if (request.title.length < 5) {
    errors.push("Title too short");
  }

  if (request.description.length < 15) {
    errors.push("Description too short");
  }

  if (!request.requester) {
    errors.push("Requester required");
  }

  if (!request.department) {
    errors.push("Department required");
  }

  return errors;
}