import React, { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import moment from "moment";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const AddIncomeForm = ({ onAddIncome, categories = [] }) => {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: moment().format("YYYY-MM-DD"),
    categoryId: "",
    icon: "💰",
  });
  const [submitting, setSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState({});

  const handleChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const handleEmojiSelect = (emoji) => {
    setForm((s) => ({ ...s, icon: emoji }));
  };

  const handleFocus = (field) => () => setIsFocused((s) => ({ ...s, [field]: true }));
  const handleBlur = (field) => () => setIsFocused((s) => ({ ...s, [field]: false }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.date || !form.categoryId) {
      return toast.error("Please fill all fields");
    }
    setSubmitting(true);
    const payload = {
      name: form.name,
      amount: Number(form.amount),
      date: form.date,
      categoryId: form.categoryId,
      icon: form.icon,
    };
    await onAddIncome(payload);
    setSubmitting(false);
    setForm({ 
      name: "", 
      amount: "", 
      date: moment().format("YYYY-MM-DD"), 
      categoryId: "", 
      icon: "💰" 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.form
        onSubmit={submit}
        className="space-y-6"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Emoji Picker & Income Source */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <EmojiPickerPopup selectedEmoji={form.icon} onEmojiSelect={handleEmojiSelect} />
          </motion.div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income Source
            </label>
            <motion.input
              value={form.name}
              onChange={handleChange("name")}
              onFocus={handleFocus("name")}
              onBlur={handleBlur("name")}
              placeholder="e.g., Salary, Freelance, Bonus"
              className={`w-full border-2 rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none ${
                isFocused.name 
                  ? "border-purple-500 shadow-lg shadow-purple-200" 
                  : "border-gray-200 hover:border-purple-300"
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
                ? "border-purple-500 shadow-lg shadow-purple-200" 
                : "border-gray-200 hover:border-purple-300"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <motion.div
              className={`relative border-2 rounded-xl transition-all duration-300 ${
                isFocused.amount 
                  ? "border-purple-500 shadow-lg shadow-purple-200" 
                  : "border-gray-200 hover:border-purple-300"
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 font-semibold"
              >
                ₹
              </motion.div>
            </motion.div>
          </div>

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
                  ? "border-purple-500 shadow-lg shadow-purple-200" 
                  : "border-gray-200 hover:border-purple-300"
              }`}
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <motion.button
            type="submit"
            disabled={submitting}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
              submitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
                  Adding Income...
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
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💰
                  </motion.span>
                  Add Income
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Quick Amount Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {[1000, 5000, 10000, 25000].map((amount) => (
            <motion.button
              key={amount}
              type="button"
              onClick={() => setForm(s => ({ ...s, amount: amount.toString() }))}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-purple-100 text-gray-700 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ₹{amount.toLocaleString()}
            </motion.button>
          ))}
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default AddIncomeForm;