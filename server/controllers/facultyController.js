const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= GET ALL FACULTY =================

const getAllFaculty = (req, res) => {
  const sql = `
    SELECT
      id,
      full_name,
      email,
      mobile,
      department,
      designation,
      created_at
    FROM faculty
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Get Faculty Error:", err);

      return res.status(500).json({
        message: "Failed to get faculty",
      });
    }

    res.status(200).json(result);
  });
};

// ================= ADD FACULTY =================

const addFaculty = async (req, res) => {
  try {
    const {
      full_name,
      email,
      mobile,
      department,
      designation,
      password,
    } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO faculty
      (
        full_name,
        email,
        mobile,
        department,
        designation,
        password
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        full_name,
        email,
        mobile,
        department,
        designation,
        hashedPassword,
      ],
      (err, result) => {
        if (err) {
          console.log("Add Faculty Error:", err);

          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
              message: "Faculty email already exists",
            });
          }

          return res.status(500).json({
            message: "Failed to add faculty",
          });
        }

        res.status(201).json({
          message: "Faculty added successfully",
          facultyId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.log("Add Faculty Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= DELETE FACULTY =================

const deleteFaculty = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM faculty WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Delete Faculty Error:", err);

      return res.status(500).json({
        message: "Failed to delete faculty",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      message: "Faculty deleted successfully",
    });
  });
};

// ================= FACULTY LOGIN =================

const loginFaculty = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const sql = `
    SELECT
      id,
      full_name,
      email,
      mobile,
      department,
      designation,
      password
    FROM faculty
    WHERE email = ?
  `;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log("Faculty Login Error:", err);

      return res.status(500).json({
        message: "Server error",
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const faculty = result[0];

    const isPasswordMatch = await bcrypt.compare(
      password,
      faculty.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: faculty.id,
        role: "faculty",
        email: faculty.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Faculty Login Successful",
      token,
      faculty: {
        id: faculty.id,
        full_name: faculty.full_name,
        email: faculty.email,
        mobile: faculty.mobile,
        department: faculty.department,
        designation: faculty.designation,
      },
    });
  });
};

// ================= RESET FACULTY PASSWORD =================

const resetFacultyPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        message: "New password is required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const sql = `
      UPDATE faculty
      SET password = ?
      WHERE id = ?
    `;

    db.query(sql, [hashedPassword, id], (err, result) => {
      if (err) {
        console.log("Reset Faculty Password Error:", err);

        return res.status(500).json({
          message: "Failed to reset password",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Faculty not found",
        });
      }

      res.status(200).json({
        message: "Faculty password reset successfully",
      });
    });
  } catch (error) {
    console.log("Reset Faculty Password Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// ================= EXPORT =================

module.exports = {
  getAllFaculty,
  addFaculty,
  deleteFaculty,
  loginFaculty,
  resetFacultyPassword,
};