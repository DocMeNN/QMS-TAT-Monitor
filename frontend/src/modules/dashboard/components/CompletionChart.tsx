// // src/modules/dashboard/components/CompletionChart.tsx

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import type { TrendPoint } from "../types/dashboard.types";

interface Props {
  percentage: number;
  data: TrendPoint[];
}

export default function CompletionChart({
  percentage,
  data,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-500 hover:border-green-500/40">
      <h3 className="text-slate-400">
        Completion Trend
      </h3>

      <p className="text-4xl font-bold mb-4">
        {percentage}%
      </p>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <Tooltip />

            <Bar
              dataKey="value"
              fill="#22c55e"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}