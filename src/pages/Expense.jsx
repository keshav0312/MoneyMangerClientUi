import React, { useEffect, useState } from "react";
import DashBoard from "../components/DashBoard";
import useUser from "../Hooks/useUser";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import Model from "../components/Model";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import AxiosConfig from "../util/AxiosConfig";
import { ApiEndpoints } from "../util/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import { Download, Mail, Plus, TrendingDown, Receipt, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const Expense = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [deleteState, setDeleteState] = useState({ show: false, data: null });

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [expRes, catRes] = await Promise.all([
        AxiosConfig.get(ApiEndpoints.GET_ALL_EXPENSE),
        AxiosConfig.get(ApiEndpoints.CATEGORY_BY_TYPE("expense")),
      ]);
      setExpenseData(expRes.data || []);
      setCategories(catRes.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch expenses/categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Expense Loading Animation
  const ExpenseLoadingAnimation = () => (
    <DashBoard>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-8">
        <motion.div
          className="text-center w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Expense Flow Animation */}
          <div className="relative mb-12">
            {/* Expense Container */}
            <div className="w-full max-w-2xl mx-auto h-48 bg-white/50 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm p-6 overflow-hidden">
              {/* Rising Expense Animation */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  className="absolute text-xl font-bold text-red-500"
                  initial={{ y: 300, x: Math.random() * 300, opacity: 0 }}
                  animate={{ 
                    y: -50, 
                    opacity: [0, 1, 0],
                    rotate: [0, -180, -360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: item * 0.5,
                    ease: "easeOut"
                  }}
                >
                  💸
                </motion.div>
              ))}
              
              {/* Expense Bars */}
              <div className="flex items-end justify-center gap-3 h-32 mt-4">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <motion.div
                    key={item}
                    className="w-10 bg-gradient-to-t from-red-400 to-orange-600 rounded-t-lg relative"
                    initial={{ height: 60 }}
                    animate={{ 
                      height: [60, Math.random() * 80 + 20, 60],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/50 rounded-t-lg" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Expense Icons */}
            <motion.div
              className="absolute -top-6 -left-6"
              animate={{
                y: [0, 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <TrendingDown className="w-14 h-14 text-red-500 drop-shadow-lg" />
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Receipt className="w-12 h-12 text-orange-500 drop-shadow-lg" />
            </motion.div>
          </div>

          {/* Loading Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Analyzing Expenses
            </h3>
            <p className="text-gray-600 text-lg mb-6">Tracking spending patterns and budget allocation...</p>
          </motion.div>

          {/* Expense Metrics Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            {[
              { label: "Total Expenses", color: "red", icon: TrendingDown },
              { label: "This Month", color: "orange", icon: Receipt },
              { label: "Categories", color: "amber", icon: CreditCard }
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
                      rotate: [0, -5, 0, 5, 0],
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

          {/* Circular Progress with Expense Animation */}
          <div className="relative inline-block mb-8">
            <motion.div
              className="w-24 h-24 border-4 border-red-200 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-red-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <TrendingDown className="w-8 h-8 text-red-600" />
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
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Processing expense data</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.floor(Math.random() * 85 + 10)}%
              </motion.span>
            </div>
            
            <div className="bg-white/50 rounded-full h-3 shadow-inner overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-full"
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

  const handleAddExpense = async (payload) => {
    try {
      const _t = toast.loading("Adding expense...");
      await AxiosConfig.post(ApiEndpoints.ADD_EXPENSE, payload);
      toast.success("Expense added", { id: _t });
      setOpenAddExpenseModal(false);
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add expense");
    }
  };

  const handleDelete = async (expense) => {
    try {
      const _t = toast.loading("Deleting...");
      await AxiosConfig.delete(ApiEndpoints.DELETE_EXPENSE(expense.id));
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
      const res = await AxiosConfig.get(ApiEndpoints.DOWNLOAD_EXPENSE_EXCEL, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Download ready", { id: _t });
    } catch (err) {
      console.error(err);
      toast.error("Failed to download Excel");
    }
  };

  const handleSendEmail = async () => {
    try {
      const _t = toast.loading("Sending email...");
      await AxiosConfig.get(ApiEndpoints.SEND_EMAIL_ATTATCHMENT_ExPENSE);
      toast.success("Email sent successfully!", { id: _t });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send email");
    }
  };

  if (loading) return <ExpenseLoadingAnimation />;

  return (
    <>
      <Toaster position="top-center" />
      <DashBoard>
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black-900">
              Expense Tracker
            </h1>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setOpenAddExpenseModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium 
                bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 
                transition-all shadow-md hover:shadow-lg"
              >
                <Plus size={18} /> Add Expense
              </button>

              <button
                onClick={handleSendEmail}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white 
                bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 
                transition-all shadow-md hover:shadow-lg"
              >
                <Mail size={18} /> Send Email
              </button>

              <button
                onClick={handleDownloadExcel}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white 
                bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 
                transition-all shadow-md hover:shadow-lg"
              >
                <Download size={18} /> Download Excel
              </button>
            </div>
          </div>

          {/* Expense Overview */}
          <ExpenseOverview transactions={expenseData} />

          {/* Expense List */}
          <ExpenseList
            transactions={expenseData}
            loading={loading}
            onDeleteRequest={(item) => setDeleteState({ show: true, data: item })}
          />
        </div>
      </DashBoard>

      {/* Add Expense Modal */}
      <Model
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onSaveExpense={handleAddExpense} categories={categories} />
      </Model>

      {/* Delete Confirmation Modal */}
      <Model
        isOpen={deleteState.show}
        onClose={() => setDeleteState({ show: false, data: null })}
        title="Confirm delete"
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

export default Expense;