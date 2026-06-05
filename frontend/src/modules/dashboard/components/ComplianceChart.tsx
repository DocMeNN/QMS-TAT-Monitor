// // src/modules/dashboard/components/ComplianceChart.tsx

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import type { TrendPoint } from "../types/dashboard.types";

interface Props {
  percentage: number;
  data: TrendPoint[];
}

export default function ComplianceChart({
  percentage,
  data,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-500 hover:border-yellow-500/40">
      <h3 className="text-slate-400">
        SLA Compliance
      </h3>

      <p className="text-4xl font-bold mb-4">
        {percentage}%
      </p>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="label" />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#facc15"
              fill="#facc15"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}