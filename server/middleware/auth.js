const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      console.log('❌ No token found in request headers');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Find user and check if token exists
    const user = await User.findOne({
      _id: decoded.id,
      isActive: true
    }).select('-password');

    if (!user) {
      console.log('❌ User not found or is inactive');
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    req.token = token;
    console.log(`✅ Authenticated user: ${user.name} | Role: ${user.role}`);
    next();
  } catch (err) {
    console.error('❌ Authentication error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role?.toLowerCase();

    const allowedRoles = roles
      .filter(r => typeof r === 'string') // ensure only strings
      .map(r => r.toLowerCase());

    console.log("🔐 Required roles:", allowedRoles);
    console.log("🧠 Current user role:", userRole);

    if (!allowedRoles.includes(userRole)) {
      console.log("❌ Access denied: role not authorized");
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    console.log("✅ Access granted");
    next();
  };
};

module.exports = { auth, authorize };