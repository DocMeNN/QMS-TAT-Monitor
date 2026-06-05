// src/modules/dashboard/components/ThroughputChart.tsx

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { TrendPoint } from "../types/dashboard.types";

interface Props {
  data: TrendPoint[];
}

export default function ThroughputChart({
  data,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-500 hover:border-cyan-500/40">
      <h3 className="text-slate-400 mb-4">
        Throughput Trend
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}