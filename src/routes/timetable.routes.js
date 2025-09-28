const express = require('express');
const router = express.Router();

const {
    createOrUpdateTimetable,
    getTimetableByClass,
    getMyTimetable
} = require('../controllers/timetable.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// Route for Admins to create/update timetables
router.post('/', authMiddleware, checkRole(['admin']), createOrUpdateTimetable);

// Route for Admins and Teachers to view a specific class's timetable
router.get('/class/:classId', authMiddleware, checkRole(['admin', 'teacher']), getTimetableByClass);

// Route for Students and Teachers to view their own timetable
router.get('/me', authMiddleware, checkRole(['student', 'teacher']), getMyTimetable);

module.exports = router;