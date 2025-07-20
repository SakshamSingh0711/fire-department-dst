const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth, authorize } = require('../middleware/auth');
const { validate, registerValidation } = require('../middleware/validate');

// -----------------------------------------------------------------------------
// 🔒 All routes are private and accessible only by 'Master' role users
// -----------------------------------------------------------------------------

// @route   GET /api/admin/dashboard
// @desc    Get overall dashboard stats
// @access  Private (Master only)
router.get('/dashboard', auth, authorize('Master'), adminController.getDashboardStats);

// @route   GET /api/admin/users
// @desc    Get all users (except inactive ones)
// @access  Private (Master only)
router.get('/users', auth, authorize('Master'), adminController.getAllUsers);

// @route   GET /api/admin/users/:id
// @desc    Get single user details by ID
// @access  Private (Master only)
router.get('/users/:id', auth, authorize('Master'), adminController.getUserById);

// @route   POST /api/admin/users
// @desc    Create a new user
// @access  Private (Master only)
router.post(
  '/users',
  auth,
  authorize('Master'),
  validate(registerValidation),
  adminController.createUser
);

// @route   PUT /api/admin/users/:id
// @desc    Update user by ID
// @access  Private (Master only)
router.put(
  '/users/:id',
  auth,
  authorize('Master'),
  validate(registerValidation),
  adminController.updateUser
);

// @route   DELETE /api/admin/users/:id
// @desc    Soft delete user by setting isActive = false
// @access  Private (Master only)
router.delete('/users/:id', auth, authorize('Master'), adminController.deleteUser);

// @route   GET /api/admin/reports
// @desc    Generate system-wide reports (files, personnel, transfers, etc.)
// @access  Private (Master only)
router.get('/reports', auth, authorize('Master'), adminController.generateReport);

// -----------------------------------------------------------------------------
// Export the router
// -----------------------------------------------------------------------------
module.exports = router;