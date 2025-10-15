import React from "react";
import { Trash2, Pencil, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const IncomeCard = ({ icon, title, date, category, amount, onDelete, onEdit }) => {
  const niceDate = date ? format(new Date(date), "do MMM yyyy") : "";

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateX: 3, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className="flex flex-row items-center justify-between bg-gradient-to-r from-green-50 via-emerald-100 to-green-50 rounded-2xl p-5 shadow-md hover:shadow-2xl border border-green-200"
    >
      {/* LEFT SECTION */}
      <div className="flex flex-row items-center gap-4 w-full">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-200 text-3xl shadow-inner">
          {icon || "💰"}
        </div>

        <div className="flex flex-col justify-center flex-grow">
          <span className="text-lg font-semibold text-gray-800">{title}</span>
          <span className="text-sm text-gray-500">{niceDate}</span>
          <span className="text-xs text-gray-400 italic">{category}</span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-row items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 bg-gradient-to-r from-green-200 to-emerald-300 text-green-800 px-4 py-2 rounded-lg font-bold shadow-sm">
          <TrendingUp size={18} className="text-green-600" />
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

export default IncomeCard;
