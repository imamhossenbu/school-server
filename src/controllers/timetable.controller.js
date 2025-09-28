const Timetable = require('../models/Timetable.model');
const Student = require('../models/Student.model');
const Teacher = require('../models/Teacher.model');

// @desc    Create or update a class timetable
// @route   POST /api/timetables
// @access  Private/Admin
exports.createOrUpdateTimetable = async (req, res, next) => {
    try {
        const { classId, academicYear, schedule } = req.body;

        // Find and update if exists, or create if it doesn't (upsert)
        const timetable = await Timetable.findOneAndUpdate(
            { class: classId, academicYear },
            { schedule },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ success: true, message: 'Timetable updated successfully', data: timetable });
    } catch (err) {
        next(err);
    }
};

// @desc    Get the timetable for a specific class
// @route   GET /api/timetables/class/:classId
// @access  Private (Admin, Teacher)
exports.getTimetableByClass = async (req, res, next) => {
    try {
        const timetable = await Timetable.findOne({ class: req.params.classId })
            .populate('schedule.periods.subject', 'name')
            .populate('schedule.periods.teacher', 'name');

        if (!timetable) {
            return res.status(404).json({ message: 'Timetable not found for this class' });
        }
        res.status(200).json({ success: true, data: timetable });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my timetable (for a student or teacher)
// @route   GET /api/timetables/me
// @access  Private (Student, Teacher)
exports.getMyTimetable = async (req, res, next) => {
    try {
        let userProfile;
        if (req.user.role === 'student') {
            userProfile = await Student.findOne({ user: req.user.id });
        } else if (req.user.role === 'teacher') {
            userProfile = await Teacher.findOne({ user: req.user.id });
        }

        if (!userProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        if (req.user.role === 'student' && userProfile.class) {
            const timetable = await Timetable.findOne({ class: userProfile.class })
                .populate('schedule.periods.subject', 'name')
                .populate('schedule.periods.teacher', 'name');
            return res.status(200).json({ success: true, data: timetable });
        }

        // For teachers, we need to find all periods they are assigned to across all timetables
        if (req.user.role === 'teacher') {
            const allTimetables = await Timetable.find({ 'schedule.periods.teacher': userProfile._id })
                .populate('class', 'name')
                .populate('schedule.periods.subject', 'name');

            const teacherSchedule = allTimetables.map(tt => ({
                className: tt.class.name,
                schedule: tt.schedule.map(day => ({
                    dayOfWeek: day.dayOfWeek,
                    periods: day.periods.filter(p => p.teacher.equals(userProfile._id))
                })).filter(day => day.periods.length > 0)
            }));

            return res.status(200).json({ success: true, data: teacherSchedule });
        }

        res.status(404).json({ message: 'No timetable found for you' });
    } catch (err) {
        next(err);
    }
};