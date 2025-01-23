const express = require('express');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

// Protected routes
router.get('/home', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to Home!', userId: req.userId });
});

router.get('/logmoods', authMiddleware, (req, res) => {
  res.json({ message: 'Log your moods here!', userId: req.userId });
});

router.get('/history', authMiddleware, (req, res) => {
  res.json({ message: 'Here is your mood history!', userId: req.userId });
});

// Export routes
module.exports = router;
