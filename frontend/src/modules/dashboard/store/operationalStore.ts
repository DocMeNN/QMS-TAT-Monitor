// src/modules/dashboard/store/operationalStore.ts

import { create } from "zustand";

import {
  operationalSimulationEngine,
} from "../services/operationalSimulationEngine";

import type {
  OperationalSnapshot,
} from "../types/operational.types";

interface OperationalStoreState {
  snapshot: OperationalSnapshot;

  refresh: () => void;
}

export const useOperationalStore =
  create<OperationalStoreState>(
    (set) => ({
      snapshot:
        operationalSimulationEngine.generateSnapshot(),

      refresh: () =>
        set({
          snapshot:
            operationalSimulationEngine.generateSnapshot(),
        }),
    })
  );