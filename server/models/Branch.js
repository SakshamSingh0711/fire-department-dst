const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
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