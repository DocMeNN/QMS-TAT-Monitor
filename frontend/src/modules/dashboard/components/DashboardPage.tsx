// src/modules/dashboard/components/DashboardPage.tsx

/**
 * Dashboard page
 * ----------------
 * Main dashboard orchestration layer
 */

import { motion } from "framer-motion";

import DashboardHeader from "./DashboardHeader";
import MetricsGrid from "./MetricsGrid";
import AnalyticsGrid from "./AnalyticsGrid";
import SystemHealthBadge from "./SystemHealthBadge";
import LastUpdated from "./LastUpdated";
import AlertBanner from "./AlertBanner";

import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const { metrics, loading } = useDashboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center animate-pulse">
        Syncing live dashboard...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-950 text-white"
    >
      <DashboardHeader status={metrics.system_health} />

      <main className="p-8 space-y-8">
        <section className="flex items-center justify-between">
          <SystemHealthBadge status={metrics.system_health} />
          <LastUpdated timestamp={metrics.last_updated} />
        </section>

        <AlertBanner status={metrics.system_health} />

        <MetricsGrid metrics={metrics.metrics} />

        <AnalyticsGrid
          completionRate={metrics.completion_rate}
          slaCompliance={metrics.sla_compliance}
          throughput={metrics.throughput}
          complianceTrend={metrics.compliance_trend}
          completionTrend={metrics.completion_trend}
        />
      </main>
    </motion.div>
  );
}