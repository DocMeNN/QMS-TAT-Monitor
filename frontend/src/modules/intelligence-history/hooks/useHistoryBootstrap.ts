// src/modules/intelligence-history/hooks/useHistoryBootstrap.ts

/**
 * History Bootstrap Hook
 * --------------------------------------------------
 * Initializes history recording.
 */

import { useEffect } from "react";

import {
  bootstrapHistory,
} from "../services/historyBootstrap";

export function useHistoryBootstrap() {
  useEffect(() => {
    bootstrapHistory();
  }, []);
}