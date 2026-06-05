// src/modules/dashboard/components/MetricCard.tsx

/**
 * Metric Card
 * -----------------------------
 * Premium animated KPI card
 */

import { motion } from "framer-motion";
import type { MetricCardProps } from "../types/dashboard.types";

export default function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -4,
      }}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        relative overflow-hidden
        rounded-2xl
        border border-slate-800
        bg-gradient-to-br from-slate-950 to-slate-900
        p-6
        shadow-xl
        hover:border-cyan-500/40
      "
    >
      {/* Glow Accent */}
      <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none" />

      {/* Title */}
      <h3 className="text-sm font-medium text-slate-400 relative z-10">
        {title}
      </h3>

      {/* Value */}
      <motion.p
        key={String(value)}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="
          relative z-10
          mt-4
          text-4xl
          font-bold
          tracking-tight
          text-white
        "
      >
        {value}
      </motion.p>
    </motion.div>
  );
}