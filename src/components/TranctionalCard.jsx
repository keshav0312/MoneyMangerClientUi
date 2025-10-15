import React from "react";
import { Trash2, Pencil, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const TransactionCard = ({ icon, title, date, amount, category, onDelete, onEdit }) => {
  const niceDate = date ? format(new Date(date), "do MMM yyyy") : "";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex flex-row justify-between items-center w-full p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl shadow hover:shadow-lg border border-green-200"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-green-200 rounded-full text-2xl">
          {icon || "💰"}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-lg">{title}</span>
          <span className="text-sm text-gray-500">{niceDate}</span>
          <span className="text-xs text-gray-400 italic">{category}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-green-700 font-bold bg-green-100 px-3 py-1 rounded-lg">
          <TrendingUp size={18} className="text-green-600" />
          {currencyFormatter.format(amount || 0)}
        </div>
        <button
          onClick={onEdit}
          className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
