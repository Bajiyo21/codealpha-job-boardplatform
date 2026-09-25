import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getJobs, toggleSaveJob } from "../services/jobService";
import {
  Search,
  MapPin,
  Briefcase,
  Clock3,
  Building2,
  Filter,
  Bookmark,
  Sparkles,
  CheckCircle,
  DollarSign,
  ChevronRight
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [minSalary, setMinSalary] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (jobType) params.job_type = jobType;
      if (workMode) params.work_mode = workMode;
      if (minSalary) params.min_salary = minSalary;

      const response = await getJobs(params);
      let list = [];
      if (Array.isArray(response)) list = response;
      else if (response?.results) list = response.results;
      else if (response?.data?.results) list = response.data.results;
      setJobs(list);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [jobType, workMode]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleSaveToggle = async (e, jobId) => {
    e.preventDefault();
    try {
      const res = await toggleSaveJob(jobId);
      toast.success(res.message || "Job bookmark updated");
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, is_saved: !j.is_saved } : j));
    } catch (err) {
      toast.error(err.response?.data?.detail || "Please sign in to save jobs.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-950 border-b border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> 1,000+ Startup & Enterprise Roles
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Discover Your Next High-Impact Role
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base">
            Explore verified software engineering, AI, product, design, and remote roles from top startups.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto mt-8 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 gap-3">
              <Search className="text-slate-400 w-5 h-5 shrink-0" />
              <input
                type="text"
                placeholder="Job title, skills, or company name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 outline-none text-sm py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold text-sm transition shadow-lg shadow-blue-600/30"
            >
              Search Jobs
            </button>
          </form>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Filters Sidebar */}
        <aside className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 h-fit sticky top-24 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 font-bold text-white text-lg">
              <Filter className="w-5 h-5 text-blue-400" />
              <span>Filters</span>
            </div>
            <button
              onClick={() => { setSearch(""); setJobType(""); setWorkMode(""); setMinSalary(""); }}
              className="text-xs text-blue-400 hover:underline"
            >
              Reset
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-blue-500"
            >
              <option value="">All Job Types</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Work Mode</label>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-blue-500"
            >
              <option value="">All Modes</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Min Salary ($ / yr)</label>
            <input
              type="number"
              placeholder="e.g. 100000"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              onBlur={fetchJobs}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
        </aside>

        {/* Jobs List */}
        <main>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {jobs.length} Job Openings
            </h2>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-44 bg-slate-900 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">
              <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white">No Jobs Found</h3>
              <p className="text-slate-400 text-sm mt-2">Try clearing filters or searching for different keywords.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-7 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xl text-blue-400 overflow-hidden shrink-0">
                        {job.company_logo ? (
                          <img src={job.company_logo} alt={job.company_name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-7 h-7 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <Link to={`/jobs/${job.id}`} className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </Link>
                        <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                          <span>{job.company_name}</span>
                          {job.company_is_verified && (
                            <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2.5 mt-4 text-xs">
                          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full font-semibold capitalize">
                            {job.job_type?.replace("_", " ")}
                          </span>
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-semibold">
                            ${Number(job.salary).toLocaleString()} / yr
                          </span>
                          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full font-semibold capitalize">
                            {job.work_mode}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleSaveToggle(e, job.id)}
                      className={`p-2.5 rounded-xl border transition ${
                        job.is_saved
                          ? "bg-blue-600 text-white border-blue-500"
                          : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="mt-5 text-slate-400 text-sm line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500" />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-slate-500" />{job.experience}</span>
                      <span className="flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5 text-slate-500" />Deadline: {job.deadline}</span>
                    </div>

                    <Link
                      to={`/jobs/${job.id}`}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition flex items-center gap-1.5"
                    >
                      View Details & Apply <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}