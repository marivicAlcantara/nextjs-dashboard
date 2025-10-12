'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Revenue = {
  month: string;
  revenue: number;
};

export default function RevenueChart({ revenue }: { revenue: Revenue[] }) {
  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Revenue Chart</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={revenue}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
