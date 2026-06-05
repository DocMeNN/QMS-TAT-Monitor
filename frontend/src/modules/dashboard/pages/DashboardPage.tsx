// src/modules/dashboard/pages/DashboardPage.tsx

import AlertBanner from "../components/AlertBanner";
import SystemHealthBadge from "../components/SystemHealthBadge";

import {
  useDashboardPolling,
} from "../hooks/useDashboardPolling";

import {
  useDashboardStore,
} from "../store/dashboardStore";

export default function DashboardPage() {
  useDashboardPolling();

  const {
    data,
    stale,
    reconnecting,
    telemetry,
    predictive,
    mitigationMode,
    pollInterval,
    circuitState,
    federation,
  } = useDashboardStore();

  const dashboardData = data;

  const metrics =
    dashboardData?.metrics ?? {
      total_requests: 0,
      completed: 0,
      breached_sla: 0,
      avg_tat_hours: 0,
    };

  return (
    <div className="p-8 space-y-8">
      <AlertBanner
        status={
          dashboardData?.system_health ??
          "INITIALIZING"
        }
        stale={stale}
        reconnecting={reconnecting}
      />

      <SystemHealthBadge
        status={
          dashboardData?.system_health ??
          "INITIALIZING"
        }
      />

      <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl shadow-xl p-6">
        <h2 className="text-xl font-semibold text-cyan-300 mb-6">
          Live Dashboard Metrics Panel
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Requests"
            value={metrics.total_requests}
          />

          <MetricCard
            title="Completed"
            value={metrics.completed}
          />

          <MetricCard
            title="Breached SLA"
            value={metrics.breached_sla}
          />

          <MetricCard
            title="Avg TAT"
            value={`${metrics.avg_tat_hours}h`}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <InfoPanel
          title="Autonomous Resilience Intelligence"
          value={`${predictive.score}/100`}
          subtitle={predictive.band}
        />

        <InfoPanel
          title="Mitigation Engine"
          value={mitigationMode}
          subtitle={`Circuit: ${circuitState}`}
        />

        <InfoPanel
          title="Federation Confidence"
          value={`${federation.confidence}%`}
          subtitle={
            federation.quorumReached
              ? "Quorum Reached"
              : "Pending"
          }
        />

        <InfoPanel
          title="Consensus Risk"
          value={`${federation.consensusRisk}`}
          subtitle="Collective Evaluation"
        />

        <InfoPanel
          title="Telemetry State"
          value={
            telemetry.anomalyDetected
              ? "Alert"
              : "Stable"
          }
          subtitle="Autonomous Monitoring"
        />

        <InfoPanel
          title="Polling Cadence"
          value={`${pollInterval / 1000}s`}
          subtitle="Live Sync"
        />
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-slate-800/70 p-4 border border-slate-700">
      <div className="text-slate-400 text-xs uppercase">
        {title}
      </div>

      <div className="text-2xl font-bold text-cyan-300 mt-2">
        {value}
      </div>
    </div>
  );
}

function InfoPanel({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
      <h3 className="text-sm text-slate-300 mb-3">
        {title}
      </h3>

      <div className="text-xl font-semibold text-cyan-300">
        {value}
      </div>

      <div className="text-xs text-slate-400 mt-2">
        {subtitle}
      </div>
    </div>
  );
}