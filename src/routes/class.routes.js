const express = require('express');
const router = express.Router();

const {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass,
    addStudentToClass,
    assignClassTeacher
} = require('../controllers/class.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');


router.use(authMiddleware, checkRole(['admin']));

router.route('/')
    .post(createClass)
    .get(getAllClasses);

router.route('/:id')
    .get(getClassById)
    .put(updateClass)
    .delete(deleteClass);

router.route('/:classId/students')
    .post(addStudentToClass);


router.route('/:classId/assign-teacher')
    .put(assignClassTeacher);
module.exports = router;