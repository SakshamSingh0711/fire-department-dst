const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');



// const bcrypt = require('bcrypt');



const loginUser = async (id, password) => {
  console.log('🔍 Login attempt for ID:', id); // DEBUG

  // Try finding the user
  const user = await User.findOne({ idNumber: id, isActive: true }).select('+password');

  if (!user) {
    console.log('❌ User not found in DB'); // DEBUG
    throw new Error('Invalid credentials (user not found)');
  }

  console.log('✅ User found:', user.idNumber); // DEBUG

  // Compare password
  const isMatch = await user.comparePassword(password);
  console.log('🔐 Password match:', isMatch); // DEBUG

  if (!isMatch) {
    throw new Error('Invalid credentials (wrong password)');
  }

  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });

  return { user, token };
};



// const loginUser = async (id, password) => {
//   // Use 'id' as alias for 'idNumber'
//   const user = await User.findOne({ idNumber: id, isActive: true }).select('+password');
//   console.log("Fetched user:", user);

//   if (!user) {
//     throw new Error('Invalid credentials');
//   }

//   const isMatch = await user.comparePassword(password);

//   if (!isMatch) {
//     throw new Error('Invalid credentials');
//   }

//   user.lastLogin = new Date();
//   await user.save();

//   const token = jwt.sign({ id: user._id }, config.jwtSecret, {
//     expiresIn: config.jwtExpiresIn
//   });

//   return { user, token };
// };

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



// const jwt = require('jsonwebtoken');
// const config = require('../config/config');
// const User = require('../models/User');

// const loginUser = async (id, password) => {
//   // Find user by ID number
//   const user = await User.findOne({ idNumber: id, isActive: true });

//   if (!user) {
//     throw new Error('Invalid credentials');
//   }

//   // Compare passwords
//   const isMatch = await user.comparePassword(password);

//   if (!isMatch) {
//     throw new Error('Invalid credentials');
//   }

//   // Update last login
//   user.lastLogin = new Date();
//   await user.save();

//   // Generate token
//   const token = jwt.sign({ id: user._id }, config.jwtSecret, {
//     expiresIn: config.jwtExpiresIn
//   });

//   return { user, token };
// };

// const registerUser = async (userData) => {
//   // Check if user already exists
//   const existingUser = await User.findOne({
//     $or: [
//       { idNumber: userData.idNumber },
//       { email: userData.email }
//     ]
//   });

//   if (existingUser) {
//     throw new Error('User already exists with this ID or email');
//   }

//   // Create new user
//   const user = new User(userData);
//   await user.save();

//   // Generate token
//   const token = jwt.sign({ id: user._id }, config.jwtSecret, {
//     expiresIn: config.jwtExpiresIn
//   });

//   return { user, token };
// };

// const getProfile = async (userId) => {
//   const user = await User.findById(userId).select('-password');
//   if (!user) {
//     throw new Error('User not found');
//   }
//   return user;
// };

// module.exports = {
//   loginUser,
//   registerUser,
//   getProfile
// };