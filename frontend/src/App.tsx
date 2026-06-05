// src/App.tsx

/**
 * QMS TAT Monitor
 * -------------------------------------------------------
 * Root Application Shell
 *
 * Phase 14.2
 * -------------------------------------------------------
 * - Operational Dashboard
 * - Autonomous Intelligence Dashboard
 * - Data Entry Layer
 * - Intelligence Consumer Bootstrap
 * - Signal Monitoring
 *
 * MeRulz Compliant
 * -------------------------------------------------------
 * Full file replacement
 * Modular architecture preserved
 */

import DashboardPage from "./modules/dashboard/pages/DashboardPage";
import QmsDashboard from "./modules/dashboard/pages/QmsDashboard";
import DataEntryPage from "./modules/data-entry/pages/DataEntryPage";

import {
  useSignalSubscription,
} from "./modules/intelligence-bus";

import {
  useConsumerBootstrap,
} from "./modules/intelligence-bus/hooks/useConsumerBootstrap";

export default function App() {
  useConsumerBootstrap();

  useSignalSubscription(
    (signal) => {
      console.log(
        "[INTELLIGENCE SIGNAL]",
        signal
      );
    }
  );

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-100">

      {/* Background Layer */}

      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),transparent_35%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.12),transparent_35%)]" />

      {/* Application Content */}

      <div className="relative z-10 space-y-10">

        {/* ===================================================
            Operational Dashboard
        ==================================================== */}

        <section>
          <DashboardPage />
        </section>

        {/* ===================================================
            Autonomous Intelligence Layer
        ==================================================== */}

        <section className="px-8">
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 p-6">
            <QmsDashboard />
          </div>
        </section>

        {/* ===================================================
            Data Entry Layer
        ==================================================== */}

        <section className="px-8 pb-8">
          <div className="rounded-2xl border border-indigo-500/20 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 p-6">
            <DataEntryPage />
          </div>
        </section>

      </div>
    </main>
  );
}