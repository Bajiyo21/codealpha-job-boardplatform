const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Infosys",
  "TCS",
  "IBM",
  "Adobe",
  "Accenture",
];

export default function TrustedCompanies() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm uppercase tracking-widest text-slate-500 font-semibold">
          Trusted by Leading Companies
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
          {companies.map((company) => (
            <div
              key={company}
              className="h-16 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center font-semibold text-slate-500 hover:text-blue-600 hover:border-blue-300 transition"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}