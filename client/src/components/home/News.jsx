import news from "../../data/news";

function News() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-700">
            Latest News & Events
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Stay updated with the latest activities and announcements.
          </p>
        </div>

        {/* News Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {news.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {item.date}
              </span>

              <h3 className="text-2xl font-bold mt-6">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {item.description}
              </p>

              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300">
                Read More
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default News;