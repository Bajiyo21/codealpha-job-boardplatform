import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  className = "",
}) {
  const base =
    "px-6 py-3 rounded-2xl font-medium transition-all duration-300";

  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-200",

    secondary:
      "border border-slate-300 text-slate-700 hover:bg-slate-100",

    ghost:
      "text-blue-600 hover:bg-blue-50",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}