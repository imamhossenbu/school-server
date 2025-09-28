const express = require('express');
const router = express.Router();
const { createExam, getAllExams } = require('../controllers/exam.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

router.use(authMiddleware, checkRole(['admin']));

router.route('/').post(createExam).get(getAllExams);

module.exports = router;