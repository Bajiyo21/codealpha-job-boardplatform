import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Akhil Nair",
    role: "Software Engineer",
    company: "Google",
    text: "CareerNest helped me find my first backend role within two weeks.",
  },
  {
    name: "Fathima",
    role: "AI Engineer",
    company: "Infosys",
    text: "The application tracker and verified companies made job hunting much easier.",
  },
  {
    name: "Rahul S",
    role: "Cloud Engineer",
    company: "IBM",
    text: "A clean platform with everything I needed in one dashboard.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            Success Stories
          </p>

          <h2 className="text-4xl font-bold mt-3 text-slate-900">
            What Our Candidates Say
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-xl transition"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-slate-600 leading-7 italic">
                “{item.text}”
              </p>

              <div className="mt-8">
                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                <p className="text-sm text-slate-500">
                  {item.role} · {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}