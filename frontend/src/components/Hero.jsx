import { Search, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-blue-700 text-white">

      {/* Background Blur Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-6 text-sm">
            <Sparkles size={16}/>
            India's Modern Career Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Discover Your
            <span className="block text-cyan-300">
              Dream Career
            </span>
            With CareerNest
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Find verified jobs, internships, remote opportunities,
            and connect with top companies hiring software engineers,
            AI engineers, cloud professionals, and fresh graduates.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 bg-white rounded-2xl p-3 flex flex-col md:flex-row gap-3 shadow-2xl">

            <div className="flex items-center gap-3 flex-1 px-3">
              <Search className="text-slate-400"/>
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                className="w-full outline-none text-slate-800"
              />
            </div>

            <div className="flex items-center gap-3 flex-1 px-3 border-l">
              <MapPin className="text-slate-400"/>
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-slate-800"
              />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl text-white flex items-center justify-center gap-2 transition">
              Search
              <ArrowRight size={18}/>
            </button>

          </div>

          {/* STATS */}
          <div className="mt-12 flex gap-10 flex-wrap">

            <div>
              <h2 className="text-3xl font-bold">15K+</h2>
              <p className="text-blue-200 text-sm">Active Jobs</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-blue-200 text-sm">Companies</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">25K+</h2>
              <p className="text-blue-200 text-sm">Candidates</p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity:0, scale:0.9 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.8 }}
          className="relative"
        >

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">

            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800"
              alt="CareerNest"
              className="rounded-2xl w-full h-96 object-cover"
            />

            <div className="mt-6 bg-white/10 rounded-2xl p-4 backdrop-blur">

              <div className="flex justify-between mb-3">
                <span>Backend Developer</span>
                <span className="text-cyan-300">Google India</span>
              </div>

              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-cyan-300 h-2 rounded-full w-4/5"></div>
              </div>

              <p className="text-sm text-blue-100 mt-2">
                85% Match with your skills
              </p>

            </div>

          </div>

          {/* FLOATING CARDS */}
          <motion.div
            animate={{ y:[0,-12,0] }}
            transition={{ repeat:Infinity, duration:4 }}
            className="absolute -left-8 top-12 bg-white text-slate-800 rounded-2xl shadow-xl px-5 py-4"
          >
            <p className="text-xs text-slate-500">New Jobs Today</p>
            <h2 className="text-2xl font-bold text-blue-600">120+</h2>
          </motion.div>

          <motion.div
            animate={{ y:[0,10,0] }}
            transition={{ repeat:Infinity, duration:5 }}
            className="absolute -right-6 bottom-8 bg-white text-slate-800 rounded-2xl shadow-xl px-5 py-4"
          >
            <p className="text-xs text-slate-500">Verified Companies</p>
            <h2 className="text-2xl font-bold text-emerald-600">500+</h2>
          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}