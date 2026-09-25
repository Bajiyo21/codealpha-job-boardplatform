import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCandidateProfile } from "../services/authService";
import { Printer, Download, Sparkles, RefreshCw, FileText, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ResumeBuilderPage() {
  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 019-2831",
    headline: "Senior Full Stack React & Django Engineer",
    location: "San Francisco, CA",
    summary: "High-impact Full Stack Engineer with 4+ years of experience building scalable SaaS web applications, REST microservices, and modern React interfaces. Specialized in React 19, TypeScript, Python, Django REST Framework, and PostgreSQL.",
    education: "B.S. Computer Science — Stanford University (2018 – 2022)\nGPA: 3.9 / 4.0",
    experience: "Staff Software Engineer — Stripe (2023 – Present)\n- Architected high-throughput payment checkout microfrontends serving millions of daily requests.\n- Reduced React bundle sizes by 38% using server components & dynamic chunk imports.\n\nFull Stack Developer — Vercel (2021 – 2023)\n- Developed core dashboard components using Next.js, TailwindCSS, and GraphQL.",
    skills: "React.js, TypeScript, Next.js, Python, Django, REST APIs, PostgreSQL, TailwindCSS, Docker, Git, CI/CD, AWS",
    projects: "CareerNest — Production Ready AI Job Board Platform\n- Built full-stack SaaS platform with Django REST API, JWT auth, Supabase storage, and React frontend.\n\nOpen Vector AI — Local Resume Skill Gap Analyzer\n- Built local Jaccard/TF-IDF similarity matching engine for automated candidate ranking.",
    github: "https://github.com/alexmorgan",
    linkedin: "https://linkedin.com/in/alexmorgan",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFromProfile() {
      try {
        const data = await getCandidateProfile();
        if (data) {
          setProfile(prev => ({
            ...prev,
            name: data.user_name || prev.name,
            email: data.user_email || prev.email,
            phone: data.user_phone || prev.phone,
            headline: data.headline || prev.headline,
            location: data.location || prev.location,
            summary: data.bio || prev.summary,
            education: data.education || prev.education,
            experience: data.experience || prev.experience,
            skills: data.skills || prev.skills,
            github: data.github || prev.github,
            linkedin: data.linkedin || prev.linkedin,
          }));
        }
      } catch (e) {
        console.warn("Could not fetch candidate profile for resume auto-fill");
      }
    }
    loadFromProfile();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="print:hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 border border-blue-500/20 rounded-3xl p-8 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> AI Powered Resume Builder
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Generate Professional PDF Resume</h1>
            <p className="text-slate-300 text-xs mt-1">
              Edit your resume sections on the left; preview and print a clean ATS-friendly resume on the right.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Export PDF / Print
          </button>
        </div>

        {/* Builder Interface Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Controls */}
          <div className="print:hidden bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 max-h-[850px] overflow-y-auto">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" /> Resume Content Editor
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Headline</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Professional Summary</label>
              <textarea
                rows={3}
                value={profile.summary}
                onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Work Experience</label>
              <textarea
                rows={5}
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Technical Skills</label>
              <input
                type="text"
                value={profile.skills}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Education</label>
              <textarea
                rows={2}
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Key Projects</label>
              <textarea
                rows={3}
                value={profile.projects}
                onChange={(e) => setProfile({ ...profile, projects: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Live Printable Resume Paper */}
          <div className="bg-white text-slate-900 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-6 font-sans border border-slate-200 min-h-[850px] text-left">
            {/* Header */}
            <div className="border-b-2 border-slate-800 pb-4 text-center">
              <h1 className="text-3xl font-bold uppercase tracking-wider text-slate-900">{profile.name}</h1>
              <p className="text-sm font-semibold text-blue-700 mt-1">{profile.headline}</p>
              <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-600 mt-2">
                <span>{profile.email}</span> &bull;
                <span>{profile.phone}</span> &bull;
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Summary */}
            {profile.summary && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">Professional Summary</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{profile.summary}</p>
              </div>
            )}

            {/* Experience */}
            {profile.experience && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">Work Experience</h3>
                <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">{profile.experience}</p>
              </div>
            )}

            {/* Skills */}
            {profile.skills && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">Technical Skills</h3>
                <p className="text-xs text-slate-800 leading-relaxed">{profile.skills}</p>
              </div>
            )}

            {/* Projects */}
            {profile.projects && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">Featured Projects</h3>
                <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">{profile.projects}</p>
              </div>
            )}

            {/* Education */}
            {profile.education && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">Education</h3>
                <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">{profile.education}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
