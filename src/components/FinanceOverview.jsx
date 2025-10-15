import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // Green for income, Red for expense

const FinanceOverview = ({ data, centerLabel }) => {
  return (
    <div className="relative w-full h-64">
      {/* Spinning Gradient Ring Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,#22c55e,#4f46e5,#ef4444)] animate-spin-slow shadow-xl"></div>
      </div>

      <ResponsiveContainer>
        <PieChart>
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="6"
                floodColor="rgba(0,0,0,0.15)"
              />
            </filter>
          </defs>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={3}
            filter="url(#shadow)"
            labelLine={false}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "0.85rem",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-gray-600 text-sm font-medium">Total Balance</span>
        <span className="text-xl font-semibold text-gray-800">{centerLabel}</span>
        <div className="flex space-x-4 mt-2">
          <span className="flex items-center text-green-500">↑ Income</span>
          <span className="flex items-center text-red-500">↓ Expense</span>
        </div>
      </div>

      <style>
        {`
          .animate-spin-slow {
            animation: spin 10s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default FinanceOverview;
