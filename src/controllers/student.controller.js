const Student = require('../models/Student.model');

// @desc    Assign a guardian to a student
// @route   PUT /api/students/:studentId/assign-guardian
// @access  Private/Admin
exports.assignGuardian = async (req, res, next) => {
    try {
        const { guardianId } = req.body;
        const { studentId } = req.params;

        const student = await Student.findByIdAndUpdate(
            studentId,
            { guardian: guardianId },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ success: true, message: 'Guardian assigned successfully', data: student });
    } catch (err) {
        next(err);
    }
};