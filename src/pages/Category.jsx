import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import toast from "react-hot-toast";
import { PlusCircle, FolderOpen, Layers, Sparkles } from "lucide-react";
import CategoryList from "../components/CategoryList";
import Model from "../components/Model";
import AddCategoryForm from "../components/AddCategoryFrom";
import AxiosConfig from "../util/AxiosConfig";
import { ApiEndpoints } from "../util/ApiEndpoints";
import DashBoard from "../components/DashBoard";
import useUser from "../Hooks/useUser";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openUpdateCategoryModal, setOpenUpdateCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await AxiosConfig.get(ApiEndpoints.GET_ALL_CATEGORY);
      setCategoryData(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await AxiosConfig.delete(ApiEndpoints.DELETE_CATEGORY(categoryId));
      fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenUpdateCategoryModal(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // -------------------------------
  // Beautiful Loading Animation
  // -------------------------------
  const CategoryLoadingAnimation = () => (
    <DashBoard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col items-center justify-center px-4 sm:px-8">
        <motion.div
          className="text-center w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-8 sm:mb-12">
            <motion.div
              className="relative mx-auto w-32 sm:w-40 h-24 sm:h-32"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-2xl"
                animate={{ rotateY: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute -top-3 left-4 w-16 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-lg" />
              </motion.div>
            </motion.div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Organizing Categories
          </h3>
          <p className="text-gray-600 text-base sm:text-lg mb-6">
            Loading your financial categories...
          </p>

          <div className="flex justify-center gap-2 sm:gap-3 mb-6">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                animate={{ scale: [1, 1.5, 1], y: [0, -8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.3 }}
              />
            ))}
          </div>

          <div className="max-w-md mx-auto w-full px-4">
            <div className="bg-white/50 rounded-full h-2 sm:h-3 shadow-inner overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Loading...</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Almost there
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashBoard>
  );

  if (loading) return <CategoryLoadingAnimation />;

  // -------------------------------
  // Main Page
  // -------------------------------
  return (
    <DashBoard>
      <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 sm:px-6 md:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center sm:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            All Categories
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => setOpenAddCategoryModal(true)}
            >
              <PlusCircle size={18} /> Add Category
            </Button>
          </motion.div>
        </div>

        {/* Category List */}
        <div className="w-full">
          <CategoryList
            categories={categoryData}
            onEditCategory={handleEdit}
            onDeleteCategory={handleDelete}
          />
        </div>

        {/* Add Category Modal */}
        <Model
          title="Add Category"
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
        >
          <AddCategoryForm
            onSuccess={() => {
              setOpenAddCategoryModal(false);
              fetchCategories();
            }}
            mode="add"
          />
        </Model>

        {/* Update Category Modal */}
        <Model
          title="Update Category"
          isOpen={openUpdateCategoryModal}
          onClose={() => setOpenUpdateCategoryModal(false)}
        >
          <AddCategoryForm
            mode="update"
            existingCategory={selectedCategory}
            onSuccess={() => {
              setOpenUpdateCategoryModal(false);
              fetchCategories();
            }}
          />
        </Model>
      </div>
    </DashBoard>
  );
};

export default Category;
