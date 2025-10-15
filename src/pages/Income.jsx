import React, { useEffect, useState } from "react";
import DashBoard from "../components/DashBoard";
import useUser from "../Hooks/useUser";
import IncomeOverview from "../components/IncomeOverview";
import IncomeList from "../components/IncomeList";
import Model from "../components/Model";
import AddIncomeForm from "../components/AddIncomeFrom";
import DeleteAlert from "../components/DeleteAlert";
import AxiosConfig from "../util/AxiosConfig";
import { ApiEndpoints } from "../util/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Download, Plus, TrendingUp, ArrowDownCircle, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const Income = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [deleteState, setDeleteState] = useState({ show: false, data: null });

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [incRes, catRes] = await Promise.all([
        AxiosConfig.get(ApiEndpoints.GET_ALL_INCOME),
        AxiosConfig.get(ApiEndpoints.CATEGORY_BY_TYPE("income")),
      ]);
      setIncomeData(incRes.data || []);
      setCategories(catRes.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch incomes/categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Income Loading Animation
  const IncomeLoadingAnimation = () => (
    <DashBoard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 md:p-8">
        <motion.div
          className="text-center w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Money Flow Animation */}
          <div className="relative mb-8 md:mb-12">
            {/* Money Flow Container */}
            <div className="w-full max-w-2xl mx-auto h-40 md:h-48 bg-white/50 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm p-4 md:p-6 overflow-hidden">
              {/* Falling Money Animation */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <motion.div
                  key={item}
                  className="absolute text-xl md:text-2xl font-bold text-green-500"
                  initial={{ y: -50, x: Math.random() * 300, opacity: 0 }}
                  animate={{ 
                    y: 300, 
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: item * 0.4,
                    ease: "easeIn"
                  }}
                >
                  ₹
                </motion.div>
              ))}
              
              {/* Income Growth Chart */}
              <div className="flex items-end justify-center gap-2 md:gap-3 h-24 md:h-32 mt-4">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <motion.div
                    key={item}
                    className="w-6 md:w-10 bg-gradient-to-t from-green-400 to-emerald-600 rounded-t-lg relative"
                    initial={{ height: 20 }}
                    animate={{ 
                      height: [20, Math.random() * 80 + 40, 20],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/50 rounded-t-lg" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Income Icons */}
            <motion.div
              className="absolute -top-4 -left-4 md:-top-6 md:-left-6"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <TrendingUp className="w-10 h-10 md:w-14 md:h-14 text-green-500 drop-shadow-lg" />
            </motion.div>

            <motion.div
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <ArrowDownCircle className="w-8 h-8 md:w-12 md:h-12 text-emerald-500 drop-shadow-lg" />
            </motion.div>
          </div>

          {/* Loading Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent mb-3 md:mb-4">
              Tracking Your Income
            </h3>
            <p className="text-gray-600 text-sm md:text-lg mb-4 md:mb-6">Analyzing revenue streams and financial growth...</p>
          </motion.div>

          {/* Income Metrics Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto mb-8 md:mb-12">
            {[
              { label: "Total Income", color: "green", icon: DollarSign },
              { label: "This Month", color: "emerald", icon: TrendingUp },
              { label: "Categories", color: "teal", icon: ArrowDownCircle }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                <div className="flex items-center justify-center mb-2 md:mb-3">
                  <motion.div
                    className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600`}
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
                    <metric.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                </div>
                
                <div className="text-center">
                  <div className="h-3 md:h-4 bg-gray-200 rounded-full mb-1 md:mb-2 overflow-hidden">
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
                  <p className="text-xs md:text-sm font-semibold text-gray-700">{metric.label}</p>
                  
                  <motion.div
                    className="h-4 md:h-6 bg-gray-300 rounded mt-1 md:mt-2 overflow-hidden"
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

          {/* Circular Progress with Money Flow */}
          <div className="relative inline-block mb-6 md:mb-8">
            <motion.div
              className="w-16 h-16 md:w-24 md:h-24 border-4 border-green-200 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 border-4 border-transparent border-t-green-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </motion.div>
            </div>
          </div>

          {/* Loading Status */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
              <span>Processing income data</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.floor(Math.random() * 85 + 10)}%
              </motion.span>
            </div>
            
            <div className="bg-white/50 rounded-full h-2 md:h-3 shadow-inner overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-full"
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

  const handleAddIncome = async (payload) => {
    try {
      const _t = toast.loading("Adding income...");
      await AxiosConfig.post(ApiEndpoints.ADD_INCOME, payload);
      toast.success("Income added", { id: _t });
      setOpenAddIncomeModal(false);
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add income");
    }
  };

  const handleDelete = async (income) => {
    try {
      const _t = toast.loading("Deleting...");
      await AxiosConfig.delete(ApiEndpoints.DELETE_INCOME(income.id));
      toast.success("Deleted", { id: _t });
      setDeleteState({ show: false, data: null });
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const _t = toast.loading("Preparing download...");
      const res = await AxiosConfig.get(ApiEndpoints.DOWNLOAD_INCOME_EXCEL, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "incomes.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Download ready", { id: _t });
    } catch (err) {
      console.error(err);
      toast.error("Failed to download");
    }
  };

  const handleSendEmail = async () => {
    try {
      const _t = toast.loading("Sending email...");
      await AxiosConfig.get(ApiEndpoints.SEND_EMAIL_ATTATCHMENT_INCOME);
      toast.success("Email sent successfully!", { id: _t });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send email");
    }
  };

  if (loading) return <IncomeLoadingAnimation />;

  return (
    <>
      <Toaster position="top-center" />
      <DashBoard>
        <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
          {/* Header Section - Fixed for mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
            <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black-900 text-center sm:text-left">
              Income Tracker
            </h1>
            
            {/* Action Buttons - Fixed mobile layout */}
            <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => setOpenAddIncomeModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium 
                bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                transition-all shadow-md hover:shadow-lg text-sm sm:text-base order-1"
              >
                <Plus size={18} /> Add Income
              </button>

              <div className="flex gap-2 order-3 sm:order-2">
                <button
                  onClick={handleSendEmail}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-medium text-white 
                  bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 
                  transition-all shadow-md hover:shadow-lg text-sm"
                >
                  <Mail size={16} /> Email
                </button>

                <button
                  onClick={handleDownloadExcel}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-medium text-white 
                  bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 
                  transition-all shadow-md hover:shadow-lg text-sm"
                >
                  <Download size={16} /> Excel
                </button>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="mt-4 md:mt-6">
            <IncomeOverview transactions={incomeData} />
          </div>

          {/* Transaction List */}
          <div className="mt-6 md:mt-10">
            <IncomeList
              transactions={incomeData}
              loading={loading}
              onDeleteRequest={(item) =>
                setDeleteState({ show: true, data: item })
              }
            />
          </div>
        </div>
      </DashBoard>

      {/* Add Income Modal */}
      <Model
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} categories={categories} />
      </Model>

      {/* Delete Confirmation Modal */}
      <Model
        isOpen={deleteState.show}
        onClose={() => setDeleteState({ show: false, data: null })}
        title="Confirm Delete"
      >
        <DeleteAlert
          content={`Delete "${deleteState.data?.name}"? This will remove it from totals.`}
          onDelete={() => handleDelete(deleteState.data)}
          onCancel={() => setDeleteState({ show: false, data: null })}
        />
      </Model>
    </>
  );
};

export default Income;