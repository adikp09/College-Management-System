const express = require("express");

const router = express.Router();

const {
  getAllSubjects,
} = require("../controllers/subjectController");

router.get("/all", getAllSubjects);

module.exports = router;