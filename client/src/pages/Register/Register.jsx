import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};

  const fullName = e.target.fullName.value.trim();
  const email = e.target.email.value.trim();
  const mobile = e.target.mobile.value.trim();
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  if (!fullName) {
    newErrors.fullName = "Full Name is required";
  }

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid Email";
  }

  if (!mobile) {
    newErrors.mobile = "Mobile Number is required";
  } else if (mobile.length !== 10) {
    newErrors.mobile = "Mobile Number must be 10 digits";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 8) {
    newErrors.password = "Minimum 8 characters";
  }

  if (confirmPassword !== password) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    alert("Registration Successful");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white items-center justify-center p-16">

        <div className="max-w-md">

          <h1 className="text-6xl font-extrabold leading-tight">
                      Join
            <br />
            Berozgar Institute of Management Studies 🎓
          </h1>

          <p className="mt-8 text-xl leading-8 text-blue-100">
            Create your account and access the complete Berozgar Institute of Management Studies.
          </p>

          <div className="mt-10 space-y-4">
            <div>✅ Student Portal</div>
            <div>✅ Faculty Dashboard</div>
            <div>✅ Online Attendance</div>
            <div>✅ Results & Notices</div>
          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-10">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[500px]">

          <h2 className="text-4xl font-bold text-center">
            Register
          </h2>

          <p className="text-center text-gray-500 mt-3">
  Create your Berozgar Institute of Management Studies account.
</p>

<div className="mt-6">

  <p className="text-center font-semibold text-blue-700 mb-4">
  Select Role
</p>

  <div className="flex gap-3">

    <button
      type="button"
      className="flex-1 bg-blue-700 text-white py-3 rounded-xl font-semibold"
    >
      Student
    </button>

    <button
      type="button"
      className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-semibold"
    >
      Faculty
    </button>

  </div>
</div>

          <form
  className="mt-8 space-y-5"
  onSubmit={handleSubmit}
>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && (
  <p className="text-red-500 text-sm">
    {errors.fullName}
  </p>
)}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
  <p className="text-red-500 text-sm">
    {errors.email}
  </p>
)}

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Nimber"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mobile && (
  <p className="text-red-500 text-sm">
    {errors.mobile}
  </p>
)}

 <select
  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select Department</option>
  <option>Computer Science Engineering (CSE)</option>
  <option>Information Technology (IT)</option>
  <option>Mechanical Engineering (ME)</option>
  <option>Civil Engineering (CE)</option>
  <option>Electrical Engineering (EE)</option>
  <option>Electronics & Communication (ECE)</option>
  <option>MBA</option>
  <option>BCA</option>
</select>


  <select
  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select Course</option>
  <option>B.Tech</option>
  <option>M.Tech</option>
  <option>BCA</option>
  <option>MCA</option>
  <option>BBA</option>
  <option>MBA</option>
</select>

<select
  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
>
  <option>Select Year</option>
  <option>1st Year</option>
  <option>2nd Year</option>
  <option>3rd Year</option>
  <option>4th Year</option>
</select>

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
  <p className="text-red-500 text-sm">
    {errors.password}
  </p>
)}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
  <p className="text-red-500 text-sm">
    {errors.confirmPassword}
  </p>
)}

            <button
              className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition"
            >
              Register
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-700 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
            </form>


        </div>

      </div>

    </div>
  );
}

export default Register;