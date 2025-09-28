const express = require('express');
const router = express.Router();

const {
    createSubject,
    getAllSubjects,
    updateSubject,
    deleteSubject
} = require('../controllers/subject.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// Protect all routes in this file for Admin only
router.use(authMiddleware, checkRole(['admin']));

router.route('/')
    .post(createSubject)
    .get(getAllSubjects);

router.route('/:id')
    .put(updateSubject)
    .delete(deleteSubject);

module.exports = router;