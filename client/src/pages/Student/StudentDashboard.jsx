import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ProfileCard from "./components/ProfileCard";

function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Topbar />

        <h1 className="text-4xl font-bold mt-8">
          Welcome Aditya 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's what's happening today.
        </p>

        <div className="grid lg:grid-cols-4 gap-6 mt-8">
          {/* Profile */}
          <div>
            <ProfileCard />
          </div>

          {/* Right Side */}
          <div className="lg:col-span-3">
            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold">
                  Attendance
                </h2>

                <p className="text-4xl font-bold text-blue-700 mt-4">
                  92%
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold">
                  Results
                </h2>

                <p className="text-4xl font-bold text-green-600 mt-4">
                  8.5 CGPA
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold">
                  Pending Fees
                </h2>

                <p className="text-4xl font-bold text-red-600 mt-4">
                  ₹0
                </p>
              </div>
            </div>

            {/* Notice Board */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">
                📢 Recent Notices
              </h2>

              <ul className="space-y-3">
                <li>📌 Mid Semester Exams start from 15 August.</li>
                <li>📌 Library will remain open till 8 PM.</li>
                <li>📌 Placement Drive by TCS on Friday.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;