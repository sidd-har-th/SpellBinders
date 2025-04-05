const mongoose = require("mongoose");
const announcementSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Announcement", announcementSchema);
