const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { auth, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { branchValidation } = require('../middleware/validate');

// @route   GET api/branches
router.get('/', auth, branchController.getAllBranches);

// @route   GET api/branches/:id
router.get('/:id', auth, branchController.getBranchById);

// @route   POST api/branches
router.post(
  '/',
  auth,
  authorize('Master'),
  validate(branchValidation), // <-- Make sure this only validates `name`
  branchController.createBranch
);

// @route   PUT api/branches/:id
router.put(
  '/:id',
  auth,
  authorize('Master'),
  validate(branchValidation), // <-- same here
  branchController.updateBranch
);

// @route   DELETE api/branches/:id
router.delete('/:id', auth, authorize('Master'), branchController.deleteBranch);

module.exports = router;