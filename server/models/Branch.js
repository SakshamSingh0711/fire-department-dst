const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  personnelCount: {
    type: Number,
    default: 0
  },
  activeFiles: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;