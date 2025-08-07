import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserPlus, FaHome, FaRegStickyNote } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${url}/api/user/register`, formData);
      alert(response.data.message || "Registration successful");
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-400 to-orange-500 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/90 to-orange-500/90"></div>
        
        <div className="z-10 max-w-md text-center">
          <FaRegStickyNote className="text-white text-6xl mb-6 mx-auto" />
          <h1 className="text-4xl font-bold text-white mb-6">NotesKeeper</h1>
          <p className="text-xl text-white/90 mb-8">
            Your thoughts, organized. Capture ideas, make lists, and stay organized with our simple note-taking app.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-2">Effortless Organization</h3>
              <p className="text-white/80 text-sm">Organize your thoughts with simple, effective tools</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-2">Access Anywhere</h3>
              <p className="text-white/80 text-sm">Your notes sync across all your devices</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-2">Rich Formatting</h3>
              <p className="text-white/80 text-sm">Style your notes just the way you want</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-2">Secure Storage</h3>
              <p className="text-white/80 text-sm">Your notes are encrypted and protected</p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full"></div>
        <div className="absolute top-20 -left-12 w-40 h-40 bg-white/10 rounded-full"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Home Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-8 transition-colors"
          >
            <FaHome />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create your account</h2>
            <p className="text-gray-600">Join NotesKeeper and start organizing your thoughts today.</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.username}
                required
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  value={formData.password}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the <a href="#" className="text-amber-600 hover:text-amber-700">Terms of Service</a> and <a href="#" className="text-amber-600 hover:text-amber-700">Privacy Policy</a>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm disabled:bg-amber-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
