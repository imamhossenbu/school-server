const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the event'],
        trim: true,
    },
    description: {
        type: String,
    },
    eventType: {
        type: String,
        enum: ['Holiday', 'Exam', 'Activity', 'Other'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    academicYear: {
        type: String,
        required: true, // e.g., "2025"
    },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;