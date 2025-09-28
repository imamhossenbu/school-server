const express = require('express');
const router = express.Router();

// Import controller functions
const {
    getMe,
    updateDetails,
    updatePassword,
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/user.controller');

// Import middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// --- Routes for the currently logged-in user ---
router.get('/me', authMiddleware, getMe);
router.put('/updatedetails', authMiddleware, updateDetails);
router.put('/updatepassword', authMiddleware, updatePassword);


// --- Routes for Admin to manage all users ---
router.route('/')
    .get(authMiddleware, checkRole(['admin']), getAllUsers)
    .post(authMiddleware, checkRole(['admin']), createUser);

router.route('/:id')
    .get(authMiddleware, checkRole(['admin']), getUserById)
    .put(authMiddleware, checkRole(['admin']), updateUser)
    .delete(authMiddleware, checkRole(['admin']), deleteUser);


module.exports = router;