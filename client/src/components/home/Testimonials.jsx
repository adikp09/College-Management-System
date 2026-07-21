import testimonials from "../../data/testimonials";

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-700">
            What Our Students Say
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Hear from our students about their learning experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />

              <h3 className="text-2xl font-bold text-center mt-6">
                {student.name}
              </h3>

              <p className="text-blue-700 font-semibold text-center">
                {student.course}
              </p>

              <div className="text-yellow-400 text-center text-xl mt-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-600 text-center mt-4">
                {student.review}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;