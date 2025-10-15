import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import bgImage from "../assets/bg.jpg";
import toast from "react-hot-toast";
import AxiosConfig from "../util/AxiosConfig";
import { ApiEndpoints } from "../util/ApiEndpoints";
import { Loader } from "lucide-react";
import { uploadImage } from "../util/UploadImage";
import ProfilePhotoSelector from "../components/ProfileSelector";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    // Validation
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (profileImage) {
        const uploadedImage = await uploadImage(profileImage);
        profileImageUrl = uploadedImage.secure_url || uploadedImage;
      }

      const data = await AxiosConfig.post(ApiEndpoints.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      if (data.status === 200) {
        toast.success(
          "Registration successful! Please check your email to activate your account."
        );
      }

      setFullName("");
      setEmail("");
      setPassword("");
      setProfileImage(null);
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="background"
          className="w-full h-full object-cover opacity-40 blur-sm"
        />
      </div>

      {/* Animated circles */}
      <div className="absolute top-10 left-10 w-24 sm:w-36 h-24 sm:h-36 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-28 sm:w-40 h-28 sm:h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-bounce"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md sm:max-w-xl mx-4 sm:mx-6 md:mx-auto">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl px-6 sm:px-10 py-10 sm:py-12 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-indigo-400/50">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 tracking-wide">
              Create an Account 🎉
            </h1>
            <p className="text-gray-700 text-base sm:text-lg">
              Join{" "}
              <span className="font-semibold text-indigo-600">
                Money Manager
              </span>{" "}
              and track your spending effortlessly.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
            <div className="flex justify-center">
              <ProfilePhotoSelector image={profileImage} setImage={setProfileImage} />
            </div>

            <InputComponent
              label="Full Name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <InputComponent
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 text-sm sm:text-base rounded-lg p-3 text-center font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
                loading
                  ? "cursor-not-allowed opacity-70"
                  : "hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-1"
              }`}
            >
              {loading ? (
                <Loader className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white" />
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="text-center mt-5">
              <p className="text-gray-700 text-sm sm:text-base">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-700 font-semibold hover:underline hover:text-indigo-900 transition-all"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
