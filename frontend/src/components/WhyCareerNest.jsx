import { BrainCircuit, ShieldCheck, Rocket } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Smart Job Matching",
    description:
      "CareerNest recommends opportunities based on skills, experience and interests.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Companies",
    description:
      "Every employer profile is verified before jobs are published on the platform.",
  },
  {
    icon: Rocket,
    title: "Track Applications",
    description:
      "Monitor every application from submission to interview and hiring status.",
  },
];

export default function WhyCareerNest() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Why CareerNest
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-3">
            Designed for Students and Recruiters
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            A complete hiring platform where candidates discover jobs and employers
            manage hiring from one dashboard.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-xl hover:border-blue-500 transition-all"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Icon className="text-blue-600" size={30} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}