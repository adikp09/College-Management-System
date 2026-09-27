import { useEffect, useState } from "react";
import axios from "axios";

function Fees() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    student_id: "",
    fee_type: "",
    amount: "",
    due_date: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/students/all",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setStudents(response.data);
      } catch (error) {
        console.log("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/fees/create",
        form,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage(response.data.message);

      setForm({
        student_id: "",
        fee_type: "",
        amount: "",
        due_date: "",
      });
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to create fee"
      );
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Fee Management
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-6">
          Create Fee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          {/* Student */}
          <div>
            <label className="block mb-2 font-semibold">
              Student
            </label>

            <select
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Fee Type */}
          <div>
            <label className="block mb-2 font-semibold">
              Fee Type
            </label>

            <select
              name="fee_type"
              value={form.fee_type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">
                Select Fee Type
              </option>

              <option value="Tuition Fee">
                Tuition Fee
              </option>

              <option value="Exam Fee">
                Exam Fee
              </option>

              <option value="Library Fee">
                Library Fee
              </option>

              <option value="Hostel Fee">
                Hostel Fee
              </option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-2 font-semibold">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              min="1"
              placeholder="Enter amount"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block mb-2 font-semibold">
              Due Date
            </label>

            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="md:col-span-2">

            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
            >
              Create Fee
            </button>

          </div>

        </form>

        {message && (
          <p className="mt-4 font-semibold text-blue-700">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default Fees;