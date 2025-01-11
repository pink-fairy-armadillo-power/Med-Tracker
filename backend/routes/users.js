const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register new user
router.post('/signup', userController.signup);

// Login user
router.post('/login', userController.login);

// Get user profile
router.get('/:userId', userController.getUserProfile);

module.exports = router;
