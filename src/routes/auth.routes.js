const express = require('express');
const router = express.Router();

// Import controller functions
const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
} = require('../controllers/auth.controller');

// Define routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);

module.exports = router;