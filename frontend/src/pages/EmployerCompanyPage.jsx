import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMyCompany, updateMyCompany } from "../services/companyService";
import { toast } from "react-hot-toast";
import { Building2, Save, ArrowLeft, UploadCloud, Globe, MapPin, CheckCircle } from "lucide-react";

export default function EmployerCompanyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [companySize, setCompanySize] = useState("11-50 employees");
  const [foundedYear, setFoundedYear] = useState(2020);
  const [description, setDescription] = useState("");

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    async function loadCompany() {
      try {
        const res = await getMyCompany();
        const comp = res.data || res;
        setCompanyData(comp);
        setCompanyName(comp.company_name || "");
        setIndustry(comp.industry || "");
        setWebsite(comp.website || "");
        setLocation(comp.location || "");
        setCompanySize(comp.company_size || "11-50 employees");
        setFoundedYear(comp.founded_year || 2020);
        setDescription(comp.description || "");
      } catch (err) {
        console.error(err);
        toast.error("Could not load company profile.");
      } finally {
        setLoading(false);
      }
    }
    loadCompany();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("company_name", companyName);
      formData.append("industry", industry);
      formData.append("website", website);
      formData.append("location", location);
      formData.append("company_size", companySize);
      formData.append("founded_year", foundedYear);
      formData.append("description", description);

      if (logoFile) formData.append("logo", logoFile);
      if (bannerFile) formData.append("banner", bannerFile);

      await updateMyCompany(formData);
      toast.success("Company profile updated!");
      navigate("/employer/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update company details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 flex-1 w-full space-y-6 animate-pulse">
          <div className="h-32 bg-slate-900 rounded-3xl"></div>
          <div className="h-96 bg-slate-900 rounded-3xl"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full space-y-8">
        <button onClick={() => navigate("/employer/dashboard")} className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Employer Dashboard
        </button>

        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-500/20 rounded-3xl p-8 shadow-2xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Company Profile & Branding</h1>
            <p className="mt-2 text-slate-300 text-sm">
              Manage your verified company branding, logo, banner, and public presence.
            </p>
          </div>
          {companyData?.is_verified && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <CheckCircle className="w-4 h-4" /> Verified Employer Badge
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Company Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Industry</label>
              <input
                type="text"
                required
                placeholder="e.g. Fintech, AI, SaaS, Cloud DevTools"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Company Website</label>
              <input
                type="url"
                placeholder="https://company.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Headquarters Location</label>
              <input
                type="text"
                required
                placeholder="e.g. San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Company Size</label>
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              >
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="50-200 employees">50-200 employees</option>
                <option value="200-500 employees">200-500 employees</option>
                <option value="500+ employees">500+ employees</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Founded Year</label>
              <input
                type="number"
                value={foundedYear}
                onChange={(e) => setFoundedYear(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Company Description</label>
              <textarea
                rows={5}
                required
                placeholder="Write an engaging introduction about your mission, product, and engineering culture..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Company Logo Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files[0])}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-300 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Company Cover Banner</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files[0])}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-300 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => navigate("/employer/dashboard")}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3.5 rounded-2xl font-semibold text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> {submitting ? "Saving Profile..." : "Save Company Profile"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
