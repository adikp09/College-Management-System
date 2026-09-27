const db = require("../config/db");

// Create Exam
const createExam = async (req, res) => {
  try {
    const { subject_id, exam_type, exam_date, max_marks } = req.body;

    if (!subject_id || !exam_type || !exam_date || !max_marks) {
      return res.status(400).json({
        message: "All exam details are required",
      });
    }

    const sql = `
      INSERT INTO exams
      (subject_id, exam_type, exam_date, max_marks, status)
      VALUES (?, ?, ?, ?, 'draft')
    `;

    db.query(
      sql,
      [subject_id, exam_type, exam_date, max_marks],
      (err, result) => {
        if (err) {
          console.log("Create Exam Error:", err);

          return res.status(500).json({
            message: "Failed to create exam",
          });
        }

        res.status(201).json({
          message: "Exam created successfully",
          exam_id: result.insertId,
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Get Exams
const getExams = async (req, res) => {
  try {
    const sql = `
      SELECT
        e.id,
        e.subject_id,
        s.subject_name,
        s.subject_code,
        s.faculty_name,
        e.exam_type,
        e.exam_date,
        e.max_marks,
        e.status
      FROM exams e
      JOIN subjects s
        ON e.subject_id = s.id
      ORDER BY e.exam_date DESC
    `;

    db.query(sql, (err, results) => {
      if (err) {
        console.log("Get Exams Error:", err);

        return res.status(500).json({
          message: "Failed to fetch exams",
        });
      }

      res.json(results);
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Publish Exam
const publishExam = async (req, res) => {
  try {
    const { id } = req.params;

    // Check exam
    const examSql = `
      SELECT
        e.id,
        e.exam_type,
        e.exam_date,
        e.max_marks,
        s.subject_name,
        s.subject_code
      FROM exams e
      JOIN subjects s
        ON e.subject_id = s.id
      WHERE e.id = ?
    `;

    db.query(examSql, [id], (err, examResult) => {
      if (err) {
        console.log("Exam Check Error:", err);

        return res.status(500).json({
          message: "Failed to check exam",
        });
      }

      if (examResult.length === 0) {
        return res.status(404).json({
          message: "Exam not found",
        });
      }

      const exam = examResult[0];

      // Get saved marks
      const marksSql = `
        SELECT
          student_id,
          marks,
          grade
        FROM exam_results
        WHERE exam_id = ?
      `;

      db.query(marksSql, [id], (err, marksResult) => {
        if (err) {
          console.log("Marks Fetch Error:", err);

          return res.status(500).json({
            message: "Failed to fetch exam marks",
          });
        }

        if (marksResult.length === 0) {
          return res.status(400).json({
            message: "No student marks entered yet",
          });
        }

        // Insert results into results table
        const insertSql = `
          INSERT INTO results
          (
            student_id,
            subject,
            subject_code,
            marks,
            max_marks,
            grade,
            exam_type,
            exam_date
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        let completed = 0;
        let failed = false;

        marksResult.forEach((item) => {
          db.query(
            insertSql,
            [
              item.student_id,
              exam.subject_name,
              exam.subject_code,
              item.marks,
              exam.max_marks,
              item.grade,
              exam.exam_type,
              exam.exam_date,
            ],
            (err) => {
              if (err && !failed) {
                failed = true;

                console.log("Result Insert Error:", err);

                return res.status(500).json({
                  message: "Failed to publish results",
                });
              }

              completed++;

              if (completed === marksResult.length && !failed) {
                // Publish saved marks
const publishResultsSql = `
  UPDATE exam_results
  SET published = 1
  WHERE exam_id = ?
`;

db.query(publishResultsSql, [id], (err) => {
  if (err) {
    console.log(
      "Publish Results Update Error:",
      err
    );

    return res.status(500).json({
      message: "Failed to publish results",
    });
  }

  // Update exam status
  const updateSql = `
    UPDATE exams
    SET status = 'published'
    WHERE id = ?
  `;

  db.query(updateSql, [id], (err) => {
    if (err) {
      console.log(
        "Publish Exam Update Error:",
        err
      );

      return res.status(500).json({
        message: "Failed to publish exam",
      });
    }

    res.json({
      message: "Exam results published successfully",
    });
  });
});
              }
            }
          );
        });
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createExam,
  getExams,
  publishExam,
};