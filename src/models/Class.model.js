const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    // Notun 'section' field jog kora hoyeche
    section: {
        type: String,
        trim: true,
    },
    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
    subjects: [String],
}, {
    timestamps: true,
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;

