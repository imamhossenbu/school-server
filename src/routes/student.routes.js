const express = require('express');
const router = express.Router();
const { assignGuardian } = require('../controllers/student.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// Shudhu Admin ei kaj korte parbe
router.put('/:studentId/assign-guardian', authMiddleware, checkRole(['admin']), assignGuardian);

module.exports = router;