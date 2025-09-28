const express = require('express');
const router = express.Router();
const {
    recordPayment,
    getMyPayments,
    getClassFeeStatus,
    getMonthlyReport,
    updatePayment
} = require('../controllers/feePayment.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// For Students
router.get('/me', authMiddleware, checkRole(['student']), getMyPayments);
// For Teachers & Admins
router.post('/', authMiddleware, checkRole(['teacher', 'admin']), recordPayment);
router.get('/class/:classId', authMiddleware, checkRole(['teacher', 'admin']), getClassFeeStatus);
// For Admins only
router.get('/report/monthly', authMiddleware, checkRole(['admin']), getMonthlyReport);
router.put('/:id', authMiddleware, checkRole(['teacher', 'admin']), updatePayment);

module.exports = router;