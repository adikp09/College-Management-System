const adminMiddleware = require("../middleware/adminMiddleware");
const express = require("express");
const router = express.Router();

const {
  submitPayment,
  getPaymentRequests,
  approvePayment,
  rejectPayment,
} = require("../controllers/paymentController");

const verifyToken = require("../middleware/authMiddleware");

// Student submits payment
router.post(
  "/submit",
  verifyToken,
  submitPayment
);

// Get all payment requests
router.get(
  "/requests",
  verifyToken,
  adminMiddleware,
  getPaymentRequests
);

router.put(
  "/approve/:id",
  verifyToken,
  adminMiddleware,
  approvePayment
);

router.put(
  "/reject/:id",
  verifyToken,
  adminMiddleware,
  rejectPayment
);

module.exports = router;