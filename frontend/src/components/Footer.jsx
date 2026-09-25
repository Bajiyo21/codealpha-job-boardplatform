import { Link } from "react-router-dom";
import { Sparkles, Globe2, Mail, MessageSquare, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span>Career<span className="text-blue-500">Nest</span></span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Production-ready SaaS hiring platform connecting high-caliber candidates with verified tech startups. Powered by local AI skill match vectors.
            </p>
            <div className="flex gap-3 text-slate-400 pt-2">
              <a href="#" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl hover:text-white transition"><Globe2 className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl hover:text-white transition"><Mail className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl hover:text-white transition"><MessageSquare className="w-4 h-4" /></a>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="text-white font-semibold text-sm">Candidates</h4>
            <ul className="space-y-2.5">
              <li><Link to="/jobs" className="hover:text-white transition">Browse All Jobs</Link></li>
              <li><Link to="/companies" className="hover:text-white transition">Hiring Companies</Link></li>
              <li><Link to="/resume-builder" className="hover:text-white transition">AI Resume Builder</Link></li>
              <li><Link to="/candidate/dashboard" className="hover:text-white transition">Candidate Portal</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="text-white font-semibold text-sm">Employers</h4>
            <ul className="space-y-2.5">
              <li><Link to="/jobs/create" className="hover:text-white transition">Post a Job</Link></li>
              <li><Link to="/employer/dashboard" className="hover:text-white transition">Applicant Pipeline</Link></li>
              <li><Link to="/employer/company" className="hover:text-white transition">Company Profile</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Enterprise Sales</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="text-white font-semibold text-sm">Company & Legal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="hover:text-white transition">About CareerNest</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ & Help</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CareerNest Inc. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>React (Vite) &bull; Django REST Framework &bull; Supabase PostgreSQL</span>
          </p>
        </div>
      </div>
    </footer>
  );
}