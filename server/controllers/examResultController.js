const db = require("../config/db");

// Get students for a particular exam
const getStudentsForExam = (req, res) => {
  const { examId } = req.params;

  const sql = `
    SELECT
      s.id AS student_id,
      s.full_name,
      e.id AS exam_id,
      sub.subject_name,
      sub.subject_code,
      e.exam_type,
      e.exam_date,
      e.max_marks
    FROM students s
    CROSS JOIN exams e
    JOIN subjects sub
      ON e.subject_id = sub.id
    WHERE e.id = ?
    ORDER BY s.id ASC
  `;

  db.query(sql, [examId], (err, results) => {
    if (err) {
      console.log("Failed to fetch students:", err);

      return res.status(500).json({
        message: "Failed to fetch students",
      });
    }

    res.status(200).json(results);
  });
};


// Save student marks
const saveMarks = (req, res) => {
  const { exam_id, student_id, marks } = req.body;

  if (
    !exam_id ||
    !student_id ||
    marks === undefined ||
    marks === null
  ) {
    return res.status(400).json({
      message: "Exam, student and marks are required",
    });
  }

  const examSql = `
    SELECT max_marks
    FROM exams
    WHERE id = ?
  `;

  db.query(examSql, [exam_id], (err, examResult) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to check exam",
      });
    }

    if (examResult.length === 0) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    const maxMarks = Number(examResult[0].max_marks);
    const studentMarks = Number(marks);

    if (
      studentMarks < 0 ||
      studentMarks > maxMarks
    ) {
      return res.status(400).json({
        message: `Marks must be between 0 and ${maxMarks}`,
      });
    }

    let grade;

    const percentage =
      (studentMarks / maxMarks) * 100;

    if (percentage >= 90) {
      grade = "A+";
    } else if (percentage >= 80) {
      grade = "A";
    } else if (percentage >= 70) {
      grade = "B";
    } else if (percentage >= 60) {
      grade = "C";
    } else if (percentage >= 50) {
      grade = "D";
    } else {
      grade = "F";
    }

    const sql = `
      INSERT INTO exam_results
      (exam_id, student_id, marks, grade, published)
      VALUES (?, ?, ?, ?, 0)
      ON DUPLICATE KEY UPDATE
        marks = VALUES(marks),
        grade = VALUES(grade)
    `;

    db.query(
      sql,
      [
        exam_id,
        student_id,
        studentMarks,
        grade,
      ],
      (err) => {
        if (err) {
          console.log(
            "Failed to save marks:",
            err
          );

          return res.status(500).json({
            message: "Failed to save marks",
          });
        }

        res.status(200).json({
          message: "Marks saved successfully",
          grade,
        });
      }
    );
  });
};


module.exports = {
  getStudentsForExam,
  saveMarks,
};