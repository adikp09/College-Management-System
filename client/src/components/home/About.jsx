import heroImage from "../../assets/hero.png";

function About() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        <img
          src={heroImage}
          alt="Campus"
          className="rounded-3xl shadow-2xl"
        />

        <div>
          <h2 className="text-5xl font-bold text-blue-700 mb-6">
            About CampusHub
          </h2>

          <p className="text-lg text-gray-600 leading-8">
            CampusHub is a modern College Management System that helps students,
            faculty and administrators manage academic activities from one
            platform.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-3xl font-bold text-blue-700">15+</h3>
              <p>Years of Excellence</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-3xl font-bold text-blue-700">120+</h3>
              <p>Expert Faculty</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-3xl font-bold text-blue-700">3000+</h3>
              <p>Students</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-3xl font-bold text-blue-700">95%</h3>
              <p>Placement</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default About;