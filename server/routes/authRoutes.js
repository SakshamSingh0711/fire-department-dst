const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validate');
const { loginValidation, registerValidation } = require('../middleware/validate');
const { auth } = require('../middleware/auth');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', validate(loginValidation), authController.login);

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validate(registerValidation), authController.register);

// @route   GET api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, authController.getProfile);

module.exports = router;