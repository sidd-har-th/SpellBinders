const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = new Announcement({
      title,
      message,
      createdBy: req.user.id,
    });
    await announcement.save();
    res.status(201).json({ message: "Announcement created", announcement });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate(
      "createdBy",
      "name role"
    );
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
