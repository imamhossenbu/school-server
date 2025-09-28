const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String, // e.g., "Mid-Term Exam", "Final Exam"
        required: true,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    totalMarks: {
        type: Number,
        default: 100,
    },
    academicYear: {
        type: String,
        required: true, // e.g., "2025"
    },
}, {
    timestamps: true,
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;