const express = require('express');
const router = express.Router();
const {
  getAllDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
} = require('../controllers/designationController');

router.get('/', getAllDesignations);
router.post('/', createDesignation);
router.put('/:id', updateDesignation);
router.delete('/:id', deleteDesignation);

module.exports = router; // ✅ This line must export the router directly