const fileService = require('../services/fileService');
const logger = require('../utils/logger');
const { validate } = require('../middleware/validate');
const { fileValidation } = require('../middleware/validate');
const { auth, authorize } = require('../middleware/auth');

const getAllFiles = async (req, res) => {
  try {
    const files = await fileService.getAllFiles(
      req.user.id,
      req.user.role,
      req.user.branch
    );
    res.json({ success: true, data: files });
  } catch (err) {
    logger.error(`Get all files error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getFileById = async (req, res) => {
  try {
    const file = await fileService.getFileById(
      req.params.id,
      req.user.id,
      req.user.role,
      req.user.branch
    );
    res.json({ success: true, data: file });
  } catch (err) {
    logger.error(`Get file by ID error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const createFile = async (req, res) => {
  try {
    const file = await fileService.createFile(req.body, req.user.id);
    res.status(201).json({ success: true, data: file });
  } catch (err) {
    logger.error(`Create file error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateFile = async (req, res) => {
  try {
    const file = await fileService.updateFile(
      req.params.id,
      req.body,
      req.user.id,
      req.user.role,
      req.user.branch
    );
    res.json({ success: true, data: file });
  } catch (err) {
    logger.error(`Update file error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const moveFile = async (req, res) => {
  try {
    const file = await fileService.moveFile(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json({ success: true, data: file });
  } catch (err) {
    logger.error(`Move file error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await fileService.updateFile(
      req.params.id,
      { isActive: false },
      req.user.id,
      req.user.role,
      req.user.branch
    );
    res.json({ success: true, data: file });
  } catch (err) {
    logger.error(`Delete file error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getAllFiles,
  getFileById,
  createFile,
  updateFile,
  moveFile,
  deleteFile
};
