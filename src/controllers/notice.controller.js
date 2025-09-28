const Notice = require('../models/Notice.model');

// @desc    Create a new notice
// @route   POST /api/notices
// @access  Private (Admin/Teacher)
exports.createNotice = async (req, res, next) => {
    try {
        const { title, content, visibleTo } = req.body;

        const notice = await Notice.create({
            title,
            content,
            visibleTo,
            postedBy: req.user.id, // Comes from authMiddleware
        });

        res.status(201).json({ success: true, data: notice });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all relevant notices for the logged-in user
// @route   GET /api/notices
// @access  Private (All logged-in users)
exports.getAllNotices = async (req, res, next) => {
    try {
        // Find notices where the 'visibleTo' array contains the user's role
        const notices = await Notice.find({ visibleTo: req.user.role })
            .populate('postedBy', 'name role') // Show who posted the notice
            .sort({ createdAt: -1 }); // Show the newest notices first

        res.status(200).json({ success: true, count: notices.length, data: notices });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a notice
// @route   PUT /api/notices/:id
// @access  Private (Admin/Teacher)
exports.updateNotice = async (req, res, next) => {
    try {
        const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json({ success: true, data: notice });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
// @access  Private (Admin/Teacher)
exports.deleteNotice = async (req, res, next) => {
    try {
        const notice = await Notice.findByIdAndDelete(req.params.id);

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json({ success: true, message: 'Notice deleted successfully' });
    } catch (err) {
        next(err);
    }
};