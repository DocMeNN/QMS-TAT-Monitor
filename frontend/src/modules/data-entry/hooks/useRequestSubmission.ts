// src/modules/data-entry/hooks/useRequestSubmission.ts

import { useState } from "react";
import { RequestPayload } from "../types/request.types";

export function useRequestSubmission() {
  const [submitting, setSubmitting] = useState(false);

  async function submitRequest(
    request: RequestPayload
  ) {
    setSubmitting(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    setSubmitting(false);

    return {
      success: true,
      message: "Request submitted successfully",
    };
  }

  return {
    submitting,
    submitRequest,
  };
}