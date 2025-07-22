const Branch = require('../models/Branch');

// GET /api/branches
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find({ isActive: true });
    res.status(200).json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error.message);
    res.status(500).json({ message: 'Failed to fetch branches' });
  }
};

// GET /api/branches/:id
const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.status(200).json(branch);
  } catch (error) {
    console.error('Error fetching branch:', error.message);
    res.status(500).json({ message: 'Failed to fetch branch' });
  }
};

// POST /api/branches
const createBranch = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Branch name is required' });
    }

    const existing = await Branch.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ message: 'Branch name already exists' });
    }

    const branch = new Branch({
      name: name.trim(),
      isActive: true,
      activeFiles: 0,
      personnelCount: 0
    });

    const saved = await branch.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating branch:', error.message);
    res.status(500).json({ message: 'Failed to create branch' });
  }
};

// PUT /api/branches/:id
const updateBranch = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    if (typeof name === 'undefined' && typeof isActive === 'undefined') {
      return res.status(400).json({ message: 'No valid update fields provided' });
    }

    const updatePayload = {};
    if (typeof name !== 'undefined') {
      const trimmed = name.trim();
      if (trimmed === '') {
        return res.status(400).json({ message: 'Branch name cannot be empty' });
      }
      updatePayload.name = trimmed;
    }
    if (typeof isActive !== 'undefined') {
      updatePayload.isActive = isActive;
    }

    const updated = await Branch.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating branch:', error.message);
    res.status(500).json({ message: 'Failed to update branch' });
  }
};

// DELETE /api/branches/:id (Soft delete)
const deleteBranch = async (req, res) => {
  try {
    const deleted = await Branch.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    res.status(200).json(deleted);
  } catch (error) {
    console.error('Error deleting branch:', error.message);
    res.status(500).json({ message: 'Failed to delete branch' });
  }
};

// GET /api/branches/stats
const getBranchStats = async (req, res) => {
  try {
    const stats = await Branch.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalBranches: { $sum: 1 },
          activeBranches: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
          }
        }
      }
    ]);

    res.status(200).json(stats[0] || { totalBranches: 0, activeBranches: 0 });
  } catch (error) {
    console.error('Error fetching branch stats:', error.message);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchStats
};