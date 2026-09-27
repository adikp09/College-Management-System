const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= ADMIN REGISTER =================

const registerAdmin = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Validation
    if (!full_name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing admin
    const checkSql = `
      SELECT id
      FROM admins
      WHERE email = ?
    `;

    db.query(checkSql, [email], async (err, results) => {
      if (err) {
        console.log("Admin Check Error:", err);

        return res.status(500).json({
          message: "Database error",
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          message: "Admin already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert admin
      const insertSql = `
        INSERT INTO admins
        (full_name, email, password, role)
        VALUES (?, ?, ?, 'admin')
      `;

      db.query(
        insertSql,
        [
          full_name,
          email,
          hashedPassword,
        ],
        (err, result) => {
          if (err) {
            console.log("Admin Insert Error:", err);

            return res.status(500).json({
              message: "Failed to create admin",
            });
          }

          res.status(201).json({
            message: "Admin registered successfully",
            admin_id: result.insertId,
          });
        }
      );
    });
  } catch (error) {
    console.log("Admin Register Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= ADMIN LOGIN =================

const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const sql = `
    SELECT id, full_name, email, password, role
    FROM admins
    WHERE email = ?
  `;

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.log("Admin Login DB Error:", err);

      return res.status(500).json({
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const admin = results[0];

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        role: admin.role,
      },
    });
  });
};

// ================= ADMIN DASHBOARD STATS =================

const getDashboardStats = (req, res) => {
  const studentsSql = `
    SELECT COUNT(*) AS total
    FROM students
  `;

  const paymentsSql = `
    SELECT COUNT(*) AS total
    FROM fee_payments
    WHERE status = 'Pending'
  `;

  // Get total students
  db.query(studentsSql, (err, studentResult) => {
    if (err) {
      console.log("Students Stats Error:", err);

      return res.status(500).json({
        message: "Failed to get student statistics",
      });
    }

    // Get pending payments
    db.query(paymentsSql, (err, paymentResult) => {
      if (err) {
        console.log("Payment Stats Error:", err);

        return res.status(500).json({
          message: "Failed to get payment statistics",
        });
      }

      // Faculty and Notices tables
      // are not created yet, so currently 0.
      res.json({
        totalStudents: studentResult[0].total,
        totalFaculty: 0,
        pendingPayments: paymentResult[0].total,
        totalNotices: 0,
      });
    });
  });
};

// ================= EXPORTS =================

module.exports = {
  registerAdmin,
  loginAdmin,
  getDashboardStats,
};