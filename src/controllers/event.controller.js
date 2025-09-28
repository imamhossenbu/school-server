const Event = require('../models/Event.model');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Admin)
exports.createEvent = async (req, res, next) => {
    try {
        const event = await Event.create({
            ...req.body,
            createdBy: req.user.id,
        });
        res.status(201).json({ success: true, data: event });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all events (can be filtered by year and month)
// @route   GET /api/events?year=2025&month=10
// @access  Private (All logged-in users)
exports.getAllEvents = async (req, res, next) => {
    try {
        const { year, month } = req.query;
        let query = {};

        if (year && month) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59); // Last day of the month
            query = {
                startDate: { $lte: endDate },
                endDate: { $gte: startDate },
            };
        } else if (year) {
            query.academicYear = year;
        }

        const events = await Event.find(query).sort({ startDate: 1 });
        res.status(200).json({ success: true, count: events.length, data: events });
    } catch (err) {
        next(err);
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Admin)
exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ success: true, data: event });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ success: true, message: 'Event deleted' });
    } catch (err) {
        next(err);
    }
};