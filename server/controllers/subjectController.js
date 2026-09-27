const db = require("../config/db");

// Get all subjects
const getAllSubjects = (req, res) => {
  const sql = `
    SELECT
      id,
      subject_name,
      subject_code,
      faculty_name,
      subject_details
    FROM subjects
    ORDER BY id ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Failed to fetch subjects:", err);

      return res.status(500).json({
        message: "Failed to fetch subjects",
      });
    }

    res.status(200).json(result);
  });
};

module.exports = {
  getAllSubjects,
};