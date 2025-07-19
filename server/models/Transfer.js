const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  personnel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Personnel',
    required: true
  },
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
  reason: {
    type: String,
    required: true,
    trim: true
  },
  effectiveDate: {
    type: Date,
    required: true
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;