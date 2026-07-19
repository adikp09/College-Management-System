function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">
          🎓 CampusHub
        </h1>

        <ul className="flex gap-8 font-medium">
          <li className="cursor-pointer hover:text-yellow-300">Home</li>
          <li className="cursor-pointer hover:text-yellow-300">About</li>
          <li className="cursor-pointer hover:text-yellow-300">Courses</li>
          <li className="cursor-pointer hover:text-yellow-300">Departments</li>
          <li className="cursor-pointer hover:text-yellow-300">Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;