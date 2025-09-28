const Exam = require('../models/Exam.model');

// @desc    Create an exam
// @route   POST /api/exams
// @access  Private/Admin
exports.createExam = async (req, res, next) => {
    try {
        const exam = await Exam.create(req.body);
        res.status(201).json({ success: true, data: exam });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all exams
// @route   GET /api/exams
// @access  Private/Admin
exports.getAllExams = async (req, res, next) => {
    try {
        const exams = await Exam.find().populate('class', 'name').populate('subject', 'name');
        res.status(200).json({ success: true, data: exams });
    } catch (err) {
        next(err);
    }
};