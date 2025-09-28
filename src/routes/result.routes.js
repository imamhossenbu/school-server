const express = require('express');
const router = express.Router();
const { addOrUpdateResult, getResultsByExam, getMyResults } = require('../controllers/result.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// Route for teachers/admins to add/update results
router.post('/', authMiddleware, checkRole(['teacher', 'admin']), addOrUpdateResult);

// Route for teachers/admins to get all results of an exam
router.get('/exam/:examId', authMiddleware, checkRole(['teacher', 'admin']), getResultsByExam);

// Route for students to get their own results
router.get('/me', authMiddleware, checkRole(['student']), getMyResults);

module.exports = router;