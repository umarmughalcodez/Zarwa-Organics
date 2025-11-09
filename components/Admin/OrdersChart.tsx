// components/admin/analytics/OrdersChart.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface OrdersChartProps {
  data: any[];
}

export function OrdersChart({ data }: OrdersChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Orders by Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="pending"
                stackId="a"
                fill="#fbbf24"
                name="Pending"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="verified"
                stackId="a"
                fill="#60a5fa"
                name="Verified"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="shipped"
                stackId="a"
                fill="#a78bfa"
                name="Shipped"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="delivered"
                stackId="a"
                fill="#34d399"
                name="Delivered"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
