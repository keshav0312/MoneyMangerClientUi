import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const RecentTransactions = ({ transactions = [] }) => {
  console.log(transactions);
  
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
     

      <ul className="space-y-3">
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((tx, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition rounded-lg px-4 py-2"
            >
              {/* Transaction Info */}
              <div>
                <p className="font-medium text-gray-800">{tx.name || "Untitled"}</p>
                <span className="text-sm text-gray-500">{tx.date || "—"}</span>
              </div>

              {/* Amount Badge */}
              <span
                className={`flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-md ${
                  tx.type === "Income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {tx.type === "Income" ? (
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
          <p className="text-gray-500 text-sm">No recent transactions</p>
        )}
      </ul>
    </motion.div>
  );
};

export default RecentTransactions;
