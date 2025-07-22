const mongoose = require('mongoose');
const config = require('./config/config');
const User = require('./models/User');
const Branch = require('./models/Branch');
const logger = require('./utils/logger');

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    logger.info('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Branch.deleteMany({});
    logger.info('🗑️ Cleared existing User and Branch data');
    await Branch.collection.dropIndex('code_1');

    // Create default branches
    let branches = [];
    try {
      branches = await Branch.insertMany(
        config.defaultBranches.map(name => ({
          name,
          isActive: true
        })),
        { ordered: true }
      );
      logger.info(`✅ Inserted ${branches.length} branches`);
    } catch (branchErr) {
      logger.error(`❌ Failed to insert branches: ${branchErr.message}`);
      return process.exit(1);
    }

    // Create admin user
    try {
      const adminUser = new User({
        idNumber: 'ADMIN001',
        name: 'Admin User',
        email: 'admin@firedept.gov',
        password: 'admin123',
        role: 'Master',
        branch: branches[0]._id
      });

      await adminUser.save();
      logger.info('✅ Admin user created successfully');
    } catch (userErr) {
      logger.error(`❌ Failed to create admin user: ${userErr.message}`);
      return process.exit(1);
    }

    logger.info('🎉 Database seeded successfully');
    process.exit(0);
  } catch (err) {
    logger.error(`❌ Database seeding failed: ${err.message}`);
    process.exit(1);
  }
};

seedDatabase();