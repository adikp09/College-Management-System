import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import StudentDashboard from "../pages/Student/StudentDashboard";
import PaymentRequests from "../pages/Admin/PaymentRequests";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Profile from "../pages/Student/Profile";
import Attendance from "../pages/Student/Attendance";
import FacultyAttendance from "../pages/Faculty/Attendance";
import Exams from "../pages/Faculty/Exams";
import Subjects from "../pages/Student/Subjects";
import Results from "../pages/Student/result";
import ExamResults from "../pages/Faculty/ExamResults";
import FacultyFees from "../pages/Faculty/Fees";
import StudentFees from "../pages/Student/Fees";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminStudents from "../pages/Admin/AdminStudents";
import AdminFaculty from "../pages/Admin/AdminFaculty";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
function AppRoutes() {
  return (
    <Routes>

  <Route path="/" element={<Home />} />

  <Route path="/login" element={<Login />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/attendance" element={<Attendance />} />
  <Route path="/subjects" element={<Subjects />} />
  <Route path="/results" element={<Results />} />
  <Route path="/faculty-attendance" element={<FacultyAttendance />} />
  <Route
  path="/student-dashboard"
  element={<StudentDashboard />}
/>
<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
<Route
  path="/admin/students"
  element={<AdminStudents />}
/>
<Route
  path="/admin/faculty"
  element={<AdminFaculty />}
/>
<Route
  path="/faculty-dashboard"
  element={<FacultyDashboard />}
/>
<Route
  path="/faculty-attendance"
  element={<FacultyAttendance />}
/>
<Route
  path="/exam-results/:examId"
  element={<ExamResults />}
/>
<Route
  path="/fees"
  element={<StudentFees />}
/>

<Route
  path="/faculty-exams"
  element={<Exams />}
/>
<Route
  path="/faculty-fees"
  element={<FacultyFees />}
/>
<Route 
  path="/exam-management" 
  element={<Exams />} 
/>

  <Route path="/register"
   element={<Register />}
   />

<Route
  path="/admin/payment-requests"
  element={<PaymentRequests />}
/>
</Routes>
  );
}

export default AppRoutes;