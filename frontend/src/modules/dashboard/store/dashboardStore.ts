// src/modules/dashboard/store/dashboardStore.ts

import { create } from "zustand";

import type {
  DashboardAnalytics,
} from "../types/dashboard.types";

interface DashboardTelemetry {
  latency: number[];
  avgLatency: number;
  trend: "stable" | "rising" | "falling";
  anomalyDetected: boolean;
}

type CircuitState =
  | "closed"
  | "half-open"
  | "open";

type DegradationBand =
  | "stable"
  | "elevated"
  | "degrading"
  | "critical";

type MitigationMode =
  | "normal"
  | "conserve"
  | "restricted"
  | "emergency";

interface PredictiveTelemetry {
  score: number;
  band: DegradationBand;
}

interface FederationState {
  consensusRisk: number;
  degradedPeers: number;
  quorumReached: boolean;
  confidence: number;
}

interface AlertState {
  score: number;
  level:
    | "low"
    | "medium"
    | "high"
    | "critical";
  confidence: number;
}

interface IncidentPrediction {
  probability: number;
  riskBand:
    | "low"
    | "medium"
    | "high"
    | "critical";
}

interface ExecutiveDecisionState {
  recommendation: string;
  confidence: number;
}

interface OrchestrationState {
  mode: MitigationMode;
  active: boolean;
}

interface ExecutionRecord {
  id: string;
  actionType: string;
  title: string;
  status: string;
  severity: number;
  executedAt: string;
}

interface RequestPayload {
  title: string;
  description: string;
  department: string;
  priority: string;
  createdAt: string;
}

interface DashboardState {
  data: DashboardAnalytics | null;

  loading: boolean;
  error: string | null;
  stale: boolean;
  retryCount: number;
  reconnecting: boolean;

  pollInterval: number;
  circuitState: CircuitState;
  mitigationMode: MitigationMode;

  telemetry: DashboardTelemetry;
  predictive: PredictiveTelemetry;
  federation: FederationState;

  alertState: AlertState;

  incidentPrediction: IncidentPrediction;

  executiveDecision: ExecutiveDecisionState;

  orchestrationState: OrchestrationState;

  executions: ExecutionRecord[];

  addRequest: (
    request: RequestPayload
  ) => void;

  addExecution: (
    execution: ExecutionRecord
  ) => void;

  updateAlertState: (
    alert: AlertState
  ) => void;

  updateIncidentPrediction: (
    prediction: IncidentPrediction
  ) => void;

  updateExecutiveDecision: (
    decision: ExecutiveDecisionState
  ) => void;

  updateOrchestrationState: (
    state: OrchestrationState
  ) => void;

  setData: (
    data: DashboardAnalytics
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setError: (
    error: string | null
  ) => void;

  setStale: (
    stale: boolean
  ) => void;
}

export const useDashboardStore =
  create<DashboardState>(
    (set) => ({
      data: {
        metrics: {
          total_requests: 0,
          avg_tat_hours: 0,
          completed: 0,
          breached_sla: 0,
        },
        throughput: [],
        compliance_trend: [],
        completion_trend: [],
        completion_rate: 0,
        sla_compliance: 100,
        system_health: "healthy",
        last_updated:
          new Date().toISOString(),
      },

      loading: false,

      error: null,

      stale: false,

      retryCount: 0,

      reconnecting: false,

      pollInterval: 15000,

      circuitState: "closed",

      mitigationMode: "normal",

      telemetry: {
        latency: [],
        avgLatency: 0,
        trend: "stable",
        anomalyDetected: false,
      },

      predictive: {
        score: 56,
        band: "elevated",
      },

      federation: {
        consensusRisk: 55,
        degradedPeers: 0,
        quorumReached: false,
        confidence: 25,
      },

      alertState: {
        score: 56,
        level: "medium",
        confidence: 0.7,
      },

      incidentPrediction: {
        probability: 58,
        riskBand: "medium",
      },

      executiveDecision: {
        recommendation:
          "Monitor Closely",
        confidence: 0.7,
      },

      orchestrationState: {
        mode: "normal",
        active: false,
      },

      executions: [],

      addRequest: () =>
        set((state) => {
          if (!state.data) {
            return {};
          }

          return {
            data: {
              ...state.data,

              metrics: {
                ...state.data.metrics,

                total_requests:
                  state.data.metrics
                    .total_requests + 1,

                avg_tat_hours:
                  state.data.metrics
                    .avg_tat_hours + 2,
              },

              last_updated:
                new Date().toISOString(),
            },
          };
        }),

      addExecution: (
        execution
      ) =>
        set((state) => ({
          executions: [
            execution,
            ...state.executions,
          ].slice(0, 50),
        })),

      updateAlertState: (
        alert
      ) =>
        set({
          alertState: alert,
        }),

      updateIncidentPrediction: (
        prediction
      ) =>
        set({
          incidentPrediction:
            prediction,
        }),

      updateExecutiveDecision: (
        decision
      ) =>
        set({
          executiveDecision:
            decision,
        }),

      updateOrchestrationState: (
        orchestration
      ) =>
        set({
          orchestrationState:
            orchestration,
        }),

      setData: (data) =>
        set({
          data,
          stale: false,
          error: null,
        }),

      setLoading: (loading) =>
        set({ loading }),

      setError: (error) =>
        set({ error }),

      setStale: (stale) =>
        set({ stale }),
    })
  );