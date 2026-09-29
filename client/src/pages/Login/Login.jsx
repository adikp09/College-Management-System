import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [loginType, setLoginType] = useState("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ================= STUDENT LOGIN =================

      if (loginType === "student") {
        const response = await axios.post(
       `${API_URL}/api/students/login`,
          {
            email,
            password,
          }
        );

        // Save student token
        localStorage.setItem(
          "token",
          response.data.token
        );

        console.log(
          "STUDENT TOKEN:",
          response.data.token
        );

        alert(response.data.message);

        navigate("/student-dashboard");
      }

     // ================= FACULTY LOGIN =================

else if (loginType === "faculty") {
  const response = await axios.post(
    `${API_URL}/api/faculty/login`,
    {
      email,
      password,
    }
  );

  // Save faculty token
  localStorage.setItem(
    "facultyToken",
    response.data.token
  );

  // Save faculty information
  localStorage.setItem(
    "faculty",
    JSON.stringify(response.data.faculty)
  );

  console.log(
    "FACULTY TOKEN:",
    response.data.token
  );

  alert(response.data.message);

  navigate("/faculty-dashboard");
}

// ================= ADMIN LOGIN =================

else {
  const response = await axios.post(
    `${API_URL}/api/admin/login`,
    {
      email,
      password,
    }
  );

  // Save admin token
  localStorage.setItem(
    "adminToken",
    response.data.token
  );

  console.log(
    "ADMIN TOKEN:",
    response.data.token
  );

  alert(response.data.message);

  navigate("/admin/dashboard");
}

    } catch (error) {
      console.log("Login Error:", error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">

        {/* Heading */}

        <h1 className="text-3xl font-bold text-center">
  {loginType === "student"
    ? "Student Login"
    : loginType === "faculty"
    ? "Faculty Login"
    : "Admin Login"}
</h1>

        <p className="text-center text-gray-500 mt-2">
          Login to continue
        </p>

        {/* ================= LOGIN TYPE ================= */}

        <div className="grid grid-cols-3 gap-3 mt-7">

          <button
            type="button"
            onClick={() => setLoginType("student")}
            className={`py-3 rounded-lg font-semibold transition ${
              loginType === "student"
                ? "bg-blue-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Student
          </button>
          <button
  type="button"
  onClick={() => setLoginType("faculty")}
  className={`py-3 rounded-lg font-semibold transition ${
    loginType === "faculty"
      ? "bg-green-700 text-white"
      : "bg-gray-100 text-gray-700"
  }`}
>
  Faculty
</button>

          <button
            type="button"
            onClick={() => setLoginType("admin")}
            className={`py-3 rounded-lg font-semibold transition ${
              loginType === "admin"
                ? "bg-purple-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Admin
          </button>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
              className={`w-full text-white py-4 rounded-lg font-bold transition ${
  loading
    ? "bg-gray-400 cursor-not-allowed"
    : loginType === "student"
    ? "bg-blue-700 hover:bg-blue-800"
    : loginType === "faculty"
    ? "bg-green-700 hover:bg-green-800"
    : "bg-purple-700 hover:bg-purple-800"
}`}
          >
            {loading
  ? "Logging In..."
  : loginType === "student"
  ? "Login as Student"
  : loginType === "faculty"
  ? "Login as Faculty"
  : "Login as Admin"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;