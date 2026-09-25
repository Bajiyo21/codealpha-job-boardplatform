import { motion } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  Database,
  Smartphone,
  Cpu,
  Globe,
  GitBranch,
  Server,
} from "lucide-react";

const skills = [
  {
    name: "Python",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "React",
    icon: Globe,
    color: "from-sky-400 to-blue-500",
  },
  {
    name: "Django",
    icon: Server,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "AI / Machine Learning",
    icon: BrainCircuit,
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Cloud Computing",
    icon: Cloud,
    color: "from-cyan-500 to-indigo-500",
  },
  {
    name: "Cybersecurity",
    icon: ShieldCheck,
    color: "from-red-500 to-orange-500",
  },
  {
    name: "SQL & PostgreSQL",
    icon: Database,
    color: "from-indigo-500 to-blue-600",
  },
  {
    name: "Flutter",
    icon: Smartphone,
    color: "from-sky-500 to-cyan-400",
  },
  {
    name: "DevOps",
    icon: GitBranch,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Data Science",
    icon: Cpu,
    color: "from-pink-500 to-rose-500",
  },
];

export default function TrendingSkills() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-blue-600 text-sm font-semibold">
            Trending Skills
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-slate-900">
            Skills Companies Are Hiring For
          </h2>

          <p className="text-slate-500 mt-5 max-w-2xl mx-auto">
            Stay ahead by learning the most in-demand technologies across
            software development, AI, cloud computing, cybersecurity, and data engineering.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.04 }}
                className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Gradient Strip */}
                <div
                  className={`h-1 bg-gradient-to-r ${skill.color}`}
                ></div>

                <div className="p-6 flex flex-col items-center text-center">

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="font-semibold text-slate-800 mt-5">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2">
                    High Demand in 2026
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white flex flex-col lg:flex-row justify-between items-center gap-6"
        >
          <div>
            <p className="uppercase tracking-widest text-blue-200 text-sm">
              Career Insight
            </p>

            <h3 className="text-3xl font-bold mt-2">
              Learn In-Demand Skills & Get Hired Faster
            </h3>

            <p className="text-blue-100 mt-3">
              CareerNest highlights technologies that are actively requested by
              employers hiring across India.
            </p>
          </div>

          <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition">
            Explore Jobs
          </button>
        </motion.div>

      </div>
    </section>
  );
}