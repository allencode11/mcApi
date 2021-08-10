// dependencies
const mongoose = require('mongoose');

// creating the schema for user model
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'please tell us your name'] },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    lowercase: true,
  },
  role: { type: String, lowercase: true },
  password: {
    type: String,
    required: [true, 'please tell us your name'],
    minlength: 8,
  },
  photo: { type: String },
});

// creating the model
const User = mongoose.model('User', userSchema);

// export the model from module
module.exports = User;
