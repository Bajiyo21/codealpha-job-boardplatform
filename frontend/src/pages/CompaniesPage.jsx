import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCompanies } from "../services/companyService";
import { Search, MapPin, Briefcase, CheckCircle, ArrowUpRight, Building2, Sparkles } from "lucide-react";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadCompanies() {
      try {
        const response = await getCompanies(search ? { search } : {});
        let list = [];
        if (Array.isArray(response)) list = response;
        else if (response?.results) list = response.results;
        else if (response?.data?.results) list = response.data.results;
        setCompanies(list);
      } catch (err) {
        console.error("Failed loading companies:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCompanies();
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950/30 to-slate-950 border-b border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Verified Hiring Partners
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Discover Top Tech Companies & Startups
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base">
            Explore culture, tech stacks, and active job openings at verified tech companies.
          </p>

          <div className="max-w-2xl mx-auto mt-8 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl flex items-center px-4">
            <Search className="text-slate-400 w-5 h-5 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search by company name, industry, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-500 outline-none text-sm py-2"
            />
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <h2 className="text-xl font-bold text-white mb-6">
          {companies.length} Verified Hiring Companies
        </h2>

        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-slate-900 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">No Companies Found</h3>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-3xl p-7 transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl font-bold text-blue-400 overflow-hidden">
                      {company.logo_url ? (
                        <img src={company.logo_url} alt={company.company_name} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="w-8 h-8 text-blue-400" />
                      )}
                    </div>
                    {company.is_verified && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mt-5 text-white">{company.company_name}</h3>
                  <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mt-1">{company.industry}</p>

                  <div className="flex items-center gap-2 text-slate-400 text-xs mt-3">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>{company.location}</span>
                  </div>

                  <p className="text-slate-400 mt-4 text-xs line-clamp-3 leading-relaxed">
                    {company.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> {company.active_jobs_count || 0} Open Roles
                  </span>

                  <Link
                    to={`/jobs?search=${encodeURIComponent(company.company_name)}`}
                    className="flex items-center gap-1 text-blue-400 font-bold hover:text-blue-300 transition"
                  >
                    View Roles <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}