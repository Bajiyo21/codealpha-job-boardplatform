import { Briefcase, Building2, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Briefcase,
    value: "15K+",
    label: "Active Jobs",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Building2,
    value: "500+",
    label: "Verified Companies",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Users,
    value: "25K+",
    label: "Registered Candidates",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Trophy,
    value: "98%",
    label: "Successful Placements",
    color: "bg-amber-100 text-amber-600",
  },
];

export default function Stats() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-blue-400 uppercase tracking-widest text-sm font-semibold">
            Our Impact
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Helping People Build Better Careers
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-slate-800 p-7 border border-slate-700 hover:border-blue-500 transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={26} />
                </div>

                <h3 className="text-4xl font-bold mt-6">{item.value}</h3>

                <p className="text-slate-400 mt-2">{item.label}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}