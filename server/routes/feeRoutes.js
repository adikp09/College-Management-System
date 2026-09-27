const express = require("express");

const verifyToken = require("../middleware/authMiddleware");

const {
  getMyFees,
  createFee,
} = require("../controllers/feeController");

const router = express.Router();

// Student fees
router.get("/my", verifyToken, getMyFees);

// Create fee
router.post("/create", verifyToken, createFee);

module.exports = router;