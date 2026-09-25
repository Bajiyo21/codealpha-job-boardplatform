import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16 flex-1 w-full space-y-12 text-center">
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Join the CareerNest Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Work With Us at CareerNest</h1>
          <p className="text-slate-400 text-base">
            We are on a mission to democratize startup hiring with AI matching and real-time candidate workflows.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 text-left">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-2">
            <h3 className="font-bold text-white text-base">🚀 High Growth Startup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Work directly with senior architects and product leaders building high-scale developer platforms.</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-2">
            <h3 className="font-bold text-white text-base">🌐 Remote First Culture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">We hire globally with flexible working hours, health benefits, and learning stipends.</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-2">
            <h3 className="font-bold text-white text-base">💡 AI Innovation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Pioneer local AI matching algorithms, automated resume analysis, and real-time candidate pipelines.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 border border-blue-500/20 rounded-3xl p-10 space-y-4">
          <h2 className="text-2xl font-bold text-white">Check Our Open Roles on CareerNest</h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">We practice what we preach. Browse open roles posted on our platform!</p>
          <Link to="/jobs" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-xs transition shadow-lg shadow-blue-600/30">
            View Internal Positions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
