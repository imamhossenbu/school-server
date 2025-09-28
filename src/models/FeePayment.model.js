const mongoose = require('mongoose');

const feePaymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    month: {
        type: String, // e.g., "January", "February"
        required: true,
    },
    totalFeeForMonth: { // Should come from FeeStructure
        type: Number,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    dueAmount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['Paid', 'Partially Paid', 'Unpaid'],
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

// A student should only have one payment record for a specific month in a year
feePaymentSchema.index({ student: 1, academicYear: 1, month: 1 }, { unique: true });

const FeePayment = mongoose.model('FeePayment', feePaymentSchema);
module.exports = FeePayment;