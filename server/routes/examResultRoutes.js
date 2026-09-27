const express = require("express");

const router = express.Router();

const {
  getStudentsForExam,
  saveMarks,
} = require("../controllers/examResultController");

// Get students for a particular exam
router.get(
  "/exam/:examId/students",
  getStudentsForExam
);

// Save / update student marks
router.post(
  "/marks",
  saveMarks
);

module.exports = router;