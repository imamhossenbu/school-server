const Result = require('../models/Result.model');
const Student = require('../models/Student.model');

// @desc    Add or update a student's result
// @route   POST /api/results
// @access  Private (Teacher, Admin)
exports.addOrUpdateResult = async (req, res, next) => {
    try {
        const { examId, studentId, marksObtained, comments } = req.body;

        // Find and update if exists, or create if it doesn't (upsert)
        const result = await Result.findOneAndUpdate(
            { exam: examId, student: studentId },
            { marksObtained, comments },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

// @desc    Get results for a specific exam
// @route   GET /api/results/exam/:examId
// @access  Private (Teacher, Admin)
exports.getResultsByExam = async (req, res, next) => {
    try {
        const results = await Result.find({ exam: req.params.examId })
            .populate('student', 'name studentId');
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my results (for a logged-in student)
// @route   GET /api/results/me
// @access  Private (Student)
exports.getMyResults = async (req, res, next) => {
    try {
        const student = await Student.findOne({ user: req.user.id });
        if (!student) {
            return res.status(403).json({ message: 'User is not a student' });
        }

        const results = await Result.find({ student: student._id })
            .populate({
                path: 'exam',
                select: 'name date totalMarks',
                populate: { path: 'subject', select: 'name' }
            });

        res.status(200).json({ success: true, data: results });
    } catch (err) {
        next(err);
    }
};