function CTA() {
  return (
    <section className="py-24 bg-blue-700 text-white">
      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold">
          Ready to Join CampusHub?
        </h2>

        <p className="mt-6 text-xl text-blue-100">
          Start your journey with one of the best universities and build a bright future.
        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">

          <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition">
            Apply Now
          </button>

          <button className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition">
            Contact Us
          </button>

        </div>

      </div>
    </section>
  );
}

export default CTA;