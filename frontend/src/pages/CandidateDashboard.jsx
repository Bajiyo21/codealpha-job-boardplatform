import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCandidateProfile } from "../services/authService";
import { getMyApplications, withdrawApplication } from "../services/applicationService";
import { getSavedJobs } from "../services/jobService";
import { getAIRecommendations } from "../services/coreService";
import {
  UserCircle,
  Briefcase,
  Bookmark,
  FileCheck,
  TrendingUp,
  ArrowRight,
  MapPin,
  GraduationCap,
  Award,
  Sparkles,
  FileText,
  Clock3,
  Trash2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function CandidateDashboard() {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("applications");

  useEffect(() => {
    async function loadCandidateDashboard() {
      try {
        const [profData, appsData, savedData, aiData] = await Promise.allSettled([
          getCandidateProfile(),
          getMyApplications(),
          getSavedJobs(),
          getAIRecommendations()
        ]);

        if (profData.status === "fulfilled") setProfile(profData.value);
        if (appsData.status === "fulfilled") {
          const list = Array.isArray(appsData.value) ? appsData.value : (appsData.value?.results || []);
          setApplications(list);
        }
        if (savedData.status === "fulfilled") {
          const list = Array.isArray(savedData.value) ? savedData.value : (savedData.value?.results || []);
          setSavedJobs(list);
        }
        if (aiData.status === "fulfilled") {
          setAiRecommendations(aiData.value?.data || []);
        }
      } catch (err) {
        console.error("Error loading candidate dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCandidateDashboard();
  }, []);

  const handleWithdraw = async (appId) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) return;
    try {
      await withdrawApplication(appId);
      toast.success("Application withdrawn");
      setApplications(prev => prev.filter(a => a.id !== appId));
    } catch (err) {
      toast.error("Failed to withdraw application");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "hired":
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase">Hired 🎉</span>;
      case "interview":
        return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase">Interview Scheduled</span>;
      case "shortlisted":
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase">Shortlisted</span>;
      case "rejected":
        return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase">Not Selected</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Under Review</span>;
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

  const completionScore = profile?.completion_percentage || 50;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 border border-blue-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5 z-10">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center font-bold text-2xl text-blue-400 overflow-hidden shrink-0">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserCircle className="w-10 h-10 text-blue-300" />
              )}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome Back, {profile?.user_name || "Candidate"} 👋
              </h1>
              <p className="text-slate-300 text-sm mt-1 font-medium">
                {profile?.headline || "Senior Full Stack React & Django Engineer"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 z-10 w-full sm:w-auto">
            <Link to="/profile/edit" className="flex-1 sm:flex-none">
              <button className="w-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 px-5 py-2.5 rounded-xl font-semibold text-xs transition">
                Edit Profile
              </button>
            </Link>
            <Link to="/resume-builder" className="flex-1 sm:flex-none">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5">
                <FileText className="w-4 h-4" /> Resume Builder
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Applied Jobs" value={applications.length} icon={<Briefcase className="text-blue-400" />} />
          <StatCard title="Saved Bookmarks" value={savedJobs.length} icon={<Bookmark className="text-emerald-400" />} />
          <StatCard title="Interviews Scheduled" value={applications.filter(a => a.status === "interview").length} icon={<FileCheck className="text-purple-400" />} />
          <StatCard title="Profile Completion" value={`${completionScore}%`} icon={<TrendingUp className="text-amber-400" />} />
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4 mb-6">
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`font-bold text-sm transition pb-1 border-b-2 ${
                    activeTab === "applications" ? "text-blue-400 border-blue-500" : "text-slate-400 border-transparent hover:text-white"
                  }`}
                >
                  My Applications ({applications.length})
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`font-bold text-sm transition pb-1 border-b-2 ${
                    activeTab === "saved" ? "text-blue-400 border-blue-500" : "text-slate-400 border-transparent hover:text-white"
                  }`}
                >
                  Saved Jobs ({savedJobs.length})
                </button>
              </div>

              {activeTab === "applications" ? (
                applications.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Briefcase className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                    <p className="font-semibold text-slate-300">You haven't applied for any jobs yet.</p>
                    <Link to="/jobs" className="mt-3 text-xs text-blue-400 hover:underline inline-block">Explore Job Openings</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-lg text-white">{app.job_title}</h4>
                            <p className="text-xs text-blue-400 font-semibold">{app.company_name}</p>
                          </div>
                          {getStatusBadge(app.status)}
                        </div>

                        {app.interview_date && (
                          <div className="bg-purple-950/40 border border-purple-800/50 rounded-xl p-3 text-xs text-purple-200">
                            <strong>Interview Date:</strong> {new Date(app.interview_date).toLocaleString()}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                          <span>Applied on: {new Date(app.applied_at).toLocaleDateString()}</span>
                          <button
                            onClick={() => handleWithdraw(app.id)}
                            className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Withdraw
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                savedJobs.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Bookmark className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                    <p className="font-semibold text-slate-300">No saved jobs.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedJobs.map((item) => (
                      <div key={item.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4">
                        <div>
                          <Link to={`/jobs/${item.job.id}`} className="font-bold text-white hover:text-blue-400 transition">{item.job.title}</Link>
                          <p className="text-xs text-slate-400 mt-0.5">{item.job.company_name} &bull; {item.job.location}</p>
                        </div>
                        <Link to={`/jobs/${item.job.id}`} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold">
                          View Role
                        </Link>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 font-bold text-white">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3>AI Job Recommendations for You</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {aiRecommendations.slice(0, 4).map((rec) => (
                  <Link
                    key={rec.id}
                    to={`/jobs/${rec.id}`}
                    className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 p-4 rounded-2xl transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{rec.match_score}% Match</span>
                      <span className="text-[10px] text-slate-500 uppercase">{rec.job_type}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white line-clamp-1">{rec.title}</h4>
                    <p className="text-xs text-slate-400">{rec.company_name} &bull; {rec.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Completion Widget */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-base">Profile Strength</h3>
                <span className="text-sm font-extrabold text-blue-400">{completionScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500" style={{ width: `${completionScore}%` }}></div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete education, experience, and PDF resume to boost your hiring rank.
              </p>
              <Link to="/profile/edit" className="block">
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2.5 rounded-xl font-semibold text-xs transition">
                  Complete Profile
                </button>
              </Link>
            </div>

            {/* Profile Overview */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 text-xs text-slate-300">
              <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">Quick Overview</h3>
              <div><span className="text-slate-500 block">Email</span><span className="font-semibold text-white">{profile?.user_email}</span></div>
              <div><span className="text-slate-500 block">Phone</span><span className="font-semibold text-white">{profile?.user_phone || "Not provided"}</span></div>
              <div><span className="text-slate-500 block">Location</span><span className="font-semibold text-white">{profile?.location || "Not specified"}</span></div>
              <div><span className="text-slate-500 block mb-1">Resume File</span>
                {profile?.resume ? (
                  <a href={profile.resume} target="_blank" rel="noreferrer" className="text-blue-400 font-semibold flex items-center gap-1 hover:underline">
                    <FileText className="w-3.5 h-3.5" /> View Uploaded PDF Resume
                  </a>
                ) : (
                  <span className="text-amber-400 font-semibold">No resume uploaded</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

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