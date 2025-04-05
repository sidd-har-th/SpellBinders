const express = require("express");
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
} = require("../controllers/announcementController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, authorizeRoles("admin"), createAnnouncement);
router.get("/", authMiddleware, getAnnouncements);

module.exports = router;
