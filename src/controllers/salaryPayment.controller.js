const SalaryPayment = require('../models/SalaryPayment.model');
const Teacher = require('../models/Teacher.model');

// @desc    Record a salary payment
// @route   POST /api/salary-payments
// @access  Private/Admin
exports.recordSalaryPayment = async (req, res, next) => {
    try {
        const { teacherId, month, year, amountPaid } = req.body;
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        const totalSalary = teacher.salary;
        const status = (amountPaid >= totalSalary) ? 'Paid' : 'Partially Paid';

        const payment = await SalaryPayment.create({
            teacher: teacherId, month, year, totalSalary, amountPaid, status, recordedBy: req.user.id
        });
        res.status(201).json({ success: true, data: payment });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my salary history (for a teacher)
// @route   GET /api/salary-payments/me
// @access  Private/Teacher
exports.getMySalaryHistory = async (req, res, next) => {
    try {
        const teacher = await Teacher.findOne({ user: req.user.id });
        if (!teacher) return res.status(404).json({ message: 'Teacher profile not found' });

        const history = await SalaryPayment.find({ teacher: teacher._id }).sort({ paymentDate: -1 });
        res.status(200).json({ success: true, data: history });
    } catch (err) {
        next(err);
    }
};

// @desc    Get salary report for a month (for Admin)
// @route   GET /api/salary-payments/report
// @access  Private/Admin
exports.getSalaryReport = async (req, res, next) => {
    try {
        const { month, year } = req.query;
        const report = await SalaryPayment.find({ month, year }).populate('teacher', 'name teacherId');
        res.status(200).json({ success: true, data: report });
    } catch (err) {
        next(err);
    }
};

exports.updateSalaryPayment = async (req, res, next) => {
    try {
        const payment = await SalaryPayment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        // Proyojone status abar check kora jete pare
        const totalSalary = payment.totalSalary;
        const amountPaid = payment.amountPaid;
        payment.status = (amountPaid >= totalSalary) ? 'Paid' : 'Partially Paid';
        await payment.save();

        res.status(200).json({ success: true, data: payment });
    } catch (err) {
        next(err);
    }
};