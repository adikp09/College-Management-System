const db = require("../config/db");

// Get fees for logged-in student
const getMyFees = (req, res) => {
  const sql = `
    SELECT
      id,
      fee_type,
      amount,
      paid_amount,
      due_date,
      status,
      created_at
    FROM fees
    WHERE student_id = ?
    ORDER BY due_date ASC, id DESC
  `;

  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      console.log("Get Fees Error:", err);

      return res.status(500).json({
        message: "Failed to fetch fees",
      });
    }

    res.status(200).json(results);
  });
};


// Create fee record
const createFee = (req, res) => {
  const {
    student_id,
    fee_type,
    amount,
    due_date,
  } = req.body;

  if (!student_id || !fee_type || !amount) {
    return res.status(400).json({
      message: "Student, fee type and amount are required",
    });
  }

  const sql = `
    INSERT INTO fees
    (student_id, fee_type, amount, paid_amount, due_date, status)
    VALUES (?, ?, ?, 0, ?, 'Pending')
  `;

  db.query(
    sql,
    [student_id, fee_type, amount, due_date || null],
    (err, result) => {
      if (err) {
        console.log("Create Fee Error:", err);

        return res.status(500).json({
          message: "Failed to create fee",
        });
      }

      res.status(201).json({
        message: "Fee created successfully",
        fee_id: result.insertId,
      });
    }
  );
};


module.exports = {
  getMyFees,
  createFee,
};