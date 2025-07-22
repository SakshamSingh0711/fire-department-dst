const Designation = require('../models/Designation');

export const getDesignations = async (req, res) => {
  try {
    const designations = await Designation.find();
    res.status(200).json(designations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch designations.' });
  }
};

export const createDesignation = async (req, res) => {
  try {
    const { name } = req.body;
    const newDesignation = new Designation({ name });
    await newDesignation.save();
    res.status(201).json(newDesignation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create designation.' });
  }
};

export const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Designation.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update designation.' });
  }
};

export const toggleDesignationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const designation = await Designation.findById(id);
    designation.isActive = !designation.isActive;
    await designation.save();
    res.status(200).json(designation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle status.' });
  }
};