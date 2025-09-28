const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    marksObtained: {
        type: Number,
        required: true,
    },
    comments: {
        type: String,
    },
}, {
    timestamps: true,
});

// Ensure a student has only one result per exam
resultSchema.index({ exam: 1, student: 1 }, { unique: true });

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;