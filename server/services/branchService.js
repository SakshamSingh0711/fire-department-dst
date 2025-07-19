const Branch = require('../models/Branch');

const getAllBranches = async () => {
  return await Branch.find({ isActive: true }).populate('head', 'name email');
};

const getBranchById = async (branchId) => {
  return await Branch.findById(branchId).populate('head', 'name email');
};

const createBranch = async (branchData) => {
  const branch = new Branch(branchData);
  return await branch.save();
};

const updateBranch = async (branchId, branchData) => {
  return await Branch.findByIdAndUpdate(
    branchId,
    branchData,
    { new: true, runValidators: true }
  ).populate('head', 'name email');
};

const deleteBranch = async (branchId) => {
  return await Branch.findByIdAndUpdate(
    branchId,
    { isActive: false },
    { new: true }
  );
};

const getBranchStats = async () => {
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

  return stats[0] || { totalBranches: 0, activeBranches: 0 };
};

module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchStats
};