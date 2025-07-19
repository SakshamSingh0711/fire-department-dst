const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error');
const config = require('./config/config');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/authRoutes');
const branchRoutes = require('./routes/branchRoutes');
const fileRoutes = require('./routes/fileRoutes');
const personnelRoutes = require('./routes/personnelRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;