const db = require("../config/db");

// Get published results for logged-in student
const getStudentResults = (req, res) => {
  const sql = `
    SELECT
      er.id,
      er.exam_id,
      er.student_id,
      sub.subject_name AS subject,
      sub.subject_code,
      er.marks,
      e.max_marks,
      er.grade,
      e.exam_type,
      e.exam_date
    FROM exam_results er
    JOIN exams e
      ON er.exam_id = e.id
    JOIN subjects sub
      ON e.subject_id = sub.id
    WHERE er.student_id = ?
      AND er.published = 1
      AND e.status = 'published'
    ORDER BY e.exam_date DESC, er.id DESC
  `;

  console.log("Logged in user:", req.user);

  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      console.log("Result Error:", err);

      return res.status(500).json({
        message: "Failed to fetch results",
      });
    }

    res.status(200).json(results);
  });
};

module.exports = {
  getStudentResults,
};