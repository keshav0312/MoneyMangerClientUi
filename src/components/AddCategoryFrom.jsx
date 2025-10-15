import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { motion } from "framer-motion";
import {Button } from "./Button";
import AxiosConfig from "../util/AxiosConfig";
import {ApiEndpoints} from "../util/ApiEndpoints";
import { button } from "framer-motion/client";


const AddCategoryForm = ({ mode = "add", existingCategory = {}, onSuccess }) => {
  const [category, setCategory] = useState({
    categoryName: "",
    type: "INCOME",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "update" && existingCategory) {
      setCategory({
        name: existingCategory.categoryName || "",
        type: existingCategory.type || "INCOME",
        icon: existingCategory.icon || "",
      });
    }
  }, [mode, existingCategory]);

  const categoryOptions = [
    { label: "Income", value: "INCOME" },
    { label: "Expense", value: "EXPENSE" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "add") {
        await AxiosConfig.post(ApiEndpoints.ADD_CATEGORY, category);
      } else {
        await AxiosConfig.put(
          ApiEndpoints.UPDATE_CATEGORY(existingCategory.id),
          category
        );
      }
      onSuccess();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-center mb-4">
        <EmojiPickerPopup
          selectedEmoji={category.icon}
          onEmojiSelect={(emoji) =>
            setCategory((prev) => ({ ...prev, icon: emoji }))
          }
        />
      </div>

      <input
        type="text"
        value={category.categoryName}
        onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
        placeholder="e.g. Freelance, Salary, Groceries"
        required
        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none shadow-sm transition-all"
      />

      <select
        value={category.type}
        onChange={(e) => setCategory({ ...category, type: e.target.value })}
        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-purple-400 shadow-sm"
      >
        {categoryOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <Button
        disabled={loading}
        className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-2 transition-transform hover:scale-105"
      >
        {loading
          ? mode === "add"
            ? "Adding..."
            : "Updating..."
          : mode === "add"
          ? "Add Category"
          : "Update Category"}
      </Button>
    </motion.form>
  );
};

export default AddCategoryForm;
