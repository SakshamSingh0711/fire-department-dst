const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      logger.error(`Error deleting file: ${err.message}`);
    }
  });
};

const generateFileNumber = async (prefix = 'FD') => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  
  return `${prefix}-${year}${month}${day}-${randomNum}`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

module.exports = {
  deleteFile,
  generateFileNumber,
  formatDate
};