const mongoose = require('mongoose');

const salaryPaymentSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    month: {
        type: String, // e.g., "January"
        required: true,
    },
    year: {
        type: String, // e.g., "2025"
        required: true,
    },
    totalSalary: { // Comes from Teacher model
        type: Number,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
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
    recordedBy: { // Admin who recorded the payment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

// A teacher should have one salary payment record for a specific month/year
salaryPaymentSchema.index({ teacher: 1, month: 1, year: 1 }, { unique: true });

const SalaryPayment = mongoose.model('SalaryPayment', salaryPaymentSchema);
module.exports = SalaryPayment;