import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const Transactions = ({ title, transactions = [], type, onMore }) => {
  const isIncome = type === "income";

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {onMore && (
          <button
            onClick={onMore}
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            More →
          </button>
        )}
      </div>

      {/* Transactions List */}
      <ul className="space-y-3">
        {transactions.length > 0 ? (
          transactions.map((tx, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition rounded-lg px-4 py-2"
            >
              {/* Transaction details */}
              <div>
                <p className="font-medium text-gray-800">{tx.name || "Untitled"}</p>
                <span className="text-sm text-gray-500">{tx.date || "—"}</span>
              </div>

              {/* Amount badge */}
              <span
                className={`flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-md ${
                  isIncome
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isIncome ? (
                  <>
                    <span>+ ₹{tx.amount?.toLocaleString("en-IN") || "0"}</span>
                    <TrendingUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>- ₹{tx.amount?.toLocaleString("en-IN") || "0"}</span>
                    <TrendingDown className="w-4 h-4" />
                  </>
                )}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No transactions found</p>
        )}
      </ul>
    </motion.div>
  );
};

export default Transactions;
