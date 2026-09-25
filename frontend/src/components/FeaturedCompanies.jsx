import {
  ArrowUpRight,
  BadgeCheck,
  MapPin,
  Users,
  Star,
} from "lucide-react";

const companies = [
  {
    name: "Google India",
    location: "Bengaluru, Karnataka",
    jobs: 42,
    employees: "12,000+",
    rating: "4.9",
    logo: "https://www.google.com/favicon.ico",
    color: "bg-red-50",
  },
  {
    name: "Microsoft India",
    location: "Hyderabad, Telangana",
    jobs: 35,
    employees: "18,000+",
    rating: "4.8",
    logo: "https://www.microsoft.com/favicon.ico",
    color: "bg-blue-50",
  },
  {
    name: "Amazon India",
    location: "Chennai, Tamil Nadu",
    jobs: 28,
    employees: "25,000+",
    rating: "4.7",
    logo: "https://www.amazon.com/favicon.ico",
    color: "bg-orange-50",
  },
  {
    name: "Infosys",
    location: "Thiruvananthapuram, Kerala",
    jobs: 18,
    employees: "15,000+",
    rating: "4.6",
    logo: "https://www.infosys.com/favicon.ico",
    color: "bg-indigo-50",
  },
];

export default function FeaturedCompanies() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-blue-600 text-sm font-semibold">
            Featured Companies
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-slate-900">
            Trusted Companies Hiring on CareerNest
          </h2>

          <p className="text-slate-500 mt-5 max-w-2xl mx-auto">
            Explore verified companies actively recruiting software engineers,
            AI engineers, cloud engineers, designers, and fresh graduates.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {companies.map((company) => (
            <div
              key={company.name}
              className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              {/* Logo */}
              <div
                className={`w-16 h-16 rounded-2xl ${company.color} border flex items-center justify-center`}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Company */}
              <div className="mt-5">
                <h3 className="font-bold text-xl text-slate-900">
                  {company.name}
                </h3>

                <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                  <MapPin size={15} />
                  {company.location}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between mt-5">

                <div className="flex items-center gap-1 text-amber-500">
                  <Star fill="currentColor" size={18} />
                  <span className="font-semibold text-slate-700">
                    {company.rating}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-600 text-sm">
                  <BadgeCheck size={16} />
                  Verified
                </div>

              </div>

              {/* Employees */}
              <div className="flex items-center gap-2 mt-4 text-slate-500 text-sm">
                <Users size={16} />
                {company.employees} Employees
              </div>

              {/* Hiring Badge */}
              <div className="mt-6 flex items-center justify-between">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {company.jobs} Open Jobs
                </span>

                <ArrowUpRight className="group-hover:text-blue-600 transition" />

              </div>

              {/* Button */}
              <button className="mt-7 w-full rounded-xl bg-slate-900 text-white py-3 hover:bg-blue-600 transition">
                View Company
              </button>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}