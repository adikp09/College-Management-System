import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-700/90 backdrop-blur-md text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold"
        >
          <GraduationCap size={32} />

          <span className="leading-tight">
            Berozgar Institute of Management Studies
            <span className="block text-sm font-semibold">
              (BIMS)
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <ul className="flex items-center gap-8 font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-300 hover:scale-105 transition-all duration-300"
              >
                Home
              </Link>
            </li>

            <li>
              <a
                href="#about"
                className="hover:text-yellow-300 hover:scale-105 transition-all duration-300"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#courses"
                className="hover:text-yellow-300 hover:scale-105 transition-all duration-300"
              >
                Courses
              </a>
            </li>

            <li>
              <a
                href="#departments"
                className="hover:text-yellow-300 hover:scale-105 transition-all duration-300"
              >
                Departments
              </a>
            </li>

            <li>
              <a
                href="#contact"
                className="hover:text-yellow-300 hover:scale-105 transition-all duration-300"
              >
                Contact
              </a>
            </li>
          </ul>

          <Link
            to="/login"
            className="bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
          >
            Register
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-5 space-y-4">

          <Link to="/" className="block">
            Home
          </Link>

          <a href="#about" className="block">
            About
          </a>

          <a href="#courses" className="block">
            Courses
          </a>

          <a href="#departments" className="block">
            Departments
          </a>

          <a href="#contact" className="block">
            Contact
          </a>

          <Link
            to="/login"
            className="block bg-white text-blue-700 text-center py-2 rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block bg-yellow-400 text-black text-center py-2 rounded-lg font-semibold"
          >
            Register
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;