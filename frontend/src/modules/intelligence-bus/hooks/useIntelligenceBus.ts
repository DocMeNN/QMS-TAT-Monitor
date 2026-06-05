// src/modules/intelligence-bus/hooks/useIntelligenceBus.ts

import { useIntelligenceStore } from "../store/intelligenceStore";

export function useIntelligenceBus() {
  const store =
    useIntelligenceStore();

  return {
    ...store,
  };
}