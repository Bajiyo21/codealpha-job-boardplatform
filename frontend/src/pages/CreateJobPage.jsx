import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createJob } from "../services/jobService";
import { toast } from "react-hot-toast";
import { PlusCircle, ArrowLeft, Briefcase, MapPin, DollarSign, Clock3, Code2 } from "lucide-react";

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("full_time");
  const [workMode, setWorkMode] = useState("onsite");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("1-3 years");
  const [location, setLocation] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("React, Python, Django, PostgreSQL");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("published");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createJob({
        title,
        job_type: jobType,
        work_mode: workMode,
        salary: Number(salary),
        experience,
        location,
        skills_required: skillsRequired,
        deadline,
        description,
        status,
      });
      toast.success("Job posting created successfully!");
      navigate("/employer/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to create job posting.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full space-y-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-500/20 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight">Create New Job Posting</h1>
          <p className="mt-2 text-slate-300 text-sm">
            Publish a new job listing to attract verified software engineering and technical candidates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Job Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Frontend Architect - React & TypeScript"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none"
              >
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Work Mode</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none"
              >
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Annual Salary ($ USD)</label>
              <input
                type="number"
                required
                placeholder="e.g. 150000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Experience Level</label>
              <input
                type="text"
                required
                placeholder="e.g. 3-5 years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Location</label>
              <input
                type="text"
                required
                placeholder="e.g. San Francisco, CA or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Application Deadline</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Required Skills (Comma Separated)</label>
              <input
                type="text"
                required
                placeholder="React, TypeScript, GraphQL, Node.js, Webpack"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Detailed Job Description & Requirements</label>
              <textarea
                rows={7}
                required
                placeholder="Provide details about responsibilities, team culture, requirements, and benefits..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3.5 rounded-2xl font-semibold text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> {submitting ? "Publishing..." : "Publish Job Listing"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
