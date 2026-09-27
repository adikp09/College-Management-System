const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {
  createExam,
  getExams,
  publishExam,
} = require("../controllers/examController");


// Create Exam
router.post("/create", verifyToken, createExam);


// Get All Exams
router.get("/", verifyToken, getExams);


// Publish Exam
router.put("/:id/publish", verifyToken, publishExam);


module.exports = router;