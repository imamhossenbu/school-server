const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    subjectCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // Which class this subject belongs to
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    // Which teacher is assigned to this subject for this class
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
}, {
    timestamps: true,
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;