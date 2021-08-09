const mongoose = require('mongoose');

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
