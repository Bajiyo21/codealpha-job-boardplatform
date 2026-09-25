import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock3, Building2, ChevronRight } from "lucide-react";
import { getJobs } from "../services/jobService";

export default function LatestJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await getJobs();
        let list = [];
        if (Array.isArray(response)) list = response;
        else if (response?.results) list = response.results;
        else if (response?.data?.results) list = response.data.results;
        setJobs(list.slice(0, 5));
      } catch (err) {
        console.error("Failed loading latest jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 w-48 bg-slate-800 animate-pulse rounded mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-900 rounded-2xl animate-pulse"></div>)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-blue-500 uppercase tracking-widest text-xs font-semibold">
              Fresh Postings
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">
              Recently Added Roles
            </h2>
          </div>
          <Link to="/jobs" className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View All Jobs <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <Link
              to={`/jobs/${job.id}`}
              key={job.id}
              className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-200"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-blue-400 overflow-hidden shrink-0">
                  {job.company_logo ? (
                    <img src={job.company_logo} alt={job.company_name} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium">
                    {job.company_name}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-500" />{job.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-slate-500" />{job.experience}</span>
                    <span className="flex items-center gap-1.5"><Clock3 size={14} className="text-slate-500" />Posted {new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  ${Number(job.salary).toLocaleString()} / yr
                </span>
                <button className="bg-blue-600 group-hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition">
                  Apply Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}