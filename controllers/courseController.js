const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, assignedFaculty } = req.body;
    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newCourse = new Course({
      title,
      description,
      pdfUrl,
      assignedFaculty,
    });
    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
