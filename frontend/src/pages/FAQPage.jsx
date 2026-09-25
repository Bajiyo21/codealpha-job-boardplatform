import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "How does CareerNest AI candidate matching work?",
    answer: "CareerNest uses localized vector similarity algorithms that compare candidate skills, headlines, and bio against job requirements to calculate real-time match scores and skill gap analyses with zero latency."
  },
  {
    question: "Is CareerNest free for job seekers?",
    answer: "Yes! Creating a candidate account, applying for jobs, building resumes, and receiving AI skill analysis is 100% free for candidates."
  },
  {
    question: "How do employers post jobs and review applicants?",
    answer: "Employers can create an employer account, complete their company profile, post jobs, review applicants in a real-time status pipeline, and schedule candidate interviews directly."
  },
  {
    question: "Can I upload custom PDF resumes for specific job applications?",
    answer: "Absolutely. Candidates can store a default PDF resume on their profile or attach tailored resumes during the job application process."
  },
  {
    question: "How are company badges verified?",
    answer: "Our team verifies employer domains, business registration, and official career pages before assigning verified employer badges."
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 flex-1 w-full space-y-10">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Got Questions?
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Everything you need to know about job searching, employer tools, AI matching, and resume building.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-6 font-bold text-lg text-white flex items-center justify-between gap-4"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-400 shrink-0" /> {faq.question}
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openIdx === idx ? "rotate-180" : ""}`} />
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
