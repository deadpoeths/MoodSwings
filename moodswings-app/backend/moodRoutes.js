const express = require('express');
const { addMoodLog, getMoodLogs } = require('./moodController');
const authMiddleware = require('./authMiddleware'); // Middleware to verify JWT token

const router = express.Router();

// Route to add a new mood log
router.post('/', authMiddleware, addMoodLog);

// Route to get all mood logs for the logged-in user
router.get('/', authMiddleware, getMoodLogs);

module.exports = router;
