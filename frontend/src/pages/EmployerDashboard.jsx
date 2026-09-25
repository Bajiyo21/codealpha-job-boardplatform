import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getEmployerStats, deleteJob, getMyJobs } from "../services/jobService";
import { getAllApplicants, updateApplicantStatus } from "../services/applicationService";
import { getMyCompany } from "../services/companyService";
import {
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  PlusCircle,
  Eye,
  MapPin,
  Trash2,
  Edit,
  CheckCircle,
  Clock3,
  FileText,
  Calendar,
  X,
  Sparkles
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function EmployerDashboard() {
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  // Applicant View Modal
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadEmployerDashboard();
  }, []);

  const loadEmployerDashboard = async () => {
    try {
      const [statsRes, jobsRes, appsRes, compRes] = await Promise.allSettled([
        getEmployerStats(),
        getMyJobs(),
        getAllApplicants(),
        getMyCompany()
      ]);

      if (statsRes.status === "fulfilled") setStats(statsRes.value?.data || statsRes.value);
      if (jobsRes.status === "fulfilled") {
        const list = Array.isArray(jobsRes.value) ? jobsRes.value : (jobsRes.value?.results || []);
        setJobs(list);
      }
      if (appsRes.status === "fulfilled") {
        const list = Array.isArray(appsRes.value) ? appsRes.value : (appsRes.value?.results || []);
        setApplicants(list);
      }
      if (compRes.status === "fulfilled") {
        setCompany(compRes.value?.data || compRes.value);
      }
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await deleteJob(jobId);
      toast.success("Job deleted successfully");
      setJobs(prev => prev.filter(j => j.id !== jobId));
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedApplicant) return;
    setUpdating(true);
    try {
      const payload = { status: statusUpdate };
      if (statusUpdate === "interview" && interviewDate) {
        payload.interview_date = new Date(interviewDate).toISOString();
      }

      await updateApplicantStatus(selectedApplicant.id, payload);
      toast.success("Applicant status updated!");
      setSelectedApplicant(null);
      loadEmployerDashboard();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 flex-1 w-full space-y-6 animate-pulse">
          <div className="h-32 bg-slate-900 rounded-3xl"></div>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-slate-900 rounded-3xl"></div>)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const statistics = stats?.statistics || {
    total_jobs: jobs.length,
    active_jobs: jobs.filter(j => j.status === "published").length,
    total_applications: applicants.length,
    shortlisted: applicants.filter(a => a.status === "shortlisted").length
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 border border-blue-500/20 rounded-3xl p-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center font-bold text-2xl text-blue-400 overflow-hidden shrink-0">
              {company?.logo_url ? (
                <img src={company.logo_url} alt="Company Logo" className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-9 h-9 text-blue-300" />
              )}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {company?.company_name || "Employer Dashboard"}
              </h1>
              <p className="text-slate-300 text-xs mt-1">
                Manage job postings, applicant pipelines, and candidate match scores.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link to="/employer/company" className="flex-1 sm:flex-none">
              <button className="w-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-xl font-semibold text-xs transition">
                Company Profile
              </button>
            </Link>
            <Link to="/jobs/create" className="flex-1 sm:flex-none">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5">
                <PlusCircle className="w-4 h-4" /> Post New Job
              </button>
            </Link>
          </div>
        </div>

        {/* Statistics Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Jobs Posted" value={statistics.total_jobs} icon={<Briefcase className="text-blue-400" />} />
          <StatCard title="Active Listings" value={statistics.active_jobs} icon={<CheckCircle className="text-emerald-400" />} />
          <StatCard title="Total Applications" value={statistics.total_applications} icon={<Users className="text-purple-400" />} />
          <StatCard title="Shortlisted Talent" value={statistics.shortlisted} icon={<TrendingUp className="text-amber-400" />} />
        </div>

        {/* Applicants Pipeline & Job Management Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Applicants Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="font-bold text-lg text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" /> Candidate Applications Pipeline ({applicants.length})
                </h2>
              </div>

              {applicants.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Users className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                  <p className="font-semibold text-slate-300">No candidate applications received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applicants.map((app) => (
                    <div
                      key={app.id}
                      className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-base text-white">{app.candidate_name}</h4>
                          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> {app.candidate_match_score}% AI Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Applied for <span className="text-blue-400 font-semibold">{app.job_title}</span> &bull; {new Date(app.applied_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="capitalize text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {app.status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedApplicant(app);
                            setStatusUpdate(app.status);
                          }}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
                        >
                          Review & Evaluate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Job Postings Column */}
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-bold text-white text-base">Your Active Jobs ({jobs.length})</h3>
                <Link to="/jobs/create" className="text-xs text-blue-400 font-semibold hover:underline">+ New Job</Link>
              </div>

              {jobs.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No jobs posted yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {jobs.map((j) => (
                    <div key={j.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/jobs/${j.id}`} className="font-bold text-sm text-white hover:text-blue-400 transition block">
                            {j.title}
                          </Link>
                          <span className="text-[11px] text-slate-400 block mt-0.5">{j.location} &bull; ${Number(j.salary).toLocaleString()}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${j.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                          {j.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-400">{j.applications_count || 0} Applicants</span>
                        <div className="flex items-center gap-2">
                          <Link to={`/jobs/edit/${j.id}`} className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button onClick={() => handleDeleteJob(j.id)} className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-950/40">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Candidate Evaluation Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button onClick={() => setSelectedApplicant(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-xl text-blue-400">
                {selectedApplicant.candidate_name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedApplicant.candidate_name}</h3>
                <p className="text-xs text-slate-400">{selectedApplicant.candidate_email} &bull; {selectedApplicant.candidate_phone || "No phone"}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" /> {selectedApplicant.candidate_match_score}% Skill Match Score
                </span>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="text-slate-500 uppercase font-bold tracking-wider block text-[10px]">Cover Letter</span>
              <p className="leading-relaxed whitespace-pre-line">{selectedApplicant.cover_letter || "No cover letter provided."}</p>
            </div>

            {/* Resume Link */}
            {selectedApplicant.candidate_resume_url && (
              <a
                href={selectedApplicant.candidate_resume_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:underline bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl"
              >
                <FileText className="w-4 h-4" /> Download Candidate PDF Resume
              </a>
            )}

            {/* Status Update Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-4 border-t border-slate-800">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Update Application Status</label>
                <select
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none"
                >
                  <option value="applied">Applied (Under Review)</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlist Candidate</option>
                  <option value="interview">Schedule Interview</option>
                  <option value="rejected">Reject Application</option>
                  <option value="hired">Mark as Hired 🎉</option>
                </select>
              </div>

              {statusUpdate === "interview" && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Interview Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-semibold text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm transition shadow-lg shadow-blue-600/30"
                >
                  {updating ? "Saving..." : "Update Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">{title}</span>
        <span className="text-3xl font-extrabold text-white">{value}</span>
      </div>
      <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700">{icon}</div>
    </div>
  );
}