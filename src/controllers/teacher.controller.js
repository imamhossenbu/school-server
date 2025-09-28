const Teacher = require('../models/Teacher.model');

// @desc    Update a teacher's profile (e.g., set salary)
// @route   PUT /api/teachers/:id
// @access  Private/Admin
exports.updateTeacherProfile = async (req, res, next) => {
    try {
        // Shudhumatro salary update er jonno body te salary field thakbe
        const { salary } = req.body;

        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { salary },
            { new: true, runValidators: true }
        );

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ success: true, message: "Teacher's salary updated", data: teacher });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private/Admin
exports.getAllTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find().populate('user', 'name email');
        res.status(200).json({ success: true, data: teachers });
    } catch (err) {
        next(err);
    }
};
