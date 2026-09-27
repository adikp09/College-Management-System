import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, GraduationCap, User } from "lucide-react";

function ProfileCard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
  console.log("Profile API Called");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:5000/api/students/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudent(response.data);
    } catch (error) {
      console.log("Profile API Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  fetchProfile();
}, []);

  if (!student) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col items-center">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Student"
          className="w-24 h-24 rounded-full border-4 border-blue-600"
        />

        <h2 className="text-2xl font-bold mt-4">
          {student.full_name}
        </h2>

        <p className="text-gray-500">
          {student.course} • {student.department}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <User size={20} className="text-blue-600" />
          <span>{student.year}</span>
        </div>

        <div className="flex items-center gap-3">
          <GraduationCap size={20} className="text-blue-600" />
          <span>{student.course}</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail size={20} className="text-blue-600" />
          <span>{student.email}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;