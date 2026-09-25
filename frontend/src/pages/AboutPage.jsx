import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Briefcase,
  Building2,
  Users,
  ShieldCheck,
  Rocket,
  Search,
  UserCheck,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: <Briefcase className="text-blue-600" size={28} />,
    title: "Verified Job Opportunities",
    description:
      "Discover internships and full-time jobs from trusted companies across India.",
  },
  {
    icon: <Building2 className="text-blue-600" size={28} />,
    title: "Verified Companies",
    description:
      "Every employer on CareerNest is verified before posting jobs.",
  },
  {
    icon: <Users className="text-blue-600" size={28} />,
    title: "Candidate Profiles",
    description:
      "Students and professionals can build complete career profiles and resumes.",
  },
  {
    icon: <ShieldCheck className="text-blue-600" size={28} />,
    title: "Secure Authentication",
    description:
      "CareerNest uses JWT authentication for secure candidate and employer login.",
  },
];

const stats = [
  { value: "15K+", label: "Active Jobs" },
  { value: "500+", label: "Hiring Companies" },
  { value: "25K+", label: "Registered Candidates" },
  { value: "98%", label: "Verified Employers" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen">

        {/* HERO */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="uppercase tracking-[0.3em] text-blue-200 text-sm font-semibold">
              About CareerNest
            </p>

            <h1 className="text-5xl md:text-6xl font-bold mt-4 leading-tight">
              Building Better Careers Through Technology
            </h1>

            <p className="text-blue-100 text-lg mt-6 max-w-3xl mx-auto leading-8">
              CareerNest is a modern job portal connecting talented candidates with
              verified employers through a secure, fast and user-friendly hiring platform.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-blue-600 uppercase tracking-[0.3em] text-sm font-semibold">
              Our Mission
            </p>

            <h2 className="text-4xl font-bold text-slate-900 mt-4 leading-tight">
              Connecting Students, Professionals and Employers.
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              CareerNest helps candidates discover meaningful opportunities while
              giving companies an easy platform to post jobs and hire qualified talent.
            </p>

            <button className="mt-8 bg-blue-600 text-white px-7 py-4 rounded-xl hover:bg-blue-700 transition flex items-center gap-2">
              Explore Jobs
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
            <Feature icon={<Rocket className="text-blue-600" />} title="Fast Hiring" text="Companies can publish jobs and receive applications instantly." />
            <Feature icon={<Search className="text-blue-600" />} title="Smart Job Discovery" text="Candidates can search jobs using skills, company and location." />
            <Feature icon={<UserCheck className="text-blue-600" />} title="Professional Profiles" text="Candidates showcase education, skills and experience in one place." />
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div key={item.label} className="bg-white rounded-3xl p-8 text-center shadow hover:shadow-xl transition">
                <h2 className="text-4xl font-bold text-blue-600">{item.value}</h2>
                <p className="text-slate-500 mt-3">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-blue-600 uppercase tracking-[0.3em] text-sm font-semibold">
              Why CareerNest
            </p>

            <h2 className="text-4xl font-bold mt-4 text-slate-900">
              Everything You Need in One Job Platform
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition border border-slate-200">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mt-6 text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-7">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How CareerNest Works */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-blue-600 uppercase tracking-[0.3em] text-sm font-semibold">
              How CareerNest Works
            </p>

            <h2 className="text-4xl font-bold mt-4 text-slate-900">
              A Simple Hiring Journey
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-16">

              <Step number="01" title="Create Your Profile" description="Candidates register and build their professional profile with education, skills and resume." />

              <Step number="02" title="Explore & Apply" description="Search jobs by company, skills, location and apply directly through CareerNest." />

              <Step number="03" title="Employers Hire" description="Verified employers review applications and hire talented candidates quickly." />

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 text-center">
            <h2 className="text-4xl font-bold">
              Start Your Career Journey Today
            </h2>

            <p className="mt-5 text-blue-100 text-lg max-w-2xl mx-auto leading-8">
              Join thousands of students and recruiters using CareerNest to discover opportunities and build careers.
            </p>

            <button className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-100 transition">
              Get Started
            </button>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-lg text-slate-900">{title}</h3>
        <p className="text-slate-600 mt-2 leading-7">{text}</p>
      </div>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:shadow-xl transition">
      <div className="text-blue-600 text-5xl font-bold">{number}</div>
      <h3 className="text-2xl font-bold mt-6 text-slate-900">{title}</h3>
      <p className="mt-4 text-slate-600 leading-7">{description}</p>
    </div>
  );
}