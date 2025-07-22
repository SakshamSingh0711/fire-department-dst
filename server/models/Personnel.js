const mongoose = require('mongoose');

const postingHistorySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    trim: true
  },
  isCurrent: {
    type: Boolean,
    default: false
  }
});

const personnelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rank: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number // optional by default
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'] // optional by default
  },
  homeCity: {
    type: String,
    trim: true // optional by default
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  currentBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  },
  postingHistory: [postingHistorySchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add virtual for current posting
personnelSchema.virtual('currentPosting').get(function () {
  return this.postingHistory.find(posting => posting.isCurrent) || null;
});

const Personnel = mongoose.model('Personnel', personnelSchema);

module.exports = Personnel;