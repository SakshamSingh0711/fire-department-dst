const Designation = require('../models/Designation');

// 1. Get all designations (renamed from getDesignations)
const getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find();
    res.status(200).json(designations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch designations.' });
  }
};

// 2. Create designation (unchanged)
const createDesignation = async (req, res) => {
  try {
    const { name } = req.body;
    const newDesignation = new Designation({ name });
    await newDesignation.save();
    res.status(201).json(newDesignation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create designation.' });
  }
};

// 3. Update designation (unchanged)
const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Designation.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update designation.' });
  }
};

// 4. Delete designation (replaces toggleDesignationStatus)
const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    await Designation.findByIdAndDelete(id); // Hard delete
    res.status(200).json({ message: 'Designation permanently deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete designation.' });
  }
};

// Updated exports to match route expectations
module.exports = {
  getAllDesignations, // Matches route import
  createDesignation,
  updateDesignation,
  deleteDesignation   // Matches route import
};