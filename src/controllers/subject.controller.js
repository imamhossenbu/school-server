const Subject = require('../models/Subject.model');

// @desc    Create a new subject
exports.createSubject = async (req, res, next) => {
    try {
        const { name, classId, teacherId } = req.body;

        const subjectData = {
            name,
            class: classId,
        };

        if (teacherId) {
            subjectData.teacher = teacherId;
        }

        const subject = await Subject.create(subjectData);
        res.status(201).json({ success: true, data: subject });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all subjects
exports.getAllSubjects = async (req, res, next) => {
    try {
        let query = {};
        if (req.query.classId) {
            query.class = req.query.classId;
        }
        const subjects = await Subject.find(query)
            .populate('class', 'name section grade')
            // FIX: Shothik populate method bebohar kora hoyeche
            .populate({
                path: 'teacher',
                populate: {
                    path: 'user',
                    select: 'name'
                }
            });
        res.status(200).json({ success: true, count: subjects.length, data: subjects });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a subject
exports.updateSubject = async (req, res, next) => {
    try {
        const { name, classId, teacherId } = req.body;
        const updateData = { name, class: classId, teacher: teacherId || null };

        const subject = await Subject.findByIdAndUpdate(req.params.id, updateData, {
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

