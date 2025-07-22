const express = require('express');
const router = express.Router();
const {
  getLocations,
  createLocation,
  updateLocation,
  toggleLocationStatus
} = require('../controllers/officeLocationController');

router.get('/', getLocations);
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.patch('/:id/toggle', toggleLocationStatus);

module.exports = router;