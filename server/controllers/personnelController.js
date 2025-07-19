const personnelService = require('../services/personnelService');
const transferService = require('../services/transferService');
const logger = require('../utils/logger');
const { validate } = require('../middleware/validate');
const { personnelValidation, transferValidation } = require('../middleware/validate');
const { auth, authorize } = require('../middleware/auth');

const getAllPersonnel = async (req, res) => {
  try {
    const personnel = await personnelService.getAllPersonnel();
    res.json({ success: true, data: personnel });
  } catch (err) {
    logger.error(`Get all personnel error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getPersonnelById = async (req, res) => {
  try {
    const person = await personnelService.getPersonnelById(req.params.id);
    if (!person) {
      return res.status(404).json({ success: false, message: 'Personnel not found' });
    }
    res.json({ success: true, data: person });
  } catch (err) {
    logger.error(`Get personnel by ID error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const createPersonnel = async (req, res) => {
  try {
    const person = await personnelService.createPersonnel(req.body);
    res.status(201).json({ success: true, data: person });
  } catch (err) {
    logger.error(`Create personnel error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const updatePersonnel = async (req, res) => {
  try {
    const person = await personnelService.updatePersonnel(req.params.id, req.body);
    if (!person) {
      return res.status(404).json({ success: false, message: 'Personnel not found' });
    }
    res.json({ success: true, data: person });
  } catch (err) {
    logger.error(`Update personnel error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const deletePersonnel = async (req, res) => {
  try {
    const person = await personnelService.deletePersonnel(req.params.id);
    if (!person) {
      return res.status(404).json({ success: false, message: 'Personnel not found' });
    }
    res.json({ success: true, data: person });
  } catch (err) {
    logger.error(`Delete personnel error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const requestTransfer = async (req, res) => {
  try {
    const transfer = await transferService.requestTransfer({
      ...req.body,
      requestedBy: req.user.id
    });
    res.status(201).json({ success: true, data: transfer });
  } catch (err) {
    logger.error(`Request transfer error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const approveTransfer = async (req, res) => {
  try {
    const transfer = await transferService.approveTransfer(
      req.params.id,
      req.user.id
    );
    res.json({ success: true, data: transfer });
  } catch (err) {
    logger.error(`Approve transfer error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const rejectTransfer = async (req, res) => {
  try {
    const transfer = await transferService.rejectTransfer(
      req.params.id,
      req.user.id
    );
    res.json({ success: true, data: transfer });
  } catch (err) {
    logger.error(`Reject transfer error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const getTransfers = async (req, res) => {
  try {
    const transfers = await transferService.getTransfers();
    res.json({ success: true, data: transfers });
  } catch (err) {
    logger.error(`Get transfers error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getAllPersonnel,
  getPersonnelById,
  createPersonnel,
  updatePersonnel,
  deletePersonnel,
  requestTransfer,
  approveTransfer,
  rejectTransfer,
  getTransfers
};
