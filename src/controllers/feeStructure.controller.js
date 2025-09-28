const FeeStructure = require('../models/FeeStructure.model');

// @desc    Create a fee structure
// @route   POST /api/feestructures
// @access  Private/Admin
exports.createFeeStructure = async (req, res, next) => {
    try {
        const feeStructure = await FeeStructure.create(req.body);
        res.status(201).json({ success: true, data: feeStructure });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all fee structures
// @route   GET /api/feestructures
// @access  Private/Admin
exports.getFeeStructures = async (req, res, next) => {
    try {
        const structures = await FeeStructure.find().populate('class', 'name');
        res.status(200).json({ success: true, data: structures });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a fee structure by ID
// @route   PUT /api/feestructures/:id
// @access  Private/Admin
exports.updateFeeStructure = async (req, res, next) => {
    try {
        const structure = await FeeStructure.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the modified document
            runValidators: true,
        });
        if (!structure) {
            return res.status(404).json({ message: 'Fee structure not found' });
        }
        res.status(200).json({ success: true, data: structure });
    } catch (err) {
        next(err);
    }
};
