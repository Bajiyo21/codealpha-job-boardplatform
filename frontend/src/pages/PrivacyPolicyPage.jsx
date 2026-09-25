import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 flex-1 w-full space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
            <p>We collect information provided directly by candidates and employers, including names, email addresses, phone numbers, resume documents, company details, and job application preferences.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. How We Use Information</h2>
            <p>Your data is used to provide job search services, match candidate profiles with relevant job openings using AI skill analysis, notify candidates of application status updates, and connect employers with qualified talent.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Data Security & Storage</h2>
            <p>CareerNest employs industry-standard encryption, JWT token authentication, and secure Supabase PostgreSQL & Storage buckets to protect candidate resumes and user data.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Contact Us</h2>
            <p>For questions regarding our privacy practices or data subject requests, please contact privacy@careernest.com.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
