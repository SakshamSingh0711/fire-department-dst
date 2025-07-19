const Personnel = require('../models/Personnel');
const Branch = require('../models/Branch');

const getAllPersonnel = async () => {
  return await Personnel.find({ isActive: true })
    .populate('currentBranch', 'name code')
    .sort({ name: 1 });
};

const getPersonnelById = async (id) => {
  return await Personnel.findById(id)
    .populate('currentBranch', 'name code')
    .populate('postingHistory.branch', 'name code');
};

const createPersonnel = async (personnelData) => {
  const personnel = new Personnel(personnelData);
  return await personnel.save();
};

const updatePersonnel = async (id, personnelData) => {
  return await Personnel.findByIdAndUpdate(
    id,
    personnelData,
    { new: true, runValidators: true }
  ).populate('currentBranch', 'name code');
};

const deletePersonnel = async (id) => {
  return await Personnel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

const getPersonnelStats = async () => {
  const stats = await Personnel.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalPersonnel: { $sum: 1 },
        averageAge: { $avg: '$age' }
      }
    }
  ]);

  return stats[0] || { totalPersonnel: 0, averageAge: 0 };
};

module.exports = {
  getAllPersonnel,
  getPersonnelById,
  createPersonnel,
  updatePersonnel,
  deletePersonnel,
  getPersonnelStats
};