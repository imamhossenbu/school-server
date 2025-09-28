const Class = require('../models/Class.model');
const Student = require('../models/Student.model');


// @desc    Create a new class
// @route   POST /api/classes
// @access  Private/Admin
exports.createClass = async (req, res, next) => {
    try {
        const { name, grade } = req.body;
        const newClass = await Class.create({ name, grade });
        res.status(201).json({ success: true, data: newClass });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private/Admin
exports.getAllClasses = async (req, res, next) => {
    try {
        const classes = await Class.find().populate('classTeacher', 'name');
        res.status(200).json({ success: true, count: classes.length, data: classes });
    } catch (err) {
        next(err);
    }
};

// @desc    Get a single class by ID
// @route   GET /api/classes/:id
// @access  Private/Admin
exports.getClassById = async (req, res, next) => {
    try {
        const singleClass = await Class.findById(req.params.id)
            .populate('classTeacher', 'name email') // Get teacher's name and email
            .populate('students', 'name studentId'); // Get students' name and ID

        if (!singleClass) {
            return res.status(404).json({ message: `Class not found` });
        }
        res.status(200).json({ success: true, data: singleClass });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a class
// @route   PUT /api/classes/:id
// @access  Private/Admin
exports.updateClass = async (req, res, next) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: updatedClass });
    } catch (err) {
        next(err);
    }
};


// @desc    Delete a class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
exports.deleteClass = async (req, res, next) => {
    try {
        const classToDelete = await Class.findByIdAndDelete(req.params.id);
        if (!classToDelete) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ success: true, message: 'Class deleted successfully' });
    } catch (err) {
        next(err);
    }
};

// @desc    Add a student to a class
// @route   POST /api/classes/:classId/students
// @access  Private/Admin
exports.addStudentToClass = async (req, res, next) => {
    try {
        const { studentId } = req.body; // Mongoose _id of the student
        const classId = req.params.classId;

        // Add student to the class's student array
        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { $addToSet: { students: studentId } }, // $addToSet prevents duplicates
            { new: true }
        );

        // Also update the student's document to set their class
        await Student.findByIdAndUpdate(studentId, { class: classId });

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: updatedClass });
    } catch (err) {
        next(err);
    }
};

// @desc    Assign a class teacher to a class
// @route   PUT /api/classes/:classId/assign-teacher
// @access  Private/Admin
exports.assignClassTeacher = async (req, res, next) => {
    try {
        const { teacherId } = req.body;
        const { classId } = req.params;

        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { classTeacher: teacherId },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: updatedClass });
    } catch (err) {
        next(err);
    }
};