import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Update input values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Register user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: role,
        password: formData.password,
      });

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);

      if (error.response?.data?.email) {
        toast.error(error.response.data.email[0]);
      } else {
        toast.error("Registration failed.");
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      {/* LEFT PANEL */}
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
            Build Your
            <span className="block text-cyan-300">Future Career</span>
          </h1>

          <p className="mt-6 text-blue-100 text-lg leading-8">
            Join CareerNest and connect with verified employers, internships,
            software engineering jobs, AI careers, and cloud opportunities.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "15,000+ Active Jobs",
              "500+ Verified Companies",
              "25,000+ Registered Candidates",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10"
              >
                <CheckCircle className="text-cyan-300" size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-8"
        >
          <Link to="/" className="inline-block mb-6 text-2xl font-bold">
            Career<span className="text-blue-600">Nest</span>
          </Link>

          <h2 className="text-3xl font-bold text-slate-900">
            Create Account
          </h2>

          <p className="text-slate-500 mt-2">
            Start your career journey today.
          </p>

          {/* Role Toggle */}
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

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Name */}
            <InputField
              icon={<User size={18} />}
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* Email */}
            <InputField
              icon={<Mail size={18} />}
              placeholder="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Phone */}
            <InputField
              icon={<Phone size={18} />}
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            {/* Password */}
            <PasswordField
              placeholder="Create Password"
              visible={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Confirm Password */}
            <PasswordField
              placeholder="Confirm Password"
              visible={showConfirm}
              toggle={() => setShowConfirm(!showConfirm)}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input type="checkbox" required className="mt-1" />
              <span>
                I agree to CareerNest's Terms & Conditions and Privacy Policy.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-slate-500 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ---------- Reusable Input ----------
function InputField({ icon, type = "text", ...props }) {
  return (
    <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-blue-600 transition">
      <div className="text-slate-400 mr-3">{icon}</div>

      <input
        type={type}
        className="w-full outline-none"
        {...props}
      />
    </div>
  );
}

// ---------- Password Field ----------
function PasswordField({
  placeholder,
  visible,
  toggle,
  name,
  value,
  onChange,
}) {
  return (
    <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-blue-600 transition">
      <Lock size={18} className="text-slate-400 mr-3" />

      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className="w-full outline-none"
        name={name}
        value={value}
        onChange={onChange}
      />

      <button
        type="button"
        onClick={toggle}
        className="text-slate-400"
      >
        {visible ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}