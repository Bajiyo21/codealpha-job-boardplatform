import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCandidateProfile, updateCandidateProfile } from "../services/authService";
import toast from "react-hot-toast";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  GitBranch,
  Link2,
  Save,
  FileText,
  UploadCloud,
  Globe,
  MapPin
} from "lucide-react";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  
  const [resumeFile, setResumeFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [existingResume, setExistingResume] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getCandidateProfile();
        setName(data.user_name || "");
        setPhone(data.user_phone || "");
        setHeadline(data.headline || "");
        setLocation(data.location || "");
        setEducation(data.education || "");
        setExperience(data.experience || "");
        setSkills(data.skills || "");
        setBio(data.bio || "");
        setGithub(data.github || "");
        setLinkedin(data.linkedin || "");
        setPortfolio(data.portfolio || "");
        if (data.resume) setExistingResume(data.resume);
      } catch (error) {
        console.error("Profile load error:", error);
        toast.error("Unable to load profile data.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("headline", headline);
      formData.append("location", location);
      formData.append("education", education);
      formData.append("experience", experience);
      formData.append("skills", skills);
      formData.append("bio", bio);
      formData.append("github", github);
      formData.append("linkedin", linkedin);
      formData.append("portfolio", portfolio);

      if (resumeFile) formData.append("resume", resumeFile);
      if (avatarFile) formData.append("avatar", avatarFile);

      await updateCandidateProfile(formData);
      toast.success("Candidate Profile updated successfully!");
      navigate("/candidate/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 flex-1 w-full space-y-6 animate-pulse">
          <div className="h-28 bg-slate-900 rounded-3xl"></div>
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
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-500/20 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight">Edit Professional Profile</h1>
          <p className="mt-2 text-slate-300 text-sm">
            Keep your candidate profile complete to unlock AI skill matching and direct employer outreach.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-8">
          {/* Personal Info */}
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <User className="text-blue-400 w-5 h-5" /> Personal Details & Photo
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 555-0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-400 block mb-2">Professional Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Senior React & Django Engineer | 4+ YOE"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g. San Francisco, CA (Remote)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Profile Photo Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-300 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white"
                />
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <GraduationCap className="text-blue-400 w-5 h-5" /> Education & Background
            </h2>
            <textarea
              rows={3}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. B.S. Computer Science - Stanford University (Graduated 2022)"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <Briefcase className="text-blue-400 w-5 h-5" /> Work Experience & Projects
            </h2>
            <textarea
              rows={4}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Describe key roles, achievements, internships, and technical accomplishments..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Skills & Bio */}
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <Award className="text-blue-400 w-5 h-5" /> Technical Skills & Summary
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Comma Separated Skills</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, Python, Django, TypeScript, PostgreSQL, TailwindCSS, AWS"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Short Professional Bio</label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell employers about your career goals and engineering philosophy..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Portfolio & Links */}
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <Globe className="text-blue-400 w-5 h-5" /> Portfolio & Links
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">GitHub URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Portfolio Website</label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.dev"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Resume PDF Upload */}
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <FileText className="text-blue-400 w-5 h-5" /> Resume PDF Upload
            </h2>
            <div className="bg-slate-950/60 border border-dashed border-slate-700 rounded-2xl p-6 text-center space-y-3">
              <UploadCloud className="w-10 h-10 text-blue-400 mx-auto" />
              <p className="text-xs text-slate-300">Upload your latest PDF resume for instant employer download.</p>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="block mx-auto text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white file:font-semibold"
              />
              {existingResume && (
                <p className="text-xs text-emerald-400 font-semibold pt-2">
                  ✓ Active PDF resume currently attached.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => navigate("/candidate/dashboard")}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3.5 rounded-2xl font-semibold text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> {submitting ? "Saving Profile..." : "Save Profile"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}