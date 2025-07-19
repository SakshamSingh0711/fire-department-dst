const mongoose = require('mongoose');
const config = require('./config/config');
const User = require('./models/User');
const Branch = require('./models/Branch');
const logger = require('./utils/logger');

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    logger.info('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Branch.deleteMany({});

    // Create default branches
    const branches = await Branch.insertMany(
      config.defaultBranches.map((name, index) => ({
        name,
        code: `BR-${index + 1}`,
        phone: `+123456789${index}`,
        email: `${name.toLowerCase().replace(/\s+/g, '-')}@firedept.gov`,
        isActive: true
      }))
    );

    // Create admin user
    const adminUser = new User({
      idNumber: 'ADMIN001',
      name: 'Admin User',
      email: 'admin@firedept.gov',
      password: 'admin123',
      role: 'Master',
      branch: branches[0]._id
    });

    await adminUser.save();

    logger.info('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    logger.error(`Database seeding error: ${err.message}`);
    process.exit(1);
  }
};

seedDatabase();