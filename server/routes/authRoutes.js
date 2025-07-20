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



// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user)
//       return res.status(400).json({ message: 'Invalid email or password' });

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: 'Invalid email or password' });

//     // ✅ Generate token with user id and role
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({ token }); // OR send user too if needed
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };