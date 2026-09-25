import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 flex-1 w-full space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>By accessing or using CareerNest, you agree to comply with and be bound by these Terms of Service. If you do not agree, you may not use the platform.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. User Conduct & Accounts</h2>
            <p>Users must provide accurate registration details. Candidates may only submit authentic application info and resumes. Employers are responsible for ensuring job postings represent legitimate employment opportunities.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Intellectual Property</h2>
            <p>All content, trademarks, logos, and software underlying CareerNest are the exclusive property of CareerNest Inc. and its licensors.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
