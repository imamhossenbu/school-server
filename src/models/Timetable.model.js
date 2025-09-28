const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
    periodNumber: { type: Number, required: true },
    startTime: { type: String, required: true }, // e.g., "09:00 AM"
    endTime: { type: String, required: true }, // e.g., "09:45 AM"
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
}, { _id: false });

const dailyScheduleSchema = new mongoose.Schema({
    dayOfWeek: {
        type: String,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true,
    },
    periods: [periodSchema],
}, { _id: false });


const timetableSchema = new mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
        unique: true, // Ekta class er jonno ektai routine thakbe
    },
    academicYear: {
        type: String,
        required: true,
    },
    schedule: [dailyScheduleSchema],
}, {
    timestamps: true,
});

const Timetable = mongoose.model('Timetable', timetableSchema);
module.exports = Timetable;