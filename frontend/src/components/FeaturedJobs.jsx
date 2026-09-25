import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, MapPin, Briefcase, Clock3, Sparkles, Building2, CheckCircle } from "lucide-react";
import { getJobs, toggleSaveJob } from "../services/jobService";
import { toast } from "react-hot-toast";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await getJobs({ is_featured: true });
        let list = [];
        if (Array.isArray(response)) {
          list = response;
        } else if (response?.results) {
          list = response.results;
        } else if (response?.data?.results) {
          list = response.data.results;
        } else if (response?.data) {
          list = Array.isArray(response.data) ? response.data : [];
        }
        setJobs(list.slice(0, 4));
      } catch (error) {
        console.error("Error loading featured jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  const handleSaveToggle = async (e, jobId) => {
    e.preventDefault();
    try {
      const res = await toggleSaveJob(jobId);
      toast.success(res.message || "Saved job updated");
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, is_saved: !j.is_saved } : j));
    } catch (err) {
      toast.error(err.response?.data?.detail || "Please log in to save jobs.");
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 w-48 bg-slate-800 rounded animate-pulse mb-8"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 bg-slate-800/60 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="jobs" className="py-24 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Featured Opportunities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              Top Tier Startup Jobs
            </h2>
          </div>
          <Link to="/jobs" className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center gap-1">
            Browse All Jobs &rarr;
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <Link
              to={`/jobs/${job.id}`}
              key={job.id}
              className="group bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-700/80 border border-slate-600/50 flex items-center justify-center font-bold text-xl text-blue-400 overflow-hidden">
                      {job.company_logo ? (
                        <img src={job.company_logo} alt={job.company_name} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="w-7 h-7 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                        <span>{job.company_name}</span>
                        {job.company_is_verified && (
                          <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleSaveToggle(e, job.id)}
                    className={`p-2.5 rounded-xl border transition ${
                      job.is_saved
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-slate-700/50 text-slate-400 border-slate-600/50 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-6">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {job.job_type?.replace("_", " ")}
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                    ${Number(job.salary).toLocaleString()} / yr
                  </span>
                  <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {job.work_mode}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500" />{job.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-slate-500" />{job.experience}</span>
                </div>
                <span className="flex items-center gap-1.5 text-slate-400"><Clock3 className="w-3.5 h-3.5 text-slate-500" />Deadline: {job.deadline}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}