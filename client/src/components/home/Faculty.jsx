import faculty from "../../data/faculty";

function Faculty() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-700">
            Meet Our Faculty
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Learn from our experienced professors and industry experts.
          </p>
        </div>

        {/* Faculty Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {faculty.map((teacher) => (

            <div
              key={teacher.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {teacher.name}
                </h3>

                <p className="text-blue-700 font-semibold mt-2">
                  {teacher.designation}
                </p>

                <p className="text-gray-600 mt-3">
                  {teacher.qualification}
                </p>

                <p className="text-gray-500 mt-2">
                  Experience : {teacher.experience}
                </p>

                <button className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition">
                  View Profile
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Faculty;