import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sendContactMessage } from "../services/coreService";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendContactMessage({ name, email, subject, message });
      toast.success("Message sent! Our support team will reach out to you within 24 hours.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            24/7 Support & Partnerships
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Get in Touch with CareerNest</h1>
          <p className="text-slate-400 text-base">
            Have questions about hiring solutions, job applications, or enterprise plans? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex items-start gap-4 shadow-xl">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Email Us</h3>
                <p className="text-xs text-slate-400 mt-1">support@careernest.com</p>
                <p className="text-xs text-slate-400">partnerships@careernest.com</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex items-start gap-4 shadow-xl">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Call Support</h3>
                <p className="text-xs text-slate-400 mt-1">+1 (800) 555-NEST</p>
                <p className="text-xs text-slate-400">Mon - Fri (9am - 6pm EST)</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex items-start gap-4 shadow-xl">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Headquarters</h3>
                <p className="text-xs text-slate-400 mt-1">500 Howard Street, Suite 400</p>
                <p className="text-xs text-slate-400">San Francisco, CA 94105</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-5">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" /> Send Us a Message
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-2">Subject</label>
              <input
                type="text"
                required
                placeholder="Inquiry regarding employer platform..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-2">Message</label>
              <textarea
                rows={5}
                required
                placeholder="Write your message or question here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
