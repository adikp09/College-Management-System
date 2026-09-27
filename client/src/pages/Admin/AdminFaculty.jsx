import { useEffect, useState } from "react";
import axios from "axios";

function AdminFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [resetFaculty, setResetFaculty] = useState(null);
const [newPassword, setNewPassword] = useState("");
const [resetLoading, setResetLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    password: "",
  });

  // ================= GET ALL FACULTY =================

  const fetchFaculty = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        "http://127.0.0.1:5000/api/faculty",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setFaculty(response.data);
    } catch (error) {
      console.log("Faculty API Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load faculty"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // ================= FORM INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD FACULTY =================

  const handleAddFaculty = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.post(
        "http://127.0.0.1:5000/api/faculty",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);

      setFormData({
        full_name: "",
        email: "",
        mobile: "",
        department: "",
        designation: "",
        password: "",
      });

      setShowForm(false);

      fetchFaculty();
    } catch (error) {
      console.log("Add Faculty Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add faculty"
      );
    }
  };

  // ================= DELETE FACULTY =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this faculty?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.delete(
        `http://127.0.0.1:5000/api/faculty/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      alert(response.data.message);

      fetchFaculty();
    } catch (error) {
      console.log("Delete Faculty Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete faculty"
      );
    }
  };
  // ================= RESET FACULTY PASSWORD =================

const handleResetPassword = async () => {
  if (!newPassword) {
    alert("Please enter a new password");
    return;
  }

  if (newPassword.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    setResetLoading(true);

    const token = localStorage.getItem("adminToken");

    const response = await axios.put(
      `http://127.0.0.1:5000/api/faculty/${resetFaculty.id}/password`,
      {
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    setResetFaculty(null);
    setNewPassword("");
  } catch (error) {
    console.log("Reset Password Error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to reset password"
    );
  } finally {
    setResetLoading(false);
  }
};

  // ================= SEARCH =================

  const filteredFaculty = faculty.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.full_name?.toLowerCase().includes(text) ||
      item.email?.toLowerCase().includes(text) ||
      item.department?.toLowerCase().includes(text) ||
      item.designation?.toLowerCase().includes(text)
    );
  });

  // ================= UI =================

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Faculty
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all faculty members
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {showForm ? "Close Form" : "+ Add Faculty"}
        </button>

      </div>

      {/* ================= ADD FACULTY FORM ================= */}

      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Add New Faculty
          </h2>

          <form
            onSubmit={handleAddFaculty}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="md:col-span-2">

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Add Faculty
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ================= SEARCH ================= */}

      <div className="bg-white rounded-xl shadow-lg p-5 mb-6">

        <input
          type="text"
          placeholder="Search faculty by name, email, department or designation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* ================= FACULTY TABLE ================= */}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading faculty...
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No faculty found.
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
                    Faculty
                  </th>

                  <th className="text-left px-6 py-4">
                    Email
                  </th>

                  <th className="text-left px-6 py-4">
                    Mobile
                  </th>

                  <th className="text-left px-6 py-4">
                    Department
                  </th>

                  <th className="text-left px-6 py-4">
                    Designation
                  </th>

                  <th className="text-left px-6 py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredFaculty.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-4 font-semibold">
                      {item.id}
                    </td>

                    <td className="px-6 py-4">

                      <div className="font-semibold text-gray-800">
                        {item.full_name}
                      </div>

                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {item.email}
                    </td>

                    <td className="px-6 py-4">
                      {item.mobile || "-"}
                    </td>

                    <td className="px-6 py-4">
                      {item.department || "-"}
                    </td>

                    <td className="px-6 py-4">
                      {item.designation || "-"}
                    </td>

                    <td className="px-6 py-4">

  <div className="flex gap-2">

    <button
      onClick={() => {
        setResetFaculty(item);
        setNewPassword("");
      }}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition"
    >
      Reset Password
    </button>

    <button
      onClick={() => handleDelete(item.id)}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
    >
      Delete
    </button>

  </div>

</td>
                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
      {/* ================= RESET PASSWORD MODAL ================= */}

{resetFaculty && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Reset Password
      </h2>

      <p className="text-gray-600 mb-5">
        Reset password for{" "}
        <span className="font-semibold text-gray-800">
          {resetFaculty.full_name}
        </span>
      </p>

      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="text-sm text-gray-500 mb-5">
        Password must be at least 6 characters.
      </p>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={() => {
            setResetFaculty(null);
            setNewPassword("");
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleResetPassword}
          disabled={resetLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {resetLoading ? "Resetting..." : "Reset Password"}
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default AdminFaculty;