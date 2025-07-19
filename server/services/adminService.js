const User = require('../models/User');
const File = require('../models/File');
const Personnel = require('../models/Personnel');
const Branch = require('../models/Branch');
const Transfer = require('../models/Transfer');
const logger = require('../utils/logger');
const { generateReport: generateReportFile } = require('../utils/reportGenerator');

const getDashboardStats = async () => {
  try {
    const files = await File.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalFiles: { $sum: 1 },
          pendingFiles: {
            $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] }
          },
          completedFiles: {
            $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] }
          }
        }
      }
    ]);

    const personnel = await Personnel.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalPersonnel: { $sum: 1 },
          averageAge: { $avg: '$age' }
        }
      }
    ]);

    const branches = await Branch.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalBranches: { $sum: 1 }
        }
      }
    ]);

    const transfers = await Transfer.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    return {
      files: files[0] || { totalFiles: 0, pendingFiles: 0, completedFiles: 0 },
      personnel: personnel[0] || { totalPersonnel: 0, averageAge: 0 },
      branches: branches[0] || { totalBranches: 0 },
      transfers
    };
  } catch (err) {
    logger.error(`Error getting dashboard stats: ${err.message}`);
    throw err;
  }
};

const getAllUsers = async () => {
  return await User.find({ isActive: true })
    .select('-password')
    .populate('branch', 'name')
    .sort({ role: 1, name: 1 });
};

const getUserById = async (id) => {
  return await User.findById(id)
    .select('-password')
    .populate('branch', 'name');
};

const createUser = async (userData) => {
  const existingUser = await User.findOne({
    $or: [
      { idNumber: userData.idNumber },
      { email: userData.email }
    ]
  });

  if (existingUser) {
    throw new Error('User already exists with this ID or email');
  }

  const user = new User(userData);
  await user.save();

  return user;
};

const updateUser = async (id, userData) => {
  if (userData.password) {
    delete userData.password;
  }

  return await User.findByIdAndUpdate(
    id,
    userData,
    { new: true, runValidators: true }
  ).select('-password');
};

const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  ).select('-password');
};

const handleReportGeneration = async (type = 'summary') => {
  try {
    let data;

    switch (type) {
      case 'personnel':
        data = await Personnel.find({ isActive: true })
          .populate('currentBranch', 'name');
        break;
      case 'files':
        data = await File.find({ isActive: true })
          .populate('branch', 'name')
          .populate('createdBy', 'name');
        break;
      case 'transfers':
        data = await Transfer.find()
          .populate('personnel', 'name rank')
          .populate('fromBranch toBranch', 'name');
        break;
      default: // summary
        data = await getDashboardStats();
    }

    return await generateReportFile(type, data);
  } catch (err) {
    logger.error(`Error generating report: ${err.message}`);
    throw err;
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  generateReport: handleReportGeneration
};