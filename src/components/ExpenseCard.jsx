import React from "react";
import { Trash2, Pencil, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const ExpenseCard = ({ icon, title, date, amount, category, onDelete, onEdit }) => {
  const niceDate = date ? format(new Date(date), "do MMM yyyy") : "";

  return (
    <motion.div
      whileHover={{ scale: 1.04, rotateX: 3, rotateY: 3 }}
      transition={{ type: "spring", stiffness: 300, damping: 12 }}
      className="flex items-center justify-between bg-gradient-to-r from-rose-50 via-pink-100 to-red-50 rounded-2xl p-5 shadow-md hover:shadow-2xl border border-red-100"
    >
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-200 flex items-center justify-center text-3xl shadow-inner">
          {icon || "💸"}
        </div>
        <div>
          <div className="font-bold text-gray-800 text-lg">{title}</div>
          <div className="text-sm text-gray-500">{niceDate}</div>
          <div className="text-xs text-gray-400 mt-1 italic">{category}</div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gradient-to-r from-red-200 to-rose-300 text-red-800 px-4 py-2 rounded-lg font-bold shadow-sm">
          <TrendingDown size={18} className="text-red-600" />
          {currencyFormatter.format(amount || 0)}
        </div>
        <button
          onClick={onEdit}
          className="p-2 rounded-full border border-blue-200 hover:bg-blue-100 hover:text-blue-600 transition"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-full border border-red-200 hover:bg-red-100 hover:text-red-600 transition"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default ExpenseCard;
