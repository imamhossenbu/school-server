const express = require('express');
const router = express.Router();
const { recordSalaryPayment, getMySalaryHistory, getSalaryReport, updateSalaryPayment } = require('../controllers/salaryPayment.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// For Teachers to see their history
router.get('/me', authMiddleware, checkRole(['teacher']), getMySalaryHistory);
// For Admins to manage payments and see reports
router.post('/', authMiddleware, checkRole(['admin']), recordSalaryPayment);
router.get('/report', authMiddleware, checkRole(['admin']), getSalaryReport);
router.put('/:id', authMiddleware, checkRole(['admin']), updateSalaryPayment);

module.exports = router;