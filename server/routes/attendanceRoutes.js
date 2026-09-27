const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
  getAttendance,
  markAttendance,
  getAttendanceHistory,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");
const router = express.Router();

router.get("/", verifyToken, getAttendance);
router.post("/mark", verifyToken, markAttendance);
router.get("/history", verifyToken, getAttendanceHistory);
router.put("/:id", verifyToken, updateAttendance);
router.delete("/:id", verifyToken, deleteAttendance);

module.exports = router;