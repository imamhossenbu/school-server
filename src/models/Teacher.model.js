const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    teacherId: { // School-specific unique ID like 'TR-2025-001'
        type: String,
        required: true,
        unique: true,
    },
    subject: {
        type: String,
    },
    phone: {
        type: String,
    },
    dateOfJoining: {
        type: Date,
        default: Date.now,
    },
    salary: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;