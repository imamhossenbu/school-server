const Student = require('../models/Student.model');
const Attendance = require('../models/Attendance.model');
const Result = require('../models/Result.model');
const FeePayment = require('../models/FeePayment.model');

// @desc    Get details of my child/children for the dashboard
// @route   GET /api/guardians/my-children
// @access  Private/Guardian
exports.getMyChildrenData = async (req, res, next) => {
    try {
        // Find all students linked to this guardian
        const students = await Student.find({ guardian: req.user.id }).populate('class', 'name');

        if (!students || students.length === 0) {
            return res.status(404).json({ message: "You don't have any children assigned to your profile." });
        }

        // For each student, fetch their detailed data in parallel
        const childrenData = await Promise.all(students.map(async (student) => {
            const attendance = await Attendance.find({ 'records.student': student._id });
            const results = await Result.find({ student: student._id }).populate('exam');
            const fees = await FeePayment.find({ student: student._id });

            return {
                profile: student,
                attendance,
                results,
                fees
            };
        }));

        res.status(200).json({ success: true, data: childrenData });

    } catch (err) {
        next(err);
    }
};