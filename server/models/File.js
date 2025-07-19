const mongoose = require('mongoose');
const config = require('../config/config');

const fileMovementSchema = new mongoose.Schema({
  fromBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  toBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  movedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const fileSchema = new mongoose.Schema({
  fileNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  details: {
    type: String,
    required: true,
    trim: true
  },
  receivedFrom: {
    type: String,
    required: true,
    trim: true
  },
  urgency: {
    type: String,
    enum: config.urgencyLevels,
    default: 'Medium'
  },
  status: {
    type: String,
    enum: config.fileStatuses,
    default: 'Pending'
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentHandler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  movementLog: [fileMovementSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const File = mongoose.model('File', fileSchema);

module.exports = File;