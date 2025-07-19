const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { registerValidation } = require('../middleware/validate');

// @route   GET api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private (Master only)
router.get('/dashboard', auth, authorize('Master'), adminController.getDashboardStats);

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private (Master only)
router.get('/users', auth, authorize('Master'), adminController.getAllUsers);

// @route   GET api/admin/users/:id
// @desc    Get user by ID
// @access  Private (Master only)
router.get('/users/:id', auth, authorize('Master'), adminController.getUserById);

// @route   POST api/admin/users
// @desc    Create new user
// @access  Private (Master only)
router.post(
  '/users',
  auth,
  authorize('Master'),
  validate(registerValidation),
  adminController.createUser
);

// @route   PUT api/admin/users/:id
// @desc    Update user
// @access  Private (Master only)
router.put(
  '/users/:id',
  auth,
  authorize('Master'),
  validate(registerValidation),
  adminController.updateUser
);

// @route   DELETE api/admin/users/:id
// @desc    Delete user
// @access  Private (Master only)
router.delete('/users/:id', auth, authorize('Master'), adminController.deleteUser);

// @route   GET api/admin/reports
// @desc    Generate report
// @access  Private (Master only)
router.get('/reports', auth, authorize('Master'), adminController.generateReport);

module.exports = router;