const express = require('express');
const router = express.Router();
const {
  authUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
// ✅ Correctly import 'auth' and 'authorize'
const { auth, authorize } = require('../middleware/auth');

// Public route for user login
router.post('/login', authUser);

// Admin routes for managing users
router.route('/')
  // ✅ Use auth and authorize('Master')
  .get(auth, authorize('Master'), getAllUsers)
  .post(auth, authorize('Master'), createUser);

router.route('/:id')
  // ✅ Use auth and authorize('Master')
  .put(auth, authorize('Master'), updateUser)
  .delete(auth, authorize('Master'), deleteUser);

module.exports = router;