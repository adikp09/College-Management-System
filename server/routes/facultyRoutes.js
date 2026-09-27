const express = require("express");

const router = express.Router();

const {
  getAllFaculty,
  addFaculty,
  deleteFaculty,
  loginFaculty,
  resetFacultyPassword,
} = require("../controllers/facultyController");

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ================= FACULTY LOGIN =================

router.post("/login", loginFaculty);

// ================= ADMIN FACULTY ROUTES =================

// Get all faculty
router.get(
  "/",
  verifyToken,
  adminMiddleware,
  getAllFaculty
);

// Add faculty
router.post(
  "/",
  verifyToken,
  adminMiddleware,
  addFaculty
);

// Delete faculty
router.delete(
  "/:id",
  verifyToken,
  adminMiddleware,
  deleteFaculty
);

// ================= RESET FACULTY PASSWORD =================

router.put(
  "/:id/password",
  verifyToken,
  adminMiddleware,
  resetFacultyPassword
);
module.exports = router;