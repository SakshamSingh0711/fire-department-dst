const Branch = require('../models/Branch');

const getAllBranches = async () => {
  return await Branch.find({ isActive: true }).populate('head', 'name email');
};

const getBranchById = async (branchId) => {
  return await Branch.findById(branchId).populate('head', 'name email');
};

const createBranch = async (branchData) => {
  const { name, code, phone, email, head, isActive } = branchData;

  const branch = new Branch({
    name,
    code,
    phone,
    email,
    ...(head && { head }),
    ...(typeof isActive !== 'undefined' && { isActive }),
  });

  return await branch.save();
};

const updateBranch = async (branchId, branchData) => {
  const { name, code, phone, email, head, isActive } = branchData;

  const updatePayload = {
    ...(name && { name }),
    ...(code && { code }),
    ...(phone && { phone }),
    ...(email && { email }),
    ...(typeof head !== 'undefined' && { head }),
    ...(typeof isActive !== 'undefined' && { isActive }),
  };

  return await Branch.findByIdAndUpdate(branchId, updatePayload, {
    new: true,
    runValidators: true,
  }).populate('head', 'name email');
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