export default function Newsletter() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-[40px] bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center text-white">

          <p className="uppercase tracking-widest text-blue-100 text-sm font-semibold">
            Weekly Career Updates
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Never Miss Your Dream Opportunity
          </h2>

          <p className="mt-4 text-blue-100">
            Receive the latest software engineering, AI, cloud and internship opportunities directly in your inbox.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-slate-900 rounded-2xl px-5 py-4 w-full md:w-96 outline-none"
            />

            <button className="bg-slate-900 rounded-2xl px-8 py-4 hover:bg-black transition">
              Subscribe
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
