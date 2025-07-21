const branchService = require('../services/branchService');
const logger = require('../utils/logger');

const getAllBranches = async (req, res) => {
  try {
    const branches = await branchService.getAllBranches();
    res.json({ success: true, data: branches });
  } catch (err) {
    logger.error(`Get all branches error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getBranchById = async (req, res) => {
  try {
    const branch = await branchService.getBranchById(req.params.id);
    if (!branch) {
      return res.status(404).json({ success: false, message: 'Branch not found' });
    }
    res.json({ success: true, data: branch });
  } catch (err) {
    logger.error(`Get branch by ID error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const createBranch = async (req, res) => {
  try {
    logger.info('Creating branch:', req.body);
    const branch = await branchService.createBranch(req.body);
    res.status(201).json({ success: true, data: branch });
  } catch (err) {
    logger.error(`Create branch error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateBranch = async (req, res) => {
  try {
    logger.info(`Updating branch with ID: ${req.params.id}`);
    logger.info('Payload:', req.body);

    const updated = await branchService.updateBranch(req.params.id, req.body);

    if (!updated) {
      logger.warn(`Branch not found: ${req.params.id}`);
      return res.status(404).json({ success: false, message: 'Branch not found' });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    logger.error(`Update branch error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const deleteBranch = async (req, res) => {
  try {
    logger.info(`Deleting branch with ID: ${req.params.id}`);
    const deleted = await branchService.deleteBranch(req.params.id);

    if (!deleted) {
      logger.warn(`Branch not found for deletion: ${req.params.id}`);
      return res.status(404).json({ success: false, message: 'Branch not found' });
    }

    res.json({ success: true, data: deleted });
  } catch (err) {
    logger.error(`Delete branch error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch
};