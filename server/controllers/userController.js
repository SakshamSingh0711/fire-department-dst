const User = require('../models/User');

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Login successful, return user info (no token)
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, branch, idNumber } = req.body;
    const roleToSave = role || 'Branch';

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const newUser = new User({
      name,
      email,
      password,
      role: roleToSave,
      idNumber,
      ...(branch && { branch }),
    });
    
    await newUser.save();
    res.status(201).json(newUser);

  } catch (err) {
    console.error('--- CREATE USER CRASH ---', err); // 👈 ADD THIS LINE
    res.status(500).json({ error: `Failed to create user: ${err.message}` });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Exclude password from being updated this way
    const { password, ...updateData } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User permanently deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};

module.exports = {
  authUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};