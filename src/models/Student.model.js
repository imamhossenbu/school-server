const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // Link to the main User model for login credentials
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    studentId: { // School-specific unique ID like 'ST-2025-001'
        type: String,
        required: true,
        unique: true,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    address: String,
    guardianName: String,
    guardianPhone: String,
    guardian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;