const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

module.exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  return res.status(200).json({
    status: 'success',
    data: { user },
  });
};

module.exports.deleteUser = async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  if (req.role === 'admin' || req.params._id === req.user_id) {
    await User.deleteOne({ _id: req.body.id });

    return res.status(200).json({
      status: 'success',
    });
  }
  return res.status(403).json({
    message: 'access denied',
  });
};

module.exports.resetPass = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: 'this email is not valid' });
  }

  // eslint-disable-next-line no-underscore-dangle
  if (req.role === 'Admin' || req.user_id === req.params._id) {
    if (req.body.password === req.body.passwordConfirm) {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = encryptedPassword;

      user.save();

      // eslint-disable-next-line no-underscore-dangle,max-len
      const token = await jwt.sign({ user_id: user._id, email: user.email, role: user.role }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      });

      return res.status(201).json({
        user,
        token,
      });
    }
    return res.status(400).json({ message: 'passwords does not match' });
  }
  return res.status(403).json({ message: 'access denied' });
};
