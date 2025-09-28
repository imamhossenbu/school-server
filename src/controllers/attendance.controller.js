const Attendance = require('../models/Attendance.model');
const Teacher = require('../models/Teacher.model');
const Student = require('../models/Student.model');

// @desc    Take attendance for a class
// @route   POST /api/attendance
// @access  Private (Teacher, Admin)
exports.takeAttendance = async (req, res, next) => {
    try {
        const { date, classId, records } = req.body;

        // Find the teacher ID from the logged-in user ID
        const teacher = await Teacher.findOne({ user: req.user.id });
        if (!teacher) {
            return res.status(403).json({ message: 'User is not a teacher' });
        }

        // Check if attendance for this class and date already exists
        const existingAttendance = await Attendance.findOne({ class: classId, date });
        if (existingAttendance) {
            return res.status(400).json({ message: 'Attendance already taken for this class on this date' });
        }

        const attendance = await Attendance.create({
            date,
            class: classId,
            teacher: teacher._id,
            records,
        });
        res.status(201).json({ success: true, data: attendance });
    } catch (err) {
        next(err);
    }
};

// @desc    Get attendance for a class on a specific date
// @route   GET /api/attendance/class/:classId?date=YYYY-MM-DD
// @access  Private (Teacher, Admin)
exports.getAttendanceByClass = async (req, res, next) => {
    try {
        const { classId } = req.params;
        const { date } = req.query;

        const attendance = await Attendance.findOne({ class: classId, date })
            .populate('records.student', 'name studentId');

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ success: true, data: attendance });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my attendance (for a student)
// @route   GET /api/attendance/me
// @access  Private (Student)
exports.getMyAttendance = async (req, res, next) => {
    try {
        const student = await Student.findOne({ user: req.user.id });
        if (!student) {
            return res.status(403).json({ message: 'User is not a student' });
        }

        // Find all attendance sheets that include this student
        const attendanceRecords = await Attendance.find({ 'records.student': student._id })
            .sort({ date: -1 }); // Sort by most recent date

        // Filter to only show the specific student's record from each sheet
        const myRecords = attendanceRecords.map(sheet => {
            const myRecord = sheet.records.find(rec => rec.student.equals(student._id));
            return {
                date: sheet.date,
                status: myRecord.status
            };
        });

        res.status(200).json({ success: true, data: myRecords });
    } catch (err) {
        next(err);
    }
};