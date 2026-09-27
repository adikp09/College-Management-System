import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ExamResults() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch students for exam
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://127.0.0.1:5000/api/exam-results/exam/${examId}/students`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setStudents(response.data);

        // Existing marks ko input me set karna
        const existingMarks = {};

        response.data.forEach((student) => {
          if (student.marks !== undefined && student.marks !== null) {
            existingMarks[student.student_id] = student.marks;
          }
        });

        setMarks(existingMarks);
      } catch (err) {
        console.log("Failed to fetch students:", err);

        setError("Failed to load students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [examId]);

  // Marks change
  const handleMarksChange = (studentId, value) => {
    setMarks({
      ...marks,
      [studentId]: value,
    });
  };

  // Save marks
  const handleSaveMarks = async (studentId) => {
    try {
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      const studentMarks = marks[studentId];

      if (
        studentMarks === undefined ||
        studentMarks === ""
      ) {
        setError("Please enter marks first.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:5000/api/exam-results/marks",
        {
          exam_id: Number(examId),
          student_id: studentId,
          marks: Number(studentMarks),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage(
        `Marks saved successfully. Grade: ${response.data.grade}`
      );
    } catch (err) {
      console.log("Failed to save marks:", err);

      setError(
        err.response?.data?.message ||
          "Failed to save marks."
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Enter Student Marks
        </h1>

        <p className="mt-4 text-gray-600">
          Loading students...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Enter Student Marks
      </h1>

      {message && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-5">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">
          Students
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-600">
            No students found.
          </p>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.student_id}
                className="border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-bold">
                    {student.full_name}
                  </h3>

                  <p className="text-gray-600">
                    Student ID: {student.student_id}
                  </p>

                  <p className="text-gray-600">
                    Subject: {student.subject_name}
                  </p>

                  <p className="text-gray-600">
                    Exam: {student.exam_type}
                  </p>

                  <p className="text-gray-600">
                    Maximum Marks: {student.max_marks}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max={student.max_marks}
                    value={marks[student.student_id] || ""}
                    onChange={(e) =>
                      handleMarksChange(
                        student.student_id,
                        e.target.value
                      )
                    }
                    placeholder="Enter marks"
                    className="border rounded-lg p-3 w-40"
                  />

                  <button
                    onClick={() =>
                      handleSaveMarks(student.student_id)
                    }
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Save Marks
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/exam-management")}
        className="mt-6 bg-gray-600 text-white px-5 py-3 rounded-lg hover:bg-gray-700"
      >
        Back to Exams
      </button>
    </div>
  );
}

export default ExamResults;