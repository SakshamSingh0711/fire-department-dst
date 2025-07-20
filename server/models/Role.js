import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [String] // e.g. ['manage_users', 'add_file']
});

export default mongoose.model('Role', roleSchema);