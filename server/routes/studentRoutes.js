const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  uploadProfilePhoto,
  getAllStudents,
} = require("../controllers/studentController");;

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/register", registerStudent);
router.post("/login", loginStudent);

router.get("/all", verifyToken, getAllStudents);

router.get("/profile", verifyToken, getStudentProfile);
router.put("/profile", verifyToken, updateStudentProfile);
router.get("/profile", verifyToken, getStudentProfile);
router.put("/profile", verifyToken, updateStudentProfile);
router.post(
  "/upload-profile-photo",
  verifyToken,
  upload.single("profile_photo"),
  uploadProfilePhoto
);

module.exports = router;