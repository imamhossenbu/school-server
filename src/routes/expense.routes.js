const express = require('express');
const router = express.Router();
const { submitExpense, getMyExpenses, getAllExpenses, updateExpense } = require('../controllers/expense.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

router.post('/', authMiddleware, checkRole(['teacher', 'admin']), submitExpense);
router.get('/me', authMiddleware, checkRole(['teacher']), getMyExpenses);
router.get('/', authMiddleware, checkRole(['admin']), getAllExpenses);
router.put('/:id', authMiddleware, checkRole(['admin']), updateExpense);

module.exports = router;