import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Exams() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);

  const [form, setForm] = useState({
    subject_id: "",
    exam_type: "",
    exam_date: "",
    max_marks: 100,
  });

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("facultyToken");

  // Fetch subjects
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/subjects/all",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setSubjects(response.data);
    } catch (error) {
      console.log("Failed to fetch subjects:", error);
    }
  };

  // Fetch exams
  const fetchExams = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/exams",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setExams(response.data);
    } catch (error) {
      console.log("Failed to fetch exams:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchExams();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create exam
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:5000/api/exams/create",
        form,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage("Exam created successfully.");

      setForm({
        subject_id: "",
        exam_type: "",
        exam_date: "",
        max_marks: 100,
      });

      fetchExams();
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to create exam."
      );
    }
  };

  // Publish exam
  const publishExam = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/exams/${id}/publish`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage("Exam published successfully.");

      fetchExams();
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to publish exam."
      );
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Exam Management
      </h1>

      {/* Create Exam */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-xl font-bold mb-6">
          Create Exam
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          {/* Subject */}
          <div>
            <label className="block mb-2 font-semibold">
              Subject
            </label>

            <select
              name="subject_id"
              value={form.subject_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">
                Select Subject
              </option>

              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.subject_name} (
                  {subject.subject_code})
                </option>
              ))}
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="block mb-2 font-semibold">
              Exam Type
            </label>

            <select
              name="exam_type"
              value={form.exam_type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select Exam Type</option>

<option value="Mid Term">Mid Term</option>

<option value="End Term">End Term</option>

<option value="Internal">Internal</option>

<option value="Practical">Practical</option>
            </select>
          </div>

          {/* Exam Date */}
          <div>
            <label className="block mb-2 font-semibold">
              Exam Date
            </label>

            <input
              type="date"
              name="exam_date"
              value={form.exam_date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Max Marks */}
          <div>
            <label className="block mb-2 font-semibold">
              Maximum Marks
            </label>

            <input
              type="number"
              name="max_marks"
              value={form.max_marks}
              onChange={handleChange}
              min="1"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div className="md:col-span-2">

            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
            >
              Create Exam
            </button>

          </div>

        </form>

        {message && (
          <p className="mt-4 font-semibold text-blue-700">
            {message}
          </p>
        )}

      </div>

      {/* Existing Exams */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-6">
          Exams
        </h2>

        {exams.length === 0 ? (
          <p className="text-gray-500">
            No exams created yet.
          </p>
        ) : (
          <div className="space-y-4">

            {exams.map((exam) => (

              <div
                key={exam.id}
                className="border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div>

                  <h3 className="text-lg font-bold">
                    {exam.subject_name}
                  </h3>

                  <p className="text-gray-600">
                    Code: {exam.subject_code}
                  </p>

                  <p className="text-gray-600">
                    Faculty: {exam.faculty_name}
                  </p>

                  <p className="text-gray-600">
                    Exam: {exam.exam_type}
                  </p>

                  <p className="text-gray-600">
                    Date: {exam.exam_date}
                  </p>

                  <p className="text-gray-600">
                    Maximum Marks: {exam.max_marks}
                  </p>

                </div>

                <div>

                  <div className="flex flex-col gap-3">

  <button
    onClick={() =>
      navigate(`/exam-results/${exam.id}`)
    }
    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
  >
    Enter Marks
  </button>

  {exam.status === "published" ? (

    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-center">
      Published
    </span>

  ) : (

    <button
      onClick={() =>
        publishExam(exam.id)
      }
      className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
    >
      Publish Result
    </button>

  )}

</div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Exams;