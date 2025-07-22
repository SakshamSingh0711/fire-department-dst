const Designation = require('../models/Designation');

const getAllDesignations = async () => {
  return await Designation.find({ isActive: true });
};

const getDesignationById = async (id) => {
  return await Designation.findById(id);
};

const createDesignation = async (designationData) => {
  const { name, isActive } = designationData;

  const designation = new Designation({
    name,
    ...(typeof isActive !== 'undefined' && { isActive })
  });

  return await designation.save();
};

const updateDesignation = async (id, designationData) => {
  const { name, isActive } = designationData;

  const updatePayload = {
    ...(name && { name }),
    ...(typeof isActive !== 'undefined' && { isActive })
  };

  return await Designation.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true
  });
};

const deleteDesignation = async (id) => {
  return await Designation.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

const getDesignationStats = async () => {
  const stats = await Designation.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalDesignations: { $sum: 1 },
        activeDesignations: {
          $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
        }
      }
    }
  ]);

  return stats[0] || { totalDesignations: 0, activeDesignations: 0 };
};

module.exports = {
  getAllDesignations,
  getDesignationById,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  getDesignationStats
};