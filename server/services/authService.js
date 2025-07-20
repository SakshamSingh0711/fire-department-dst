const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

// 🔐 Login user
const loginUser = async (id, password) => {
  console.log('🔍 Login attempt for ID:', id);

  const user = await User.findOne({ idNumber: id, isActive: true }).select('+password');
  if (!user) {
    console.log('❌ User not found in DB');
    throw new Error('Invalid credentials (user not found)');
  }

  console.log('✅ User found:', user.idNumber);

  const isMatch = await user.comparePassword(password);
  console.log('🔐 Password match:', isMatch);

  if (!isMatch) {
    throw new Error('Invalid credentials (wrong password)');
  }

  user.lastLogin = new Date();
  await user.save();

  // ✅ Include role in the token payload
  const token = jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  return { user, token };
};

// 🆕 Register user
const registerUser = async (userData) => {
  const existingUser = await User.findOne({
    $or: [
      { idNumber: userData.idNumber },
      { email: userData.email }
    ]
  });

  if (existingUser) {
    throw new Error('User already exists with this ID or email');
  }

  const user = new User(userData);
  await user.save();

  // ✅ Include role in token payload
  const token = jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  return { user, token };
};

// 👤 Get user profile
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