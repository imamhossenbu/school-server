const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    submittedBy: { // Teacher or Admin who submitted the expense
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true, // e.g., "Daily snacks for staff"
    },
    category: {
        type: String,
        enum: ['Snacks', 'Stationery', 'Utilities', 'Maintenance', 'Other'],
        default: 'Other',
    },
    amount: {
        type: Number,
        required: true,
    },
    expenseDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;