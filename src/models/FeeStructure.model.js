const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    academicYear: {
        type: String, // e.g., "2025"
        required: true,
    },
    feeType: {
        type: String, // e.g., "Monthly Tuition Fee"
        default: 'Monthly Tuition Fee',
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);
module.exports = FeeStructure;