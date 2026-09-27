const express = require("express");

const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getDashboardStats,
} = require("../controllers/adminController");

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllStudents,
} = require("../controllers/studentController");

// ================= ADMIN REGISTER =================

router.post("/register", registerAdmin);

// ================= ADMIN LOGIN =================

router.post("/login", loginAdmin);

// ================= ADMIN DASHBOARD STATS =================

router.get(
  "/dashboard-stats",
  verifyToken,
  adminMiddleware,
  getDashboardStats
);

// ================= ADMIN STUDENTS =================

router.get(
  "/students",
  verifyToken,
  adminMiddleware,
  getAllStudents
);

module.exports = router;