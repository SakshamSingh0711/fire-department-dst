const OfficeLocation = require('../models/OfficeLocation');

module.exports = {
  /**
   * Get all office locations
   */
  getLocations: async (req, res) => {
    try {
      const locations = await OfficeLocation.find();
      res.status(200).json(locations);
    } catch (err) {
      res.status(500).json({ 
        error: 'Failed to fetch office locations.',
        details: err.message 
      });
    }
  },

  /**
   * Create new office location
   */
  createLocation: async (req, res) => {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const newLocation = new OfficeLocation({ name });
      await newLocation.save();
      
      res.status(201).json(newLocation);
    } catch (err) {
      res.status(500).json({ 
        error: 'Failed to create office location.',
        details: err.message 
      });
    }
  },

  /**
   * Update existing location
   */
  updateLocation: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await OfficeLocation.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!updated) {
        return res.status(404).json({ error: 'Location not found' });
      }
      
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ 
        error: 'Failed to update office location.',
        details: err.message 
      });
    }
  },

  /**
   * Toggle location's active status
   */
  toggleLocationStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const location = await OfficeLocation.findById(id);
      
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
      
      location.isActive = !location.isActive;
      await location.save();
      
      res.status(200).json(location);
    } catch (err) {
      res.status(500).json({ 
        error: 'Failed to toggle location status.',
        details: err.message 
      });
    }
  }
};