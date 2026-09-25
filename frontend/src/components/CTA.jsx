export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-[36px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 lg:p-16 text-center">
          <p className="uppercase tracking-widest text-blue-100 text-sm font-semibold">
            Ready to Start?
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mt-4">
            Find Your Next Career Opportunity Today
          </h2>

          <p className="mt-5 text-blue-100 max-w-2xl mx-auto">
            Join thousands of students and professionals using CareerNest to
            discover verified opportunities across India.
          </p>

          <button className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-100 transition">
            Create Free Account
          </button>
        </div>
      </div>
    </section>
  );
}