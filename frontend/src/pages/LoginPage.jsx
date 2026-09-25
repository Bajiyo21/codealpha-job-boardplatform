import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Login user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await login(
        formData.email,
        formData.password
      );

      toast.success("Login successful!");

      // Redirect based on role
      if (loggedInUser.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/candidate/dashboard");
      }
    } catch (error) {
      console.error(error.response?.data);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white items-center justify-center p-12">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-md"
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome to
            <span className="block text-cyan-300">CareerNest</span>
          </h1>

          <p className="mt-6 text-blue-100 text-lg leading-8">
            India's modern job platform connecting talented candidates with
            verified employers across software, AI, cloud computing,
            cybersecurity, and internships.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <p className="text-blue-200 text-sm">Active Jobs</p>
              <h3 className="text-3xl font-bold">15,000+</h3>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <p className="text-blue-200 text-sm">Verified Companies</p>
              <h3 className="text-3xl font-bold">500+</h3>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <p className="text-blue-200 text-sm">Registered Candidates</p>
              <h3 className="text-3xl font-bold">25,000+</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Login Card */}
      <div className="flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-8"
        >
          <Link to="/" className="inline-block mb-8 text-2xl font-bold text-slate-900">
            Career<span className="text-blue-600">Nest</span>
          </Link>

          <h2 className="text-3xl font-bold text-slate-900">
            Sign In
          </h2>

          <p className="text-slate-500 mt-2">
            Continue your career journey.
          </p>

          {/* Candidate / Employer Toggle */}
          <div className="mt-8 grid grid-cols-2 bg-slate-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`rounded-lg py-3 font-medium transition ${
                role === "candidate"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600"
              }`}
            >
              <User size={18} className="inline mr-2" />
              Candidate
            </button>

            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`rounded-lg py-3 font-medium transition ${
                role === "employer"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600"
              }`}
            >
              <Briefcase size={18} className="inline mr-2" />
              Employer
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:border-blue-600 transition">
                <Mail size={18} className="text-slate-400 mr-3" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:border-blue-600 transition">
                <Lock size={18} className="text-slate-400 mr-3" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
            >
              Sign In
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="text-center text-slate-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}