import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActivationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 text-center p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="mb-6"
      >
        <CheckCircle className="text-green-600 w-20 h-20" />
      </motion.div>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-gray-800 mb-2"
      >
        🎉 Welcome to <span className="text-green-600">Money Manager!</span>
      </motion.h1>

      <p className="text-gray-600 mb-6 max-w-md">
        Your profile has been successfully activated. <br />
        Start your financial journey today 🚀
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition"
      >
        <Rocket size={18} />
        Start Your Journey
      </motion.button>
    </div>
  );
};

export default ActivationSuccess;
