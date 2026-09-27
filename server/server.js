require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const db = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const examRoutes = require("./routes/examRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const resultRoutes = require("./routes/resultRoutes");
const examResultRoutes = require("./routes/examResultRoutes");
const feeRoutes = require("./routes/feeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/exam-results", examResultRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("CampusHub Backend is Running...");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});