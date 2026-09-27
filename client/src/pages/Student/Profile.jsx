import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function Profile() {
  const handleUpdateProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      "http://127.0.0.1:5000/api/students/profile",
      student,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    setIsEditing(false);
  } catch (error) {
    console.log(error);

    alert("Profile Update Failed");
  }
};
  console.log("Profile Component Loaded");
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);3
  console.log("Student State:", student);

  useEffect(() => {
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
      console.log("Response Data:", response.data);
    } catch (error) {
      console.log("Profile Error:", error);

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

const handlePhotoUpload = async () => {
  if (!selectedFile) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("profile_photo", selectedFile);

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://127.0.0.1:5000/api/students/upload-profile-photo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(response.data.message);
  } catch (error) {
    console.log(error);
    alert("Photo Upload Failed");
  }
};

  if (!student) {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Loading...</h1>
    </div>
  );
}
console.log(student);
console.log("Profile Photo =", student?.profile_photo);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1>Profile Page</h1>
        {/* <pre>{JSON.stringify(student, null, 2)}</pre> */}
        <Topbar />

        <h1 className="text-4xl font-bold mt-8">
          Student Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <div className="flex flex-col items-center">
            <img
  src={
    student.profile_photo
      ? `http://127.0.0.1:5000/uploads/${student.profile_photo}`
      : "https://i.pravatar.cc/150?img=12"
  }
  alt="Student"
  className="w-32 h-32 rounded-full border-4 border-blue-700 object-cover object-top"
/>
<input
  type="file"
  accept="image/*"
  onChange={(e) => setSelectedFile(e.target.files[0])}
  className="mt-4"
/>
<button
  onClick={handlePhotoUpload}
  className="mt-4 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
>
  Upload Photo
</button>

            <h2 className="text-3xl font-bold mt-4">
              {student.full_name}
            </h2>

            <p className="text-gray-500">
              {student.course} • {student.department}
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="font-semibold">
                Full Name
              </label>

              <input
  value={student.full_name}
  readOnly={!isEditing}
  onChange={(e) =>
    setStudent({
      ...student,
      full_name: e.target.value,
    })
  }
  className="w-full mt-2 border rounded-lg p-3"
/>
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <input
  value={student.email}
  readOnly={!isEditing}
  onChange={(e) =>
    setStudent({
      ...student,
      email: e.target.value,
    })
  }
  className="w-full mt-2 border rounded-lg p-3"
/>
            </div>

            <div>
              <label className="font-semibold">
                Department
              </label>

              <input
  value={student.department}
  readOnly={!isEditing}
  onChange={(e) =>
    setStudent({
      ...student,
      department: e.target.value,
    })
  }
  className="w-full mt-2 border rounded-lg p-3"
/>
            </div>

            <div>
              <label className="font-semibold">
                Course
              </label>

              <input
  value={student.course}
  readOnly={!isEditing}
  onChange={(e) =>
    setStudent({
      ...student,
      course: e.target.value,
    })
  }
  className="w-full mt-2 border rounded-lg p-3"
/>
            </div>

            <div>
              <label className="font-semibold">
                Year
              </label>

              <input
  value={student.year}
  readOnly={!isEditing}
  onChange={(e) =>
    setStudent({
      ...student,
      year: e.target.value,
    })
  }
  className="w-full mt-2 border rounded-lg p-3"
/>
            </div>

          </div>

          <div className="mt-8 flex gap-4">

  <button
    onClick={() => setIsEditing(!isEditing)}
    className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800"
  >
    {isEditing ? "Cancel" : "Edit Profile"}
  </button>

  {isEditing && (
    <button
  onClick={handleUpdateProfile}
  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
>
  Save Changes
</button>
  )}

</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;