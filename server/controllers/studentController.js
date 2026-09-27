const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

// Register Student
const registerStudent = async (req, res) => {
  try {
    const {
      full_name,
      email,
      mobile,
      department,
      course,
      year,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO students (full_name,email,mobile,department,course,year,password) VALUES (?,?,?,?,?,?,?)";

    db.query(
      sql,
      [
        full_name,
        email,
        mobile,
        department,
        course,
        year,
        hashedPassword,
      ],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "Student Registered Successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login Student
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM students WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Student Not Found",
        });
      }

      const isMatch = await bcrypt.compare(
        password,
        result[0].password
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign(
  {
    id: result[0].id,
    email: result[0].email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);

res.status(200).json({
  message: "Login Successful",
  token,
  student: {
    id: result[0].id,
    full_name: result[0].full_name,
    email: result[0].email,
    department: result[0].department,
    course: result[0].course,
    year: result[0].year,
  },
});
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Student Profile
const getStudentProfile = (req, res) => {
  console.log("req.user =", req.user);

  const sql =
  "SELECT id, full_name, email, department, course, year, profile_photo FROM students WHERE id = ?";

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }

    res.status(200).json(result[0]);
  });
};

// Update Student Profile
const updateStudentProfile = (req, res) => {
  const { full_name, email, department, course, year } = req.body;

  const sql =
    "UPDATE students SET full_name=?, email=?, department=?, course=?, year=? WHERE id=?";

  db.query(
    sql,
    [full_name, email, department, course, year, req.user.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Profile Updated Successfully",
      });
    }
  );
};
const uploadProfilePhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No image uploaded",
    });
  }

  const photo = req.file.filename;

  const sql = "UPDATE students SET profile_photo=? WHERE id=?";

  db.query(sql, [photo, req.user.id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Profile photo uploaded successfully",
      photo,
    });
  });
};
// Get All Students for Faculty
const getAllStudents = (req, res) => {
  const sql =
    "SELECT id, full_name, email, department, course, year FROM students";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  uploadProfilePhoto,
  getAllStudents,
};