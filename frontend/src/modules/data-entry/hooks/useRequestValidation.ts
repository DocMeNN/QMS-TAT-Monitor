// src/modules/data-entry/hooks/useRequestValidation.ts

import { useMemo } from "react";
import { RequestPayload } from "../types/request.types";
import { validateRequest } from "../validation/validationRules";

export function useRequestValidation(
  request: RequestPayload
) {
  const errors = useMemo(
    () => validateRequest(request),
    [request]
  );

  return {
    valid: errors.length === 0,
    errors,
  };
}