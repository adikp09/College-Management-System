const db = require("../config/db");

const getAttendance = (req, res) => {
  console.log("Attendance User ID =", req.user.id);
  const sql = "SELECT * FROM attendance WHERE student_id = ?";

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};

const markAttendance = (req, res) => {
  const { student_id, subject, attendance_date, status } = req.body;

  if (!student_id || !subject || !attendance_date || !status) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (status !== "Present" && status !== "Absent") {
    return res.status(400).json({
      message: "Invalid attendance status",
    });
  }

  // Step 1: Save individual attendance record
  const insertSql = `
    INSERT INTO attendance_records
    (student_id, subject, attendance_date, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
  insertSql,
  [student_id, subject, attendance_date, status],
  (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          message:
            "Attendance already marked for this student on this date.",
        });
      }

      return res.status(500).json(err);
    }

      // Step 2: Check if subject already exists in attendance summary
      const checkSql = `
        SELECT id
        FROM attendance
        WHERE student_id = ? AND subject = ?
      `;

      db.query(
        checkSql,
        [student_id, subject],
        (err, rows) => {
          if (err) {
            return res.status(500).json(err);
          }

          // Step 3: If subject already exists, update it
          if (rows.length > 0) {
            const updateSql = `
              UPDATE attendance
              SET
                attended_classes = attended_classes + ?,
                total_classes = total_classes + 1
              WHERE student_id = ? AND subject = ?
            `;

            const attended = status === "Present" ? 1 : 0;

            db.query(
              updateSql,
              [attended, student_id, subject],
              (err) => {
                if (err) {
                  return res.status(500).json(err);
                }

                return res.status(201).json({
                  message: "Attendance Marked Successfully",
                  id: result.insertId,
                });
              }
            );
          }

          // Step 4: If subject does not exist, create it
          else {
            const attended = status === "Present" ? 1 : 0;

            const createSql = `
              INSERT INTO attendance
              (student_id, subject, attended_classes, total_classes)
              VALUES (?, ?, ?, 1)
            `;

            db.query(
              createSql,
              [student_id, subject, attended],
              (err) => {
                if (err) {
                  return res.status(500).json(err);
                }

                return res.status(201).json({
                  message: "Attendance Marked Successfully",
                  id: result.insertId,
                });
              }
            );
          }
        }
      );
    }
  );
};
// Get Attendance History for Faculty
const getAttendanceHistory = (req, res) => {
  const sql = `
    SELECT
      ar.id,
      ar.student_id,
      s.full_name,
      ar.subject,
      ar.attendance_date,
      ar.status
    FROM attendance_records ar
    JOIN students s ON ar.student_id = s.id
    ORDER BY ar.attendance_date DESC, ar.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};

const updateAttendance = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "Attendance status is required",
    });
  }

  if (status !== "Present" && status !== "Absent") {
    return res.status(400).json({
      message: "Invalid attendance status",
    });
  }

  const selectSql = `
    SELECT student_id, subject, status
    FROM attendance_records
    WHERE id = ?
  `;

  db.query(selectSql, [id], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    const oldStatus = rows[0].status;

    const updateRecordSql = `
      UPDATE attendance_records
      SET status = ?
      WHERE id = ?
    `;

    db.query(
      updateRecordSql,
      [status, id],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        // Agar status same hai, summary change nahi hogi
        if (oldStatus === status) {
          return res.status(200).json({
            message: "Attendance Updated Successfully",
          });
        }

        const difference =
          status === "Present" ? 1 : -1;

        const updateSummarySql = `
          UPDATE attendance
          SET attended_classes =
            attended_classes + ?
          WHERE student_id = ? AND subject = ?
        `;

        db.query(
          updateSummarySql,
          [
            difference,
            rows[0].student_id,
            rows[0].subject,
          ],
          (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            return res.status(200).json({
              message: "Attendance Updated Successfully",
            });
          }
        );
      }
    );
  });
};
const deleteAttendance = (req, res) => {
  const { id } = req.params;

  // Step 1: Get attendance record
  const selectSql = `
    SELECT student_id, subject, status
    FROM attendance_records
    WHERE id = ?
  `;

  db.query(selectSql, [id], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    const record = rows[0];

    // Step 2: Delete attendance record
    const deleteSql = `
      DELETE FROM attendance_records
      WHERE id = ?
    `;

    db.query(deleteSql, [id], (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      // Step 3: Update attendance summary
      const attended = record.status === "Present" ? 1 : 0;

      const updateSql = `
        UPDATE attendance
        SET
          attended_classes = attended_classes - ?,
          total_classes = total_classes - 1
        WHERE student_id = ? AND subject = ?
      `;

      db.query(
        updateSql,
        [attended, record.student_id, record.subject],
        (err) => {
          if (err) {
            return res.status(500).json(err);
          }

          return res.status(200).json({
            message: "Attendance Deleted Successfully",
          });
        }
      );
    });
  });
};
module.exports = {
  getAttendance,
  markAttendance,
  getAttendanceHistory,
  updateAttendance,
  deleteAttendance,
};