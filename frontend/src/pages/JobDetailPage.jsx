import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getJobById, toggleSaveJob } from "../services/jobService";
import { applyJob } from "../services/applicationService";
import { getAISkillGap } from "../services/coreService";
import { useAuth } from "../context/AuthContext";
import {
  MapPin,
  Briefcase,
  Clock3,
  Building2,
  Bookmark,
  CheckCircle,
  Share2,
  FileText,
  Sparkles,
  DollarSign,
  ArrowLeft,
  X
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isCandidate } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Apply Modal State
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadJob() {
      try {
        const data = await getJobById(id);
        setJob(data);

        if (user && isCandidate) {
          setLoadingAi(true);
          try {
            const aiRes = await getAISkillGap(id);
            if (aiRes.data) setAiAnalysis(aiRes.data);
          } catch (e) {
            console.warn("AI skill gap error:", e);
          } finally {
            setLoadingAi(false);
          }
        }
      } catch (err) {
        console.error("Job load error:", err);
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [id, user]);

  const handleSave = async () => {
    try {
      const res = await toggleSaveJob(id);
      toast.success(res.message);
      setJob(prev => ({ ...prev, is_saved: !prev.is_saved }));
    } catch (err) {
      toast.error("Please login to save job");
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await applyJob(id, { cover_letter: coverLetter });
      toast.success("Application submitted successfully!");
      setShowApplyModal(false);
    } catch (err) {
      const msg = err.response?.data?.detail || err.response?.data?.message || "Failed to submit application.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-20 flex-1 w-full animate-pulse space-y-6">
          <div className="h-10 w-3/4 bg-slate-800 rounded-xl"></div>
          <div className="h-6 w-1/2 bg-slate-800 rounded-xl"></div>
          <div className="h-64 bg-slate-900 rounded-3xl"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Job Not Found</h2>
          <Link to="/jobs" className="mt-4 text-blue-400 hover:underline inline-block">Back to Jobs</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full space-y-8">
        <Link to="/jobs" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to All Jobs
        </Link>

        {/* Job Header Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl font-bold text-blue-400 overflow-hidden shrink-0 shadow-inner">
                {job.company_logo ? (
                  <img src={job.company_logo} alt={job.company_name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-10 h-10 text-blue-400" />
                )}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{job.title}</h1>
                <div className="flex items-center gap-2 text-slate-300 font-semibold mt-1">
                  <span>{job.company_name}</span>
                  {job.company_is_verified && <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />}
                </div>

                <div className="flex flex-wrap gap-2.5 mt-4 text-xs font-semibold">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full uppercase">
                    {job.job_type?.replace("_", " ")}
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
                    ${Number(job.salary).toLocaleString()} / year
                  </span>
                  <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full capitalize">
                    {job.work_mode}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col gap-3 w-full sm:w-auto">
              <button
                onClick={() => isCandidate ? setShowApplyModal(true) : navigate("/login")}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-600/30 text-center"
              >
                Apply for this Role
              </button>
              <button
                onClick={handleSave}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-sm font-semibold transition ${
                  job.is_saved ? "bg-blue-600 text-white border-blue-500" : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
                }`}
              >
                <Bookmark className="w-4 h-4" /> {job.is_saved ? "Saved" : "Save Job"}
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
            <div><span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Location</span><span className="text-white font-medium mt-0.5 block">{job.location}</span></div>
            <div><span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Experience</span><span className="text-white font-medium mt-0.5 block">{job.experience}</span></div>
            <div><span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Deadline</span><span className="text-white font-medium mt-0.5 block">{job.deadline}</span></div>
            <div><span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Total Views</span><span className="text-white font-medium mt-0.5 block">{job.views_count} views</span></div>
          </div>
        </div>

        {/* AI Skill Gap Analysis Widget */}
        {aiAnalysis && (
          <div className="bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border border-blue-500/30 rounded-3xl p-6 shadow-xl relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Candidate Resume Match Analysis</h3>
                <p className="text-xs text-slate-400">{aiAnalysis.summary}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-3xl font-extrabold text-blue-400">{aiAnalysis.match_percentage}%</span>
                <span className="block text-xs text-slate-400 mt-1">Skill Match Score</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">Matched Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {aiAnalysis.matched_skills?.map((s, idx) => (
                    <span key={idx} className="bg-emerald-500/10 text-emerald-300 text-[11px] px-2 py-0.5 rounded-md">{s}</span>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Missing Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {aiAnalysis.missing_skills?.map((s, idx) => (
                    <span key={idx} className="bg-amber-500/10 text-amber-300 text-[11px] px-2 py-0.5 rounded-md">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job Description & Requirements */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Job Description & Responsibilities</h2>
          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
            {job.description}
          </div>

          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Required Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills_required?.split(",").map((skill, idx) => (
                <span key={idx} className="bg-slate-800 text-blue-300 border border-slate-700 px-3 py-1 rounded-xl text-xs font-semibold">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 relative shadow-2xl">
            <button onClick={() => setShowApplyModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-2">Apply for {job.title}</h3>
            <p className="text-xs text-slate-400 mb-6">Your profile & resume will be automatically attached to this application.</p>

            <form onSubmit={handleApplySubmit} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Cover Letter / Note to Recruiter</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Introduce yourself, highlight relevant achievements, and explain why you're a great fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-semibold text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm transition shadow-lg shadow-blue-600/30"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
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
