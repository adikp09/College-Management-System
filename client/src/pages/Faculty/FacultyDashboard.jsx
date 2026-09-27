import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FacultyDashboard() {
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("facultyToken");
    const facultyData = localStorage.getItem("faculty");

    if (!token) {
      navigate("/login");
      return;
    }

    if (facultyData) {
      setFaculty(JSON.parse(facultyData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("facultyToken");
    localStorage.removeItem("faculty");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-green-700 text-white px-8 py-5 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Faculty Dashboard
          </h1>

          <p className="text-green-100 text-sm">
            CampusHub
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          Logout
        </button>

      </div>

      {/* CONTENT */}
      <div className="p-8">

        {/* WELCOME CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {faculty?.full_name || "Faculty"} 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Manage your academic activities from here.
          </p>

        </div>

        {/* FACULTY INFO */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Faculty Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <p className="text-gray-500 text-sm">
                Full Name
              </p>

              <p className="font-semibold text-gray-800">
                {faculty?.full_name || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Email
              </p>

              <p className="font-semibold text-gray-800">
                {faculty?.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Department
              </p>

              <p className="font-semibold text-gray-800">
                {faculty?.department || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Designation
              </p>

              <p className="font-semibold text-gray-800">
                {faculty?.designation || "-"}
              </p>
            </div>

          </div>

        </div>

        {/* MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Attendance
            </h3>

            <p className="text-gray-500 mt-2">
              Manage student attendance.
            </p>

            <button
              onClick={() => navigate("/faculty-attendance")}
              className="mt-5 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Open
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Exams
            </h3>

            <p className="text-gray-500 mt-2">
              Manage examinations.
            </p>

            <button
              onClick={() => navigate("/faculty-exams")}
              className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Open
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Fees
            </h3>

            <p className="text-gray-500 mt-2">
              View fee information.
            </p>

            <button
              onClick={() => navigate("/faculty-fees")}
              className="mt-5 bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Open
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default FacultyDashboard;