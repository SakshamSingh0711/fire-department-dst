const File = require('../models/File');
const Branch = require('../models/Branch');
const User = require('../models/User');

const getAllFiles = async (userId, userRole, branchId) => {
  let query = { isActive: true };
  
  // Branch users can only see their branch files
  if (userRole === 'Branch') {
    query.branch = branchId;
  }

  return await File.find(query)
    .populate('branch', 'name code')
    .populate('createdBy', 'name')
    .populate('currentHandler', 'name')
    .sort({ createdAt: -1 });
};

const getFileById = async (fileId, userId, userRole, branchId) => {
  let query = { _id: fileId, isActive: true };
  
  // Branch users can only see their branch files
  if (userRole === 'Branch') {
    query.branch = branchId;
  }

  const file = await File.findOne(query)
    .populate('branch', 'name code')
    .populate('createdBy', 'name')
    .populate('currentHandler', 'name')
    .populate('movementLog.fromBranch', 'name')
    .populate('movementLog.toBranch', 'name')
    .populate('movementLog.movedBy', 'name');

  if (!file) {
    throw new Error('File not found or unauthorized access');
  }

  return file;
};

const createFile = async (fileData, userId) => {
  const branch = await Branch.findById(fileData.branch);
  if (!branch) {
    throw new Error('Branch not found');
  }

  const file = new File({
    ...fileData,
    createdBy: userId,
    currentHandler: userId
  });

  await file.save();

  // Update branch's active files count
  await Branch.findByIdAndUpdate(branch._id, {
    $inc: { activeFiles: 1 }
  });

  return file;
};

const updateFile = async (fileId, fileData, userId, userRole, branchId) => {
  let query = { _id: fileId, isActive: true };
  
  // Branch users can only update their branch files
  if (userRole === 'Branch') {
    query.branch = branchId;
  }

  const file = await File.findOneAndUpdate(
    query,
    fileData,
    { new: true, runValidators: true }
  )
    .populate('branch', 'name code')
    .populate('createdBy', 'name')
    .populate('currentHandler', 'name');

  if (!file) {
    throw new Error('File not found or unauthorized access');
  }

  return file;
};

const moveFile = async (fileId, movementData, userId) => {
  const file = await File.findById(fileId);
  if (!file) {
    throw new Error('File not found');
  }

  // Add to movement log
  file.movementLog.push({
    fromBranch: file.branch,
    toBranch: movementData.toBranch,
    movedBy: userId,
    comments: movementData.comments
  });

  // Update current branch
  file.branch = movementData.toBranch;
  file.currentHandler = userId;

  await file.save();

  return file;
};

const getFileStats = async () => {
  const stats = await File.aggregate([
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

  return stats[0] || { totalFiles: 0, pendingFiles: 0, completedFiles: 0 };
};

module.exports = {
  getAllFiles,
  getFileById,
  createFile,
  updateFile,
  moveFile,
  getFileStats
};