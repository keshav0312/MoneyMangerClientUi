import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

const CategoryList = ({ categories = [], onEditCategory, onDeleteCategory }) => {
  if (!categories.length)
    return <p className="text-center text-gray-500">No categories yet.</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat, index) => (
        <motion.div
          key={cat.id || index}
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center justify-between border border-gray-100 hover:-translate-y-1"
        >
          <div className="text-4xl mb-2 drop-shadow-sm">{cat.icon || "💰"}</div>
          <h3 className="text-lg font-semibold text-gray-800">{cat.categoryName}</h3>
          <p
            className={`text-sm font-medium ${
              cat.type === "income" ? "text-green-600" : "text-red-500"
            }`}
          >
       
            {cat.type?.toUpperCase()}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => onEditCategory(cat)}
              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDeleteCategory(cat.id)}
              className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryList;
