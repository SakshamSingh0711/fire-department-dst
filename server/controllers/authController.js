const authService = require('../services/authService');
const { loginValidation, registerValidation } = require('../middleware/validate');
const logger = require('../utils/logger');


const login = async (req, res) => {
  try {
    const { idNumber, password } = req.body;
    console.log(`🔍 Login attempt for ID: ${idNumber}`);
    const { user, token } = await authService.loginUser(idNumber, password);

    logger.info(`User logged in: ${user.idNumber}`);
    res.json({ success: true, user, token });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

// const login = async (req, res) => {
//   try {
//     const { idNumber: id, password } = req.body;
//     const { user, token } = await authService.loginUser(id, password);

//     logger.info(`User logged in: ${user.idNumber}`);
//     res.json({ success: true, user, token });
//   } catch (err) {
//     logger.error(`Login error: ${err.message}`);
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

const register = async (req, res) => {
  try {
    const { user, token } = await authService.registerUser(req.body);

    logger.info(`User registered: ${user.idNumber}`);
    res.status(201).json({ success: true, user, token });
  } catch (err) {
    logger.error(`Registration error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.json({ success: true, user });
  } catch (err) {
    logger.error(`Profile error: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  login,
  register,
  getProfile
};