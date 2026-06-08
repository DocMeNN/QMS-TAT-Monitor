// src/modules/dashboard/hooks/useLiveOperations.ts

import {
  useEffect,
} from "react";

import {
  liveOperationsSimulator,
} from "../services/liveOperationsSimulator";

export function useLiveOperations() {
  useEffect(() => {
    liveOperationsSimulator.start();

    return () => {
      liveOperationsSimulator.stop();
    };
  }, []);
}

export default useLiveOperations;