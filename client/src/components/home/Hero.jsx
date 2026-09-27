import { Link } from "react-router-dom";
import campusImage from "../../assets/campus.jpg";

function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden text-white">

      {/* Campus Background */}
      <img
  src={campusImage}
  alt="Berozgar Institute of Management Studies Campus"
  className="absolute inset-0 w-full h-full object-cover"
/>

      {/* Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-700/90 to-transparent"></div>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">

        <div className="max-w-3xl">

          {/* Welcome */}
          <p className="text-yellow-300 text-lg md:text-xl font-bold mb-5">
            Welcome to Berozgar Institute of Management Studies (BIMS)
          </p>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Empowering Future
            <br />
            Leaders at{" "}
            <span className="text-yellow-400">
              BIMS
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed">
            A modern and student-focused institute dedicated to
            quality education, skill development and overall
            personality growth.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-5">

            <Link
  to="/register"
  className="inline-block bg-white text-blue-700 px-7 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
>
  Apply Now →
</Link>

           <a
  href="#courses"
  className="inline-block border-2 border-white px-7 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300"
>
  Explore Courses →
</a>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">

          {/* Students */}
          <div className="bg-blue-700/40 backdrop-blur-md border border-white/20 rounded-xl p-5">
            <div className="text-3xl mb-2">👥</div>

            <h3 className="text-3xl font-bold">
              5,000+
            </h3>

            <p className="text-gray-200">
              Students
            </p>
          </div>

          {/* Faculty */}
          <div className="bg-blue-700/40 backdrop-blur-md border border-white/20 rounded-xl p-5">
            <div className="text-3xl mb-2">🎓</div>

            <h3 className="text-3xl font-bold">
              200+
            </h3>

            <p className="text-gray-200">
              Faculty Members
            </p>
          </div>

          {/* Departments */}
          <div className="bg-blue-700/40 backdrop-blur-md border border-white/20 rounded-xl p-5">
            <div className="text-3xl mb-2">🏫</div>

            <h3 className="text-3xl font-bold">
              20+
            </h3>

            <p className="text-gray-200">
              Departments
            </p>
          </div>

          {/* Placement */}
          <div className="bg-blue-700/40 backdrop-blur-md border border-white/20 rounded-xl p-5">
            <div className="text-3xl mb-2">🏆</div>

            <h3 className="text-3xl font-bold">
              95%
            </h3>

            <p className="text-gray-200">
              Placement Support
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;