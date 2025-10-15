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
  useUser()
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

  // Unique Category Loading Animation
  const CategoryLoadingAnimation = () => (
    <DashBoard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating Folder Animation */}
          <div className="relative mb-12">
            <motion.div
              className="relative mx-auto w-40 h-32"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Main Folder */}
              <motion.div
                className="w-40 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-2xl"
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Folder Tab */}
                <div className="absolute -top-3 left-4 w-16 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-lg" />
                
                {/* Folder Lines */}
                <div className="absolute top-8 left-6 w-28 h-1 bg-white/30 rounded" />
                <div className="absolute top-12 left-6 w-24 h-1 bg-white/30 rounded" />
                <div className="absolute top-16 left-6 w-20 h-1 bg-white/30 rounded" />
              </motion.div>

              {/* Floating Icons Around Folder */}
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.2
                }}
              >
                <Layers className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-4"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -15, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <FolderOpen className="w-6 h-6 text-cyan-400 drop-shadow-lg" />
              </motion.div>

              {/* Pulsing Rings */}
              <motion.div
                className="absolute inset-0 rounded-lg border-4 border-purple-300/30"
                animate={{ 
                  scale: [1, 1.3, 1.5],
                  opacity: [0.7, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </motion.div>

            {/* Sparkles Trail */}
            <motion.div
              className="absolute top-0 right-0"
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Organizing Categories
            </h3>
            <p className="text-gray-600 mb-6 text-lg">Loading your financial categories...</p>
            
            {/* Category-themed Loading Dots */}
            <div className="flex justify-center space-x-3 mb-8">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, var(--color-${['purple', 'pink', 'indigo'][index]}-500, var(--color-${['purple', 'pink', 'indigo'][index]}-300))`
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Animated Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/50 rounded-full h-3 shadow-inner overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
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

          {/* Category Card Placeholders */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: item * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-200 to-pink-200"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: item * 0.2 }}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-2 bg-gray-100 rounded-full animate-pulse w-5/6" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashBoard>
  );

  if (loading) return <CategoryLoadingAnimation />;

  return (
    <DashBoard>
      <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-5xl font-bold text-gray-800"
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
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl px-6 py-3 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => setOpenAddCategoryModal(true)}
            >
              <PlusCircle size={20} /> Add Category
            </Button>
          </motion.div>
        </div>

        <CategoryList
          categories={categoryData}
          onEditCategory={handleEdit}
          onDeleteCategory={handleDelete}
        />

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