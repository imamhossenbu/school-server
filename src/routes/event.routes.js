const express = require('express');
const router = express.Router();

const {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
} = require('../controllers/event.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

// Route for any logged-in user to see events
router.get('/', authMiddleware, getAllEvents);

// Routes for Admins to manage events
router.post('/', authMiddleware, checkRole(['admin']), createEvent);
router.put('/:id', authMiddleware, checkRole(['admin']), updateEvent);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteEvent);

module.exports = router;