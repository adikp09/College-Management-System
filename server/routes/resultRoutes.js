const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const resultController = require("../controllers/resultController");

const router = express.Router();

router.get("/", verifyToken, resultController.getStudentResults);

module.exports = router;