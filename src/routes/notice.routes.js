const express = require('express');
const router = express.Router();

const {
    createNotice,
    getAllNotices,
    updateNotice,
    deleteNotice
} = require('../controllers/notice.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// Route for any logged-in user to see notices
router.get('/', authMiddleware, getAllNotices);

// Routes for Admins and Teachers to manage notices
router.post('/', authMiddleware, checkRole(['admin', 'teacher']), createNotice);
router.put('/:id', authMiddleware, checkRole(['admin', 'teacher']), updateNotice);
router.delete('/:id', authMiddleware, checkRole(['admin', 'teacher']), deleteNotice);

module.exports = router;