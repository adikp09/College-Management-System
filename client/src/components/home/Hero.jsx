import heroImage from "../../assets/hero.png";
function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <div>
          <p className="text-yellow-300 text-lg font-semibold mb-3">
            Welcome to CampusHub
          </p>

          <h1 className="text-6xl font-extrabold leading-tight">
            Smart College
            <br />
            Management System
          </h1>

          <p className="mt-6 text-xl text-gray-200">
            Manage students, faculty, attendance, results,
            fees, notices and everything from one place.
          </p>

          <div className="mt-10 flex gap-5">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:scale-105 transition">
              Apply Now
            </button>

            <button className="border-2 border-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition">
              Explore Courses
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
      src={heroImage}
     alt="College"
  className="w-[500px] rounded-2xl shadow-2xl"
/>
        </div>

      </div>
    </section>
  );
}

export default Hero;