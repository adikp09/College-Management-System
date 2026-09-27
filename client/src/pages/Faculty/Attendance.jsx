import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Student/components/Sidebar";
import Topbar from "../Student/components/Topbar";

function FacultyAttendance() {
  const [studentId, setStudentId] = useState("");
const [students, setStudents] = useState([]);
const [history, setHistory] = useState([]);
const [historyStudent, setHistoryStudent] = useState("");
const [historySubject, setHistorySubject] = useState("");
const [historyDate, setHistoryDate] = useState("");
const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  useEffect(() => {
  const fetchStudents = async () => {
    try {
     const token = localStorage.getItem("facultyToken");

if (!token) {
  window.location.href = "/login";
  return;
}
      console.log("FACULTY TOKEN:", token);

      const response = await axios.get(
        "http://127.0.0.1:5000/api/students/all",
        {
          headers: {
           Authorization: "Bearer " + token,
          },
        }
      );

      setStudents(response.data);
      const historyResponse = await axios.get(
  "http://127.0.0.1:5000/api/attendance/history",
  {
    headers: {
      Authorization: "Bearer " + token,
    },
  }
);

setHistory(historyResponse.data);
    } catch (error) {
      console.log("Failed to fetch students:", error);
    }
  };

  fetchStudents();
}, []);


  const handleEdit = async (item) => {
  const newStatus =
    item.status === "Present" ? "Absent" : "Present";

  try {
    const token = localStorage.getItem("facultyToken");
    const response = await axios.put(
      `http://127.0.0.1:5000/api/attendance/${item.id}`,
      {
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessage(response.data.message);

    setHistory((prevHistory) =>
      prevHistory.map((record) =>
        record.id === item.id
          ? { ...record, status: newStatus }
          : record
      )
    );
  } catch (error) {
    console.log(error);

    setMessage(
      error.response?.data?.message ||
        "Failed to update attendance"
    );
  }
}; 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:5000/api/attendance/mark",
        {
          student_id: studentId,
          subject,
          attendance_date: date,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setMessageType("success");
      const historyResponse = await axios.get(
  "http://127.0.0.1:5000/api/attendance/history",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setHistory(historyResponse.data);

      setStudentId("");
      setSubject("");
      setDate("");
      setStatus("Present");
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to mark attendance"
      );
      setMessageType("error");
    }
  };

  return ( 
  <div className="flex min-h-screen bg-gray-100"> 
    <Sidebar /> 
 
    <div className="flex-1 min-w-0 overflow-x-hidden p-8"> 
      <Topbar name="Faculty" role="Faculty" /> 
 
      <h1 className="text-4xl font-bold mt-8 mb-8"> 
        Faculty Attendance 
      </h1> 
 
      <div className="max-w-2xl bg-white rounded-xl shadow-lg p-8"> 
 
        <form onSubmit={handleSubmit}> 
 
          {/* Student */} 
          <div className="mb-5"> 
            <label className="block font-semibold mb-2"> 
              Select Student 
            </label> 
 
            <select 
              value={studentId} 
              onChange={(e) => setStudentId(e.target.value)} 
              className="w-full border rounded-lg p-3" 
              required 
            > 
              <option value=""> 
                Select Student 
              </option> 
 
              {students.map((student) => ( 
                <option key={student.id} value={student.id}> 
                  {student.full_name} 
                </option> 
              ))} 
            </select> 
          </div> 
 
          {/* Subject */} 
          <div className="mb-5"> 
            <label className="block font-semibold mb-2"> 
              Subject 
            </label> 
 
            <select 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              className="w-full border rounded-lg p-3" 
              required 
            > 
              <option value=""> 
                Select Subject 
              </option> 
 
              <option value="Mathematics">Mathematics</option> 
              <option value="Python Programming">Python Programming</option> 
              <option value="Database Management">Database Management</option> 
              <option value="Operating System">Operating System</option> 
              <option value="Computer Networks">Computer Networks</option> 
            </select> 
          </div> 
 
          {/* Date */} 
          <div className="mb-5"> 
            <label className="block font-semibold mb-2"> 
              Attendance Date 
            </label> 
 
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="w-full border rounded-lg p-3" 
              required 
            /> 
          </div> 
 
          {/* Status */} 
          <div className="mb-6"> 
            <label className="block font-semibold mb-2"> 
              Status 
            </label> 
 
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="w-full border rounded-lg p-3" 
            > 
              <option value="Present">Present</option> 
              <option value="Absent">Absent</option> 
            </select> 
          </div> 
 
          <button 
            type="submit" 
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800" 
          > 
            Mark Attendance 
          </button> 
 
        </form> 
 
        {message && (
  <div
    className={`mt-6 p-4 rounded-lg font-semibold ${
      messageType === "success"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {message}
  </div>
)} 
 
      </div> 
          {/* Attendance History */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">

       <div className="mt-8 w-full min-w-0 bg-white rounded-xl shadow-lg p-6">
  <h2 className="text-2xl font-bold">
    Attendance History
  </h2>

  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
  {history.filter((item) => {
    const studentMatch =
      historyStudent === "" ||
      String(item.student_id) === String(historyStudent);

    const subjectMatch =
      historySubject === "" ||
      item.subject === historySubject;

    const dateMatch =
      historyDate === "" ||
      String(item.attendance_date).slice(0, 10) === historyDate;

    return studentMatch && subjectMatch && dateMatch;
  }).length} Records
</span>
</div>
{/* Attendance Summary */}
<div className="grid md:grid-cols-3 gap-4 mb-6">

  {/* Total Records */}
  <div className="bg-blue-50 rounded-xl p-5">
    <h3 className="text-gray-600 font-semibold">
      Total Records
    </h3>

    <p className="text-3xl font-bold text-blue-700 mt-2">
      {history.filter((item) => {
        const studentMatch =
          historyStudent === "" ||
          String(item.student_id) === String(historyStudent);

        const subjectMatch =
  historySubject === "" ||
  item.subject === historySubject;

const dateMatch =
  historyDate === "" ||
  String(item.attendance_date).slice(0, 10) === historyDate;
return studentMatch && subjectMatch && dateMatch;
      }).length}
    </p>
  </div>

  {/* Present */}
  <div className="bg-green-50 rounded-xl p-5">
    <h3 className="text-gray-600 font-semibold">
      Present
    </h3>

    <p className="text-3xl font-bold text-green-700 mt-2">
      {history.filter((item) => {
        const studentMatch =
          historyStudent === "" ||
          String(item.student_id) === String(historyStudent);

        const subjectMatch =
  historySubject === "" ||
  item.subject === historySubject;

const dateMatch =
  historyDate === "" ||
  String(item.attendance_date).slice(0, 10) === historyDate;
return (
  studentMatch &&
  subjectMatch &&
  dateMatch &&
  item.status === "Present"
);
      }).length}
    </p>
  </div>

  {/* Absent */}
  <div className="bg-red-50 rounded-xl p-5">
    <h3 className="text-gray-600 font-semibold">
      Absent
    </h3>

    <p className="text-3xl font-bold text-red-700 mt-2">
      {history.filter((item) => {
        const studentMatch =
          historyStudent === "" ||
          String(item.student_id) === String(historyStudent);

        const subjectMatch =
  historySubject === "" ||
  item.subject === historySubject;

const dateMatch =
  historyDate === "" ||
  String(item.attendance_date).slice(0, 10) === historyDate;
return (
  studentMatch &&
  subjectMatch &&
  dateMatch &&
  item.status === "Absent"
);
      }).length}
    </p>
  </div>

</div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">

  {/* Student Filter */}
  <select
    value={historyStudent}
    onChange={(e) => setHistoryStudent(e.target.value)}
    className="w-full border rounded-lg p-3"
  >
    <option value="">
      All Students
    </option>

    {students.map((student) => (
      <option key={student.id} value={student.id}>
        {student.full_name}
      </option>
    ))}
  </select>

  {/* Subject Filter */}
  <select
    value={historySubject}
    onChange={(e) => setHistorySubject(e.target.value)}
    className="w-full border rounded-lg p-3"
  >
    <option value="">
      All Subjects
    </option>

    <option value="Mathematics">
      Mathematics
    </option>

    <option value="Python Programming">
      Python Programming
    </option>

    <option value="Database Management">
      Database Management
    </option>

    <option value="Operating System">
      Operating System
    </option>

    <option value="Computer Networks">
      Computer Networks
    </option>
  </select>
  {/* Date Filter */}
<input
  type="date"
  value={historyDate}
  onChange={(e) => setHistoryDate(e.target.value)}
  className="w-full border rounded-lg p-3"
/>

</div>
<button
  type="button"
  onClick={() => {
  setHistoryStudent("");
  setHistorySubject("");
  setHistoryDate("");
}}
  className="mb-6 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
>
  Clear Filters
</button>

        {history.filter((item) => {
  const studentMatch =
    historyStudent === "" ||
    String(item.student_id) === String(historyStudent);

  const subjectMatch =
  historySubject === "" ||
  item.subject === historySubject;

const dateMatch =
  historyDate === "" ||
  String(item.attendance_date).slice(0, 10) === historyDate
return studentMatch && subjectMatch && dateMatch;
}).length === 0 ? (

  <p className="text-gray-500 text-center py-6">
    No attendance records match the selected filters.
  </p>

) : (

  <div className="overflow-x-auto">
    <table className="w-full min-w-[700px]">

      <thead>
        <tr className="border-b">
          <th className="text-left p-3">
            Student
          </th>

          <th className="text-left p-3">
            Subject
          </th>

          <th className="text-center p-3">
            Date
          </th>

          <th className="text-center p-3">
            Status
          </th>
          <th className="text-center p-3">
  Action
</th>
        </tr>
      </thead>

      <tbody>
        {history
          .filter((item) => {
            const studentMatch =
              historyStudent === "" ||
              String(item.student_id) === String(historyStudent);

            const subjectMatch =
  historySubject === "" ||
  item.subject === historySubject;

const dateMatch =
  historyDate === "" ||
  item.attendance_date === historyDate;

return studentMatch && subjectMatch && dateMatch;
          })
          .map((item) => (
            <tr
              key={item.id}
              className="border-b"
            >

              <td className="p-3">
                {item.full_name}
              </td>

              <td className="p-3">
                {item.subject}
              </td>

              <td className="text-center p-3">
  {(() => {
  const datePart = String(item.attendance_date).slice(0, 10);
  const [year, month, day] = datePart.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[Number(month) - 1]} ${year}`;
})()}
</td>
<td className="text-center p-3">
  <button
    type="button"
    onClick={() => handleEdit(item)}
    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200"
  >
    Edit
  </button>
</td>

              <td className="text-center p-3">
                <span
                  className={
                    item.status === "Present"
                      ? "px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700"
                      : "px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700"
                  }
                >
                  {item.status}
                </span>
              </td>

            </tr>
          ))}
      </tbody>

    </table>
  </div>
)}
      </div>      
  </div> 
  </div>
);
}
export default FacultyAttendance;