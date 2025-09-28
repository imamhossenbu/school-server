const FeePayment = require('../models/FeePayment.model');
const FeeStructure = require('../models/FeeStructure.model');
const Student = require('../models/Student.model');

// @desc    Record a fee payment
// @route   POST /api/feepayments
// @access  Private (Teacher/Admin)
exports.recordPayment = async (req, res, next) => {
    try {
        const { studentId, classId, academicYear, month, amountPaid } = req.body;

        // Find the fee structure for this class and year
        const structure = await FeeStructure.findOne({ class: classId, academicYear });
        if (!structure) {
            return res.status(404).json({ message: 'Fee structure for this class not found' });
        }

        const totalFeeForMonth = structure.amount;
        const dueAmount = totalFeeForMonth - amountPaid;
        let status = 'Unpaid';
        if (dueAmount <= 0) {
            status = 'Paid';
        } else if (amountPaid > 0) {
            status = 'Partially Paid';
        }

        const payment = await FeePayment.create({
            student: studentId,
            class: classId,
            academicYear,
            month,
            totalFeeForMonth,
            amountPaid,
            dueAmount: dueAmount < 0 ? 0 : dueAmount,
            status,
            recordedBy: req.user.id
        });
        res.status(201).json({ success: true, data: payment });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my payment history (for a student)
// @route   GET /api/feepayments/me
// @access  Private (Student)
exports.getMyPayments = async (req, res, next) => {
    try {
        const student = await Student.findOne({ user: req.user.id });
        if (!student) return res.status(404).json({ message: 'Student profile not found' });

        const payments = await FeePayment.find({ student: student._id }).sort({ paymentDate: -1 });
        res.status(200).json({ success: true, data: payments });
    } catch (err) {
        next(err);
    }
};

// @desc    Get fee status for a whole class
// @route   GET /api/feepayments/class/:classId
// @access  Private (Teacher/Admin)
exports.getClassFeeStatus = async (req, res, next) => {
    try {
        const { classId } = req.params;
        const { month, year } = req.query; // e.g., ?month=January&year=2025

        const payments = await FeePayment.find({
            class: classId,
            month,
            academicYear: year
        }).populate('student', 'name studentId');

        // This is a basic report. You can enhance it further to show students who haven't paid at all.
        res.status(200).json({ success: true, data: payments });
    } catch (err) {
        next(err);
    }
};

// @desc    Get monthly collection report (for Admin)
// @route   GET /api/feepayments/report/monthly
// @access  Private (Admin)
exports.getMonthlyReport = async (req, res, next) => {
    try {
        const { month, year } = req.query;

        const report = await FeePayment.aggregate([
            { $match: { month, academicYear: year } },
            { $group: { _id: null, totalCollection: { $sum: "$amountPaid" } } }
        ]);

        const total = report.length > 0 ? report[0].totalCollection : 0;
        res.status(200).json({ success: true, month, year, totalCollection: total });
    } catch (err) {
        next(err);
    }
};

exports.updatePayment = async (req, res, next) => {
    try {
        const { amountNewlyPaid } = req.body;
        const paymentId = req.params.id;

        const payment = await FeePayment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        // Notun deya takar poriman jog kora hocche
        payment.amountPaid += amountNewlyPaid;

        // Notun bokeya hishab kora hocche
        const newDue = payment.totalFeeForMonth - payment.amountPaid;
        payment.dueAmount = newDue < 0 ? 0 : newDue;

        // Status update kora hocche
        if (payment.dueAmount === 0) {
            payment.status = 'Paid';
        } else {
            payment.status = 'Partially Paid';
        }

        // Ke update korlo tar record rakha hocche
        payment.recordedBy = req.user.id;
        payment.paymentDate = Date.now(); // Payment er date update kora hocche

        await payment.save();

        res.status(200).json({ success: true, data: payment });

    } catch (err) {
        next(err);
    }
};