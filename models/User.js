const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Ensure role is either 'user' or 'admin'
    default: 'user' // Default to 'user' if no role is provided
  }
});

module.exports = mongoose.model('User', UserSchema);
