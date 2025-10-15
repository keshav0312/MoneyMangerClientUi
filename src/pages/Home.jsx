import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoCard from "../components/InfoCard";
import FinanceOverview from "../components/FinanceOverview";
import RecentTransactions from "../components/RecentTranctions";
import Transactions from "../components/Tranctions";
import DashBoard from "../components/DashBoard";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, DollarSign, Coins, PieChart, BarChart3 } from "lucide-react";
import { ApiEndpoints } from "../util/ApiEndpoints";
import { useNavigate } from "react-router-dom";
import AxiosConfig from "../util/AxiosConfig";
import useUser from "../Hooks/useUser";

const Home = () => {
  useUser();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosConfig
      .get(ApiEndpoints.DASHBORD_DETAILS)
      .then((res) => setDashboard(res.data))
      .catch((err) => console.error("Dashboard fetch failed", err))
      .finally(() => setLoading(false));
  }, []);

  // Unique Financial Loading Animation
  const FinancialLoadingAnimation = () => (
    <DashBoard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
        <motion.div
          className="text-center w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Financial Chart */}
          <div className="relative mb-12">
            {/* Chart Background */}
            <div className="w-full max-w-2xl mx-auto h-48 bg-white/50 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm p-6">
              {/* Animated Chart Bars */}
              <div className="flex items-end justify-center gap-4 h-32">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <motion.div
                    key={item}
                    className="w-8 bg-gradient-to-t from-blue-400 to-purple-500 rounded-t-lg relative"
                    initial={{ height: 10 }}
                    animate={{ 
                      height: [10, Math.random() * 80 + 40, 10],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Bar Top Shine */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/50 rounded-t-lg" />
                    
                    {/* Floating Value */}
                    <motion.div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-600 whitespace-nowrap"
                      animate={{ 
                        y: [0, -5, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3 + 0.5
                      }}
                    >
                      ₹{Math.floor(Math.random() * 5000) + 1000}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              
              {/* Chart X-axis */}
              <div className="flex justify-between mt-4 text-xs text-gray-600 font-medium">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>

            {/* Floating Financial Icons */}
            <motion.div
              className="absolute -top-6 -left-6"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Coins className="w-12 h-12 text-yellow-500 drop-shadow-lg" />
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <PieChart className="w-10 h-10 text-green-500 drop-shadow-lg" />
            </motion.div>

            <motion.div
              className="absolute -bottom-8 left-1/4"
              animate={{
                y: [0, 15, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <BarChart3 className="w-8 h-8 text-purple-500 drop-shadow-lg" />
            </motion.div>
          </div>

          {/* Loading Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Building Your Financial Dashboard
            </h3>
            <p className="text-gray-600 text-lg mb-6">Crunching numbers and analyzing your wealth...</p>
          </motion.div>

          {/* Animated Financial Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            {[
              { icon: Wallet, label: "Balance", color: "blue" },
              { icon: TrendingUp, label: "Income", color: "green" },
              { icon: DollarSign, label: "Expense", color: "red" }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600`}
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded-full mb-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 rounded-full`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{metric.label}</p>
                  
                  {/* Animated Amount */}
                  <motion.div
                    className="h-6 bg-gray-300 rounded mt-2 overflow-hidden"
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: index * 0.4
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Circular Progress with Money Animation */}
          <div className="relative inline-block mb-8">
            <motion.div
              className="w-20 h-20 border-4 border-blue-200 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Floating Money Symbols */}
            <motion.div
              className="absolute -top-2 -right-2 text-lg font-bold text-green-500"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
            >
                ₹
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-2 text-lg font-bold text-green-500"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
            >
                ₹
            </motion.div>
          </div>

          {/* Loading Status */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Processing financial data</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.floor(Math.random() * 85 + 10)}%
              </motion.span>
            </div>
            
            <div className="bg-white/50 rounded-full h-3 shadow-inner overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
                initial={{ width: "10%" }}
                animate={{ width: "95%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </DashBoard>
  );

  if (loading) return <FinancialLoadingAnimation />;

  if (!dashboard)
    return (
      <DashBoard>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center">
          <motion.div
            className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <DollarSign className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Data Available
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't load your dashboard data. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </DashBoard>
    );

  return (
    <DashBoard>
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
        {/* Rest of your existing dashboard content remains the same */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={<Wallet />}
            label="Total Balance"
            value={dashboard.total_balance}
            color="indigo"
          />
          <InfoCard
            icon={<TrendingUp />}
            label="Total Income"
            value={dashboard.total_incomes}
            color="green"
          />
          <InfoCard
            icon={<DollarSign />}
            label="Total Expense"
            value={dashboard.total_expenses}
            color="red"
          />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
            </div>
            <RecentTransactions
              transactions={(dashboard.RecentTransactions || []).slice(0, 5)}
            />
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.1),transparent_70%)]"></div>
            <h3 className="text-xl font-semibold mb-4 relative z-10">
              Financial Overview
            </h3>

            <div className="relative flex flex-col items-center justify-center">
              <div className="w-64 h-64 transform hover:scale-105 transition-all duration-500">
                <FinanceOverview
                  data={[
                    {
                      name: "Total Balance",
                      value: Number(dashboard.total_balance || 0),
                    },
                    {
                      name: "Total Expenses",
                      value: Number(dashboard.total_expenses || 0),
                    },
                    {
                      name: "Total Income",
                      value: Number(dashboard.total_incomes || 0),
                    },
                  ]}
                  centerLabel={`₹${dashboard.total_balance}`}
                />
              </div>

              <div className="flex gap-4 mt-6 relative z-10">
                <button
                  onClick={() => navigate("/expense")}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  Add Expense
                </button>
                <button
                  onClick={() => navigate("/income")}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  Add Income
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Transactions
            title="Recent Expenses"
            transactions={(dashboard.Recent5expenses || []).slice(0, 5)}
            type="expense"
            onMore={() => navigate("/income")}
          />
          <Transactions
            title="Recent Incomes"
            transactions={(dashboard.Recent5incomes || []).slice(0, 5)}
            type="income"
            onMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashBoard>
  );
};

export default Home;