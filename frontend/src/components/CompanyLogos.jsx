import { motion } from "framer-motion";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Infosys",
  "TCS",
  "Accenture",
  "IBM",
  "Oracle",
];

export default function CompanyLogos() {
  return (
    <section className="py-10 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-500 text-sm uppercase tracking-[0.25em] mb-8">
          Trusted by Leading Companies
        </p>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm min-w-[160px] text-center"
            >
              <h3 className="font-semibold text-slate-700">{company}</h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}