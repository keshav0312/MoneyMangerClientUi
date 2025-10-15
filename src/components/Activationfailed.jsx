import React from "react";
import { XCircle } from "lucide-react";

const ActivationFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-rose-100 text-center p-6">
      <XCircle className="text-red-600 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Activation Failed ❌</h1>
      <p className="text-gray-600 mb-6">
        Oops! Something went wrong. Please check your activation link or contact support.
      </p>
      <a
        href="/register"
        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
      >
        Try Again
      </a>
    </div>
  );
};

export default ActivationFailed;
