const express = require('express');
const router = express.Router();

const {
    takeAttendance,
    getAttendanceByClass,
    getMyAttendance
} = require('../controllers/attendance.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// Routes for Teachers and Admins
router.post('/', authMiddleware, checkRole(['teacher', 'admin']), takeAttendance);
router.get('/class/:classId', authMiddleware, checkRole(['teacher', 'admin']), getAttendanceByClass);

// Route for Students
router.get('/me', authMiddleware, checkRole(['student']), getMyAttendance);

module.exports = router;