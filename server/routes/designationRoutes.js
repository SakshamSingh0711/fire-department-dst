const express = require('express');
const router = express.Router();
const {
  getAllDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation
} = require('../controllers/designationController'); // Remove .cjs extension

router.get('/', getAllDesignations);
router.post('/', createDesignation);
router.put('/:id', updateDesignation);
router.delete('/:id', deleteDesignation);

module.exports = router;