const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the notice'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide content for the notice'],
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Who can see this notice?
    visibleTo: [{
        type: String,
        enum: ['admin', 'teacher', 'student', 'guardian'],
        required: true,
    }],
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
});

const Notice = mongoose.model('Notice', noticeSchema);
module.exports = Notice;