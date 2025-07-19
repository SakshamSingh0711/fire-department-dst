const adminService = require('../services/adminService');
const logger = require('../utils/logger');
const { auth, authorize } = require('../middleware/auth');

const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    logger.error(`Get dashboard stats error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    logger.error(`Get all users error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await adminService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    logger.error(`Get user by ID error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await adminService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    logger.error(`Create user error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await adminService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    logger.error(`Update user error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await adminService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    logger.error(`Delete user error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const generateReport = async (req, res) => {
  try {
    const report = await adminService.generateReport(req.query.type);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=report-${Date.now()}.pdf`);
    res.send(report);
  } catch (err) {
    logger.error(`Generate report error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  generateReport
};