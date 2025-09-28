const express = require('express');
const router = express.Router();
const { getMyChildrenData } = require('../controllers/guardian.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');


router.get('/my-children', authMiddleware, checkRole(['guardian']), getMyChildrenData);

module.exports = router;