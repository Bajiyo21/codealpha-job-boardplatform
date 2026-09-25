import {
  BrainCircuit,
  Code2,
  Cloud,
  ShieldCheck,
  Database,
  Smartphone,
} from "lucide-react";

const categories = [
  {
    title: "AI & Machine Learning",
    jobs: "1,250 Jobs",
    icon: BrainCircuit,
  },
  {
    title: "Web Development",
    jobs: "2,100 Jobs",
    icon: Code2,
  },
  {
    title: "Cloud Computing",
    jobs: "850 Jobs",
    icon: Cloud,
  },
  {
    title: "Cyber Security",
    jobs: "620 Jobs",
    icon: ShieldCheck,
  },
  {
    title: "Data Science",
    jobs: "980 Jobs",
    icon: Database,
  },
  {
    title: "Mobile Development",
    jobs: "740 Jobs",
    icon: Smartphone,
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-blue-600 font-semibold">Categories</p>

          <h2 className="text-4xl font-bold text-slate-900 mt-2">
            Explore Opportunities by Skill
          </h2>

          <p className="text-slate-600 mt-4">
            Discover jobs across the fastest-growing technology domains.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center">
                  <Icon className="text-blue-600" size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {category.title}
                </h3>

                <p className="mt-2 text-slate-500">{category.jobs}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
