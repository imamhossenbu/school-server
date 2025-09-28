const Subject = require('../models/Subject.model');

// @desc    Create a new subject
// @route   POST /api/subjects
// @access  Private/Admin
exports.createSubject = async (req, res, next) => {
    try {
        const { name, subjectCode, classId, teacherId } = req.body;
        const subject = await Subject.create({
            name,
            subjectCode,
            class: classId,
            teacher: teacherId,
        });
        res.status(201).json({ success: true, data: subject });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all subjects (can be filtered by class)
// @route   GET /api/subjects
// @access  Private/Admin
exports.getAllSubjects = async (req, res, next) => {
    try {
        let query = {};
        if (req.query.classId) {
            query.class = req.query.classId;
        }
        const subjects = await Subject.find(query)
            .populate('class', 'name grade')
            .populate('teacher', 'name');
        res.status(200).json({ success: true, count: subjects.length, data: subjects });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a subject (e.g., assign a teacher)
// @route   PUT /api/subjects/:id
// @access  Private/Admin
exports.updateSubject = async (req, res, next) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.status(200).json({ success: true, data: subject });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
// @access  Private/Admin
exports.deleteSubject = async (req, res, next) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.status(200).json({ success: true, message: 'Subject deleted' });
    } catch (err) {
        next(err);
    }
};