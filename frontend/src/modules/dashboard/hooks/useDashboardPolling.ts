// src/modules/dashboard/hooks/useDashboardPolling.ts

import { useEffect } from "react";

import {
  fetchDashboardMetrics,
} from "../services/dashboardService";

import {
  useDashboardStore,
} from "../store/dashboardStore";

const POLL_INTERVAL = 15000;

export function useDashboardPolling() {
  const store =
    useDashboardStore();

  useEffect(() => {
    let timeout:
      ReturnType<
        typeof setTimeout
      >;

    let inFlight = false;

    const scheduleNext = () => {
      timeout = setTimeout(
        poll,
        POLL_INTERVAL
      );
    };

    const poll =
      async (): Promise<void> => {
        if (inFlight) {
          return;
        }

        inFlight = true;

        try {
          store.setLoading(
            true
          );

          const data =
            await fetchDashboardMetrics();

          store.setData(
            data
          );

          scheduleNext();
        } catch (error) {
          console.error(
            "[Dashboard Polling]",
            error
          );

          store.setError(
            "Failed to refresh dashboard metrics"
          );

          scheduleNext();
        } finally {
          store.setLoading(
            false
          );

          inFlight = false;
        }
      };

    poll();

    return () =>
      clearTimeout(
        timeout
      );
  }, []);
}