const express = require('express');
const router = express.Router();
const {
    createFeeStructure,
    getFeeStructures,
    updateFeeStructure
} = require('../controllers/feeStructure.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

router.use(authMiddleware, checkRole(['admin']));

router.route('/')
    .post(createFeeStructure)
    .get(getFeeStructures);


router.route('/:id')
    .put(updateFeeStructure);

module.exports = router;
