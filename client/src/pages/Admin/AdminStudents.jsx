import { useEffect, useState } from "react";
import axios from "axios";

function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          "http://127.0.0.1:5000/api/admin/students",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setStudents(response.data);
      } catch (error) {
        console.log("Students API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const text = search.toLowerCase();

    return (
      student.full_name.toLowerCase().includes(text) ||
      student.email.toLowerCase().includes(text) ||
      student.department.toLowerCase().includes(text) ||
      student.course.toLowerCase().includes(text)
    );
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Students
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all registered students
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-5 mb-6">

        <input
          type="text"
          placeholder="Search student by name, email, department or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Students */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading students...
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No students found.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>
                  <th className="text-left px-6 py-4">
                    ID
                  </th>

                  <th className="text-left px-6 py-4">
                    Student
                  </th>

                  <th className="text-left px-6 py-4">
                    Email
                  </th>

                  <th className="text-left px-6 py-4">
                    Department
                  </th>

                  <th className="text-left px-6 py-4">
                    Course
                  </th>

                  <th className="text-left px-6 py-4">
                    Year
                  </th>
                </tr>

              </thead>

              <tbody>

                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-4 font-semibold">
                      {student.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">
                        {student.full_name}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {student.email}
                    </td>

                    <td className="px-6 py-4">
                      {student.department}
                    </td>

                    <td className="px-6 py-4">
                      {student.course}
                    </td>

                    <td className="px-6 py-4">
                      {student.year}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminStudents;