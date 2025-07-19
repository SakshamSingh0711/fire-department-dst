require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/fire-department-dst',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  fileStatuses: ['Pending', 'Under Review', 'Completed', 'Rejected'],
  urgencyLevels: ['Low', 'Medium', 'High'],
  roles: ['Master', 'Office', 'Branch'],
  defaultBranches: [
    'Estate',
    'Miscellaneous and IT Cell',
    'Public Awareness',
    'Communication',
    'Vehicle Management',
    'NOC',
    'Audit',
    'Disaster Management',
    'Dispatch',
    'Establishment',
    'Training',
    'Fire Incident Report',
    'Provisioning',
    'Legal'
  ]
};