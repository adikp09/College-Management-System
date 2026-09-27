import { useEffect, useState } from "react";
import axios from "axios";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    // Fetch subjects
    try {
      const subjectResponse = await axios.get(
        "http://127.0.0.1:5000/api/subjects/all"
      );

      setSubjects(subjectResponse.data);
    } catch (error) {
      console.log("Failed to fetch subjects:", error);
    }

    // Fetch attendance
    try {
      const attendanceResponse = await axios.get(
        "http://127.0.0.1:5000/api/attendance",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setAttendance(attendanceResponse.data);
    } catch (error) {
      console.log("Failed to fetch attendance:", error);
    }
  };

  fetchData();
}, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Subjects
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">
          My Subjects
        </h2>

        {subjects.length === 0 ? (
          <p className="text-gray-600">
            No subjects found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {subjects.map((subject) => {
              const attendanceData = attendance.find(
                (item) => item.subject === subject.subject_name
              );

              const attended =
                attendanceData?.attended_classes || 0;

              const total =
                attendanceData?.total_classes || 0;

              const percentage =
                total > 0
                  ? ((attended / total) * 100).toFixed(1)
                  : 0;

              return (
                <div
                  key={subject.id}
                  className="border rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold mb-4">
                    {subject.subject_name}
                  </h3>

                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">
                      Subject Code:
                    </span>{" "}
                    {subject.subject_code}
                  </p>

                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">
                      Faculty:
                    </span>{" "}
                    {subject.faculty_name}
                  </p>

                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">
                      Details:
                    </span>{" "}
                    {subject.subject_details}
                  </p>

                  <p className="text-gray-600 mb-3">
                    Classes Attended:{" "}
                    <span className="font-semibold text-gray-800">
                      {attended}
                    </span>{" "}
                    / {total}
                  </p>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>
                  </div>

                  <p className="font-semibold text-blue-700">
                    Attendance: {percentage}%
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Subjects;