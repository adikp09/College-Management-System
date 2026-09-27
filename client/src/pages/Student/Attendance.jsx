import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token =", token);

        const response = await axios.get(
          "http://127.0.0.1:5000/api/attendance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        setAttendance(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 min-w-0 p-8 overflow-x-hidden">
        <Topbar />

        <div className="flex items-center justify-between mt-8 mb-8">
  <h1 className="text-4xl font-bold">
    Attendance
  </h1>

  <button
    onClick={() => window.location.reload()}
    className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
  >
    Refresh
  </button>
</div>
        <div className="grid md:grid-cols-4 gap-6 mb-6">

  {/* Total Subjects */}
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-gray-500">
      Total Subjects
    </h3>

    <p className="text-3xl font-bold text-blue-700 mt-2">
      {attendance.length}
    </p>
  </div>

  {/* Overall Attendance */}
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-gray-500">
      Overall Attendance
    </h3>

    <p className="text-3xl font-bold text-green-600 mt-2">
      {attendance.length > 0
        ? (
            (attendance.reduce(
              (sum, item) => sum + item.attended_classes,
              0
            ) /
              attendance.reduce(
                (sum, item) => sum + item.total_classes,
                0
              )) *
            100
          ).toFixed(1)
        : 0}
      %
    </p>
  </div>

  {/* Classes Attended */}
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-gray-500">
      Classes Attended
    </h3>

    <p className="text-3xl font-bold text-purple-600 mt-2">
      {attendance.reduce(
        (sum, item) => sum + item.attended_classes,
        0
      )}
    </p>
  </div>
{/* Classes Missed */}
<div className="bg-white rounded-xl shadow-lg p-6">
  <h3 className="text-gray-500">
    Classes Missed
  </h3>

  <p className="text-3xl font-bold text-red-600 mt-2">
    {attendance.reduce(
      (sum, item) => sum + item.total_classes,
      0
    ) -
      attendance.reduce(
        (sum, item) => sum + item.attended_classes,
        0
      )}
  </p>
</div>
</div>

<div className="bg-white rounded-xl shadow-lg p-6 mb-6">
  <h2 className="text-xl font-bold">
    Overall Attendance
  </h2>

  <p className="text-4xl font-bold text-blue-700 mt-3">
    {attendance.length > 0
      ? (
          (attendance.reduce(
            (sum, item) => sum + item.attended_classes,
            0
          ) /
            attendance.reduce(
              (sum, item) => sum + item.total_classes,
              0
            )) *
          100
        ).toFixed(1)
      : 0}
    %
  </p>

  <p className="text-gray-500 mt-2">
    Overall attendance across all subjects
  </p>
  {attendance.length > 0 &&
  (
    (attendance.reduce(
      (sum, item) => sum + item.attended_classes,
      0
    ) /
      attendance.reduce(
        (sum, item) => sum + item.total_classes,
        0
      )) *
    100
  ) < 75 && (
    <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-lg">
      ⚠️ Warning: Your overall attendance is below 75%.
    </div>
  )}
</div>
        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          {loading && (
  <div className="text-center py-6 text-gray-500">
    Loading attendance...
  </div>
)}
  <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Subject</th>
                <th className="text-center p-3">Attended</th>
                <th className="text-center p-3">Total</th>
                <th className="text-center p-3">Percentage</th>
                <th className="text-center p-3">Status</th>
              </tr>
            </thead>

            <tbody>
  {attendance.length === 0 && !loading ? (
    <tr>
      <td
        colSpan="5"
        className="text-center py-10 text-gray-500"
      >
        No attendance records found.
      </td>
    </tr>
  ) : (
    attendance.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.subject}</td>
                  <td className="text-center">{item.attended_classes}</td>
                  <td className="text-center">{item.total_classes}</td>
                  <td className="p-3">
  <div className="flex items-center gap-3">
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-600 h-3 rounded-full"
        style={{
          width: `${(
            (item.attended_classes / item.total_classes) *
            100
          ).toFixed(1)}%`,
        }}
      ></div>
    </div>

    <span className="font-semibold whitespace-nowrap">
      {(
        (item.attended_classes / item.total_classes) *
        100
      ).toFixed(1)}
      %
    </span>
  </div>
</td>
  <td className="text-center">
  {(() => {
    const percentage =
      (item.attended_classes / item.total_classes) * 100;

    let status = "";
    let style = "";

    if (percentage >= 90) {
      status = "Excellent";
      style = "bg-green-100 text-green-700";
    } else if (percentage >= 75) {
      status = "Good";
      style = "bg-blue-100 text-blue-700";
    } else {
      status = "Low";
      style = "bg-red-100 text-red-700";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${style}`}
      >
        {status}
      </span>
    );
  })()}
</td>

                </tr>
              ))
)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;