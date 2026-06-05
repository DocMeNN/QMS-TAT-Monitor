// src/modules/data-entry/hooks/useAssignmentRouting.ts

import { useMemo } from "react";
import { RequestPayload } from "../types/request.types";
import { assignRequest } from "../services/assignmentService";

export function useAssignmentRouting(
  request: RequestPayload
) {
  return useMemo(() => assignRequest(request), [request]);
}