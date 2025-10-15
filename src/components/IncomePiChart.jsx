import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const IncomePieChart = () => {
  const data = [
    { name: "Stock Dividends", value: 6000 },
    { name: "Birthday Gift", value: 3000 },
    { name: "Flat Rent Received", value: 5000 },
  ];

  const COLORS = ["#7C3AED", "#EC4899", "#14B8A6"];

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl shadow-sm p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Income Breakdown</h2>

      <PieChart width={350} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          stroke="#fff" // adds white border line around each slice
          strokeWidth={3} // line thickness
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />
        <Legend />
      </PieChart>
    </div>
  );
};

export default IncomePieChart;
