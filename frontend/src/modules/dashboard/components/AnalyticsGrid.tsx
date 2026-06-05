// src/modules/dashboard/components/AnalyticsGrid.tsx

/**
 * Analytics grid
 * ----------------
 * Dashboard visualization orchestration
 */

import { motion } from "framer-motion";

import ThroughputChart from "./ThroughputChart";
import ComplianceChart from "./ComplianceChart";
import CompletionChart from "./CompletionChart";

import type { TrendPoint } from "../types/dashboard.types";

interface Props {
  completionRate: number;
  slaCompliance: number;
  throughput: TrendPoint[];
  complianceTrend: TrendPoint[];
  completionTrend: TrendPoint[];
}

export default function AnalyticsGrid({
  completionRate,
  slaCompliance,
  throughput,
  complianceTrend,
  completionTrend,
}: Props) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="grid xl:grid-cols-3 gap-6 mt-8"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <ThroughputChart data={throughput} />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <ComplianceChart
          percentage={slaCompliance}
          data={complianceTrend}
        />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <CompletionChart
          percentage={completionRate}
          data={completionTrend}
        />
      </motion.div>
    </motion.section>
  );
}