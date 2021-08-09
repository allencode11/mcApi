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

module.exports.deleteUser = async (req, res) => {
  console.log(req.body.id);
  await User.deleteOne({ id: req.body.id });

  res.status(200).json({
    status: 'success',
  });
};

module.exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  console.log(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { user },
  });
};

module.exports.updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        photo: req.body.photo,
        role: req.body.role,
        passwordConfirm: req.body.passwordConfirm,
      },
    },
  );

  res.status(200).json({
    status: 'success',
    data: { user },
  });
};
