import gallery from "../../data/gallery";

function Gallery() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-700">
            Campus Gallery
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Explore our beautiful campus and student life.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {gallery.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl shadow-lg bg-white hover:shadow-2xl transition duration-300"
            >
              <div className="overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-5">

                <h3 className="text-2xl font-bold text-center">
                  {item.title}
                </h3>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Gallery;