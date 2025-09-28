const Expense = require('../models/Expense.model');

// @desc    Submit a new expense
// @route   POST /api/expenses
// @access  Private (Teacher/Admin)
exports.submitExpense = async (req, res, next) => {
    try {
        const expense = await Expense.create({
            ...req.body,
            submittedBy: req.user.id,
        });
        res.status(201).json({ success: true, data: expense });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my expenses (for a teacher)
// @route   GET /api/expenses/me
// @access  Private (Teacher)
exports.getMyExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find({ submittedBy: req.user.id }).sort({ expenseDate: -1 });
        res.status(200).json({ success: true, data: expenses });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all expenses (for Admin)
// @route   GET /api/expenses
// @access  Private (Admin)
exports.getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find().populate('submittedBy', 'name').sort({ expenseDate: -1 });
        res.status(200).json({ success: true, data: expenses });
    } catch (err) {
        next(err);
    }
};


exports.updateExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ success: true, data: expense });
    } catch (err) {
        next(err);
    }
};