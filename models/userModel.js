const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// name, email, photo, password, passwordConform
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    lowercase: true,
    default: 'client',
  },
  password: {
    type: String,
    required: [true, 'please tell us your name'],
    minlength: 8,
  },
  photo: {
    type: String,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm the password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
