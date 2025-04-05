const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createCourse } = require("../controllers/courseController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("pdf"),
  createCourse
);

module.exports = router;
