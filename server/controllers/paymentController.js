const db = require("../config/db");

// ================= SUBMIT PAYMENT =================

const submitPayment = (req, res) => {
  const { fee_id, amount, transaction_id } = req.body;

  const student_id = req.user.id;

  // Validation
  if (!fee_id || !amount || !transaction_id) {
    return res.status(400).json({
      message: "Fee ID, amount and transaction ID are required",
    });
  }

  // Check whether fee belongs to logged-in student
  const feeSql = `
    SELECT id, amount, paid_amount
    FROM fees
    WHERE id = ? AND student_id = ?
  `;

  db.query(feeSql, [fee_id, student_id], (err, results) => {
    if (err) {
      console.log("Fee Check Error:", err);

      return res.status(500).json({
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Fee record not found",
      });
    }

    const fee = results[0];

    const pendingAmount =
      Number(fee.amount) - Number(fee.paid_amount);

    // Prevent invalid payment amount
    if (Number(amount) > pendingAmount) {
      return res.status(400).json({
        message: "Payment amount cannot be greater than pending amount",
      });
    }

    // Check duplicate transaction ID
    const checkSql = `
      SELECT id
      FROM fee_payments
      WHERE transaction_id = ?
    `;

    db.query(checkSql, [transaction_id], (err, existing) => {
      if (err) {
        console.log("Transaction Check Error:", err);

        return res.status(500).json({
          message: "Database error",
        });
      }

      if (existing.length > 0) {
        return res.status(400).json({
          message: "Transaction ID already submitted",
        });
      }

      // Save payment request
      const insertSql = `
        INSERT INTO fee_payments
        (fee_id, student_id, amount, transaction_id, payment_method, status)
        VALUES (?, ?, ?, ?, 'PhonePe', 'Pending')
      `;

      db.query(
        insertSql,
        [
          fee_id,
          student_id,
          amount,
          transaction_id,
        ],
        (err, result) => {
          if (err) {
            console.log("Payment Insert Error:", err);

            return res.status(500).json({
              message: "Failed to submit payment",
            });
          }

          res.status(201).json({
            message: "Payment submitted successfully",
            payment_id: result.insertId,
            status: "Pending",
          });
        }
      );
    });
  });
};


// =====================================================
// GET PAYMENT REQUESTS
// =====================================================

const getPaymentRequests = (req, res) => {
  const sql = `
    SELECT
      fp.id,
      fp.fee_id,
      fp.student_id,
      fp.amount,
      fp.transaction_id,
      fp.payment_method,
      fp.status,
      fp.created_at,
      s.full_name,
      s.email,
      f.fee_type
    FROM fee_payments fp
    JOIN students s ON fp.student_id = s.id
    JOIN fees f ON fp.fee_id = f.id
    ORDER BY fp.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Payment Requests Error:", err);

      return res.status(500).json({
        message: "Failed to fetch payment requests",
      });
    }

    res.json(results);
  });
};


// =====================================================
// APPROVE PAYMENT
// =====================================================

const approvePayment = (req, res) => {
  const paymentId = req.params.id;

  // Get payment information
  const paymentSql = `
    SELECT
      fp.id,
      fp.fee_id,
      fp.student_id,
      fp.amount,
      fp.status,
      f.amount AS total_fee,
      f.paid_amount
    FROM fee_payments fp
    JOIN fees f ON fp.fee_id = f.id
    WHERE fp.id = ?
  `;

  db.query(paymentSql, [paymentId], (err, results) => {
    if (err) {
      console.log("Payment Fetch Error:", err);

      return res.status(500).json({
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Payment request not found",
      });
    }

    const payment = results[0];

    // Already processed
    if (payment.status !== "Pending") {
      return res.status(400).json({
        message: "Payment has already been processed",
      });
    }

    const newPaidAmount =
      Number(payment.paid_amount) +
      Number(payment.amount);

    const newStatus =
      newPaidAmount >= Number(payment.total_fee)
        ? "Paid"
        : "Partial";

    // Update fee
    const updateFeeSql = `
      UPDATE fees
      SET
        paid_amount = ?,
        status = ?
      WHERE id = ?
    `;

    db.query(
      updateFeeSql,
      [
        newPaidAmount,
        newStatus,
        payment.fee_id,
      ],
      (err) => {
        if (err) {
          console.log("Fee Update Error:", err);

          return res.status(500).json({
            message: "Failed to update fee",
          });
        }

        // Update payment status
        const updatePaymentSql = `
          UPDATE fee_payments
          SET status = 'Approved'
          WHERE id = ?
        `;

        db.query(
          updatePaymentSql,
          [paymentId],
          (err) => {
            if (err) {
              console.log(
                "Payment Status Update Error:",
                err
              );

              return res.status(500).json({
                message:
                  "Fee updated but payment status failed",
              });
            }

            res.json({
              message: "Payment approved successfully",
              payment_status: "Approved",
              fee_status: newStatus,
              paid_amount: newPaidAmount,
            });
          }
        );
      }
    );
  });
};


// =====================================================
// REJECT PAYMENT
// =====================================================

const rejectPayment = (req, res) => {
  const paymentId = req.params.id;

  const sql = `
    UPDATE fee_payments
    SET status = 'Rejected'
    WHERE id = ? AND status = 'Pending'
  `;

  db.query(sql, [paymentId], (err, result) => {
    if (err) {
      console.log("Reject Payment Error:", err);

      return res.status(500).json({
        message: "Failed to reject payment",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Pending payment not found",
      });
    }

    res.json({
      message: "Payment rejected successfully",
      status: "Rejected",
    });
  });
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  submitPayment,
  getPaymentRequests,
  approvePayment,
  rejectPayment,
};