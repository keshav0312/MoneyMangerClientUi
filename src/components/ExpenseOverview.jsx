import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts";
import { TrendingDown } from "lucide-react";

const COLORS = ["#F87171", "#FB923C", "#FBBF24", "#34D399", "#60A5FA"];

const ExpenseOverview = ({ transactions = [] }) => {
  const categoryData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      map[t.categoryName] = (map[t.categoryName] || 0) + Number(t.amount || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const trendData = useMemo(() => {
    return transactions.slice(-6).map((t, i) => ({
      name: `#${i + 1}`,
      amount: Number(t.amount || 0),
    }));
  }, [transactions]);

  const totalExpense = categoryData.reduce((acc, c) => acc + c.value, 0);

  return (
    <div className="bg-gradient-to-r from-red-50 via-rose-100 to-pink-50 p-6 rounded-2xl shadow-xl mt-4 space-y-6 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
        {/* Pie Chart Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Expense Breakdown
          </h2>

          <div className="relative w-64 h-64">
            {/* Spinning Gradient Ring */}
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,#F87171,#FB923C,#FBBF24,#34D399,#60A5FA)] animate-spin-slow opacity-30 z-0 shadow-lg"></div>

            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter
                    id="shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="8"
                      stdDeviation="6"
                      floodColor="rgba(0,0,0,0.15)"
                    />
                  </filter>
                </defs>

                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={3}
                  dataKey="value"
                  filter="url(#shadow)"
                  isAnimationActive={true}
                  animationDuration={800}
                  labelLine={false}
                >
                  {categoryData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={3}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Total Expense */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <p className="text-gray-600 text-sm font-medium">Total Expense</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{totalExpense.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Line Chart Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="text-red-500" />
            <h2 className="text-lg font-semibold text-gray-700">
              Recent Expense Trend
            </h2>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#EF4444" }}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 relative z-10">
        {categoryData.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            ></span>
            {c.name} – ₹{c.value.toLocaleString("en-IN")}
          </div>
        ))}
      </div>

      <style>
        {`
          .animate-spin-slow {
            animation: spin 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ExpenseOverview;
