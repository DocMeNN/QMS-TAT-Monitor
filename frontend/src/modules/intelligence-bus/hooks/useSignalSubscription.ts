// src/modules/intelligence-bus/hooks/useSignalSubscription.ts

import { useEffect } from "react";

import { useIntelligenceStore } from "../store/intelligenceStore";

export function useSignalSubscription(
  callback: (signal: unknown) => void
) {
  const signals = useIntelligenceStore(
    (state) => state.signals
  );

  useEffect(() => {
    if (!signals.length) return;

    const latestSignal =
      signals[signals.length - 1];

    callback(latestSignal);
  }, [signals, callback]);
}