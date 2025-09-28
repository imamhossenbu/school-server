const express = require('express');
const router = express.Router();
const { updateTeacherProfile, getAllTeachers } = require('../controllers/teacher.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// Shudhu Admin ei route gulo access korte parbe
router.use(authMiddleware, checkRole(['admin']));

router.route('/')
    .get(getAllTeachers);

router.route('/:id')
    .put(updateTeacherProfile);

module.exports = router;
