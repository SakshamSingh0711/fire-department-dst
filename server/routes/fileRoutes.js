const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { auth, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { fileValidation } = require('../middleware/validate');

// @route   GET api/files
// @desc    Get all files
// @access  Private
router.get('/', auth, fileController.getAllFiles);

// @route   GET api/files/:id
// @desc    Get file by ID
// @access  Private
router.get('/:id', auth, fileController.getFileById);

// @route   POST api/files
// @desc    Create new file
// @access  Private (Office and Master only)
router.post(
  '/',
  auth,
  authorize(['Master', 'Office']),
  validate(fileValidation),
  fileController.createFile
);

// @route   PUT api/files/:id
// @desc    Update file
// @access  Private
router.put(
  '/:id',
  auth,
  validate(fileValidation),
  fileController.updateFile
);

// @route   POST api/files/:id/move
// @desc    Move file to another branch
// @access  Private (Office and Master only)
router.post(
  '/:id/move',
  auth,
  authorize(['Master', 'Office']),
  validate(fileValidation),
  fileController.moveFile
);

// @route   DELETE api/files/:id
// @desc    Delete file
// @access  Private (Master only)
router.delete('/:id', auth, authorize('Master'), fileController.deleteFile);

module.exports = router;