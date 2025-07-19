const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { auth, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { branchValidation } = require('../middleware/validate');

// @route   GET api/branches
// @desc    Get all branches
// @access  Private
router.get('/', auth, branchController.getAllBranches);

// @route   GET api/branches/:id
// @desc    Get branch by ID
// @access  Private
router.get('/:id', auth, branchController.getBranchById);

// @route   POST api/branches
// @desc    Create new branch
// @access  Private (Master only)
router.post(
  '/',
  auth,
  authorize('Master'),
  validate(branchValidation),
  branchController.createBranch
);

// @route   PUT api/branches/:id
// @desc    Update branch
// @access  Private (Master only)
router.put(
  '/:id',
  auth,
  authorize('Master'),
  validate(branchValidation),
  branchController.updateBranch
);

// @route   DELETE api/branches/:id
// @desc    Delete branch
// @access  Private (Master only)
router.delete('/:id', auth, authorize('Master'), branchController.deleteBranch);

module.exports = router;