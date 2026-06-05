// src/modules/intelligence-bus/hooks/useConsumerBootstrap.ts

/**
 * Consumer Bootstrap Hook
 * --------------------------------------------------
 * Registers intelligence consumers once during
 * application startup.
 */

import { useEffect } from "react";

import {
  bootstrapConsumers,
} from "../services/consumerRegistry";

export function useConsumerBootstrap() {
  useEffect(() => {
    bootstrapConsumers();
  }, []);

  return null;
}