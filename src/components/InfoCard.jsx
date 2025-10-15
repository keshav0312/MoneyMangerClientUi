// src/components/InfoCard.jsx
import React from "react";
import { motion } from "framer-motion";

const colorMap = {
  indigo: "bg-gradient-to-br from-indigo-600 to-indigo-500",
  green: "bg-gradient-to-br from-emerald-600 to-emerald-500",
  red: "bg-gradient-to-br from-rose-600 to-rose-500",
};

const formatCurrency = (val) => {
  // simple formatter - expects number or numeric string
  const n = Number(val || 0);
  return n.toLocaleString("en-IN");
};

const InfoCard = ({ icon, label, value, color = "indigo" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`rounded-2xl p-5 shadow-lg text-white flex items-center justify-between ${colorMap[color]}`}
    >
      <div>
        <p className="text-sm opacity-90">{label}</p>
        <h2 className="text-2xl font-bold mt-1">₹{formatCurrency(value)}</h2>
      </div>

      <div className="bg-white/20 p-3 rounded-full">
        {icon}
      </div>
    </motion.div>
  );
};

export default InfoCard;
