const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const loginUser = async (id, password) => {
  // Find user by ID number
  const user = await User.findOne({ idNumber: id, isActive: true });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare passwords
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });

  return { user, token };
};

const registerUser = async (userData) => {
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [
      { idNumber: userData.idNumber },
      { email: userData.email }
    ]
  });

  if (existingUser) {
    throw new Error('User already exists with this ID or email');
  }

  // Create new user
  const user = new User(userData);
  await user.save();

  // Generate token
  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });

  return { user, token };
};

const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = {
  loginUser,
  registerUser,
  getProfile
};