import React, { useState, useEffect } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const AddExpenseForm = ({ onSaveExpense, categories = [], editData }) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    amount: "",
    date: moment().format("YYYY-MM-DD"),
    categoryId: "",
    icon: "💸",
  });
  const [isFocused, setIsFocused] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        id: editData.id,
        name: editData.name,
        amount: editData.amount,
        date: editData.date?.slice(0, 10) || moment().format("YYYY-MM-DD"),
        categoryId: editData.categoryId,
        icon: editData.icon || "💸",
      });
    }
  }, [editData]);

  const handleChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  
  const handleEmojiSelect = (emoji) => {
    setForm((s) => ({ ...s, icon: emoji }));
  };

  const handleFocus = (field) => () => setIsFocused((s) => ({ ...s, [field]: true }));
  const handleBlur = (field) => () => setIsFocused((s) => ({ ...s, [field]: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.date || !form.categoryId) {
      return toast.error("Please fill all fields");
    }
    
    setSubmitting(true);
    const payload = {
      id: form.id,
      name: form.name,
      amount: Number(form.amount),
      date: form.date,
      categoryId: form.categoryId,
      icon: form.icon,
    };
    
    await onSaveExpense(payload, !!editData);
    setSubmitting(false);
    
    // Only reset if not in edit mode
    if (!editData) {
      setForm({ 
        name: "", 
        amount: "", 
        date: moment().format("YYYY-MM-DD"), 
        categoryId: "", 
        icon: "💸" 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            {editData ? "Update Expense" : "Add New Expense"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {editData ? "Modify your expense details" : "Track your spending effortlessly"}
          </p>
        </motion.div>

        {/* Emoji Picker & Expense Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <EmojiPickerPopup selectedEmoji={form.icon} onEmojiSelect={handleEmojiSelect} />
          </motion.div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expense Title
            </label>
            <motion.input
              value={form.name}
              onChange={handleChange("name")}
              onFocus={handleFocus("name")}
              onBlur={handleBlur("name")}
              placeholder="e.g., Groceries, Rent, Dinner"
              className={`w-full border-2 rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none ${
                isFocused.name 
                  ? "border-red-500 shadow-lg shadow-red-200" 
                  : "border-gray-200 hover:border-red-300"
              }`}
            />
          </div>
        </motion.div>

        {/* Category Select */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <motion.select
            value={form.categoryId}
            onChange={handleChange("categoryId")}
            onFocus={handleFocus("category")}
            onBlur={handleBlur("category")}
            className={`w-full border-2 rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none ${
              isFocused.category 
                ? "border-red-500 shadow-lg shadow-red-200" 
                : "border-gray-200 hover:border-red-300"
            }`}
            whileFocus={{ scale: 1.02 }}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.categoryName}
              </option>
            ))}
          </motion.select>
        </motion.div>

        {/* Amount & Date Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <motion.div
              className={`relative border-2 rounded-xl transition-all duration-300 ${
                isFocused.amount 
                  ? "border-red-500 shadow-lg shadow-red-200" 
                  : "border-gray-200 hover:border-red-300"
              }`}
              whileFocus={{ scale: 1.02 }}
            >
              <input
                value={form.amount}
                onChange={handleChange("amount")}
                onFocus={handleFocus("amount")}
                onBlur={handleBlur("amount")}
                placeholder="0"
                type="number"
                className="w-full px-4 py-3 rounded-xl focus:outline-none bg-transparent"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: form.amount ? 1 : 0 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 font-semibold"
              >
                ₹
              </motion.div>
            </motion.div>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <motion.input
              value={form.date}
              onChange={handleChange("date")}
              onFocus={handleFocus("date")}
              onBlur={handleBlur("date")}
              type="date"
              className={`w-full border-2 rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none ${
                isFocused.date 
                  ? "border-red-500 shadow-lg shadow-red-200" 
                  : "border-gray-200 hover:border-red-300"
              }`}
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        </motion.div>

        {/* Quick Amount Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {[100, 500, 1000, 2000].map((amount) => (
            <motion.button
              key={amount}
              type="button"
              onClick={() => setForm(s => ({ ...s, amount: amount.toString() }))}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-red-100 text-gray-700 rounded-full transition-colors border border-gray-200"
              whileHover={{ scale: 1.05, backgroundColor: "#FEE2E2" }}
              whileTap={{ scale: 0.95 }}
            >
              ₹{amount.toLocaleString()}
            </motion.button>
          ))}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <motion.button
            type="submit"
            disabled={submitting}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
              submitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            } shadow-lg hover:shadow-xl`}
            whileHover={!submitting ? { scale: 1.02, y: -2 } : {}}
            whileTap={!submitting ? { scale: 0.98 } : {}}
            animate={
              submitting 
                ? { 
                    scale: [1, 1.02, 1],
                    transition: { repeat: Infinity, duration: 1 }
                  } 
                : {}
            }
          >
            <AnimatePresence mode="wait">
              {submitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  {editData ? "Updating..." : "Adding Expense..."}
                </motion.span>
              ) : (
                <motion.span
                  key="normal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {editData ? "✏️" : "💸"}
                  </motion.span>
                  {editData ? "Update Expense" : "Add Expense"}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Expense Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <span>⚠️</span>
            Track every expense to manage your budget better
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default AddExpenseForm;