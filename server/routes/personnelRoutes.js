const express = require('express');
const router = express.Router();
const personnelController = require('../controllers/personnelController');
const { auth, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { personnelValidation, transferValidation } = require('../middleware/validate');

// @route   GET api/personnel
// @desc    Get all personnel
// @access  Private
router.get('/', auth, personnelController.getAllPersonnel);

// @route   GET api/personnel/:id
// @desc    Get personnel by ID
// @access  Private
router.get('/:id', auth, personnelController.getPersonnelById);

// @route   POST api/personnel
// @desc    Create new personnel
// @access  Private (Master and Office only)
router.post(
  '/',
  auth,
  authorize(['Master', 'Office']),
  validate(personnelValidation),
  personnelController.createPersonnel
);

// @route   PUT api/personnel/:id
// @desc    Update personnel
// @access  Private (Master and Office only)
router.put(
  '/:id',
  auth,
  authorize(['Master', 'Office']),
  validate(personnelValidation),
  personnelController.updatePersonnel
);

// @route   DELETE api/personnel/:id
// @desc    Delete personnel
// @access  Private (Master only)
router.delete('/:id', auth, authorize('Master'), personnelController.deletePersonnel);

// @route   POST api/personnel/transfers
// @desc    Request personnel transfer
// @access  Private
router.post(
  '/transfers',
  auth,
  validate(transferValidation),
  personnelController.requestTransfer
);

// @route   PUT api/personnel/transfers/:id/approve
// @desc    Approve transfer request
// @access  Private (Master and Office only)
router.put(
  '/transfers/:id/approve',
  auth,
  authorize(['Master', 'Office']),
  personnelController.approveTransfer
);

// @route   PUT api/personnel/transfers/:id/reject
// @desc    Reject transfer request
// @access  Private (Master and Office only)
router.put(
  '/transfers/:id/reject',
  auth,
  authorize(['Master', 'Office']),
  personnelController.rejectTransfer
);

// @route   GET api/personnel/transfers
// @desc    Get all transfer requests
// @access  Private
router.get('/transfers', auth, personnelController.getTransfers);

module.exports = router;