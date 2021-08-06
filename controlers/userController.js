const User = require('../models/userModel');

module.exports.createUser = async (req, res) => {
  const userObj = req.body;

  console.log(userObj);

  const user = new User({
    name: userObj.name,
    email: userObj.email,
    password: userObj.password,
    photo: userObj.photo,
    passwordConfirm: userObj.passwordConfirm,
  });

  await user.save((err) => {
    if (err) {
      console.error(err);
      console.log('error while saving');
    }
  });

  res.send({
    status: 'success',
    message: 'Created',
  });
};

module.exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id });

  res.status(200).json({
    status: 'success',
    message: 'deleted',
  });
};

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
        passwordConfirm: req.body.passwordConfirm,
      },
    },
  );

  res.status(200).json({
    status: 'success',
    data: { user },
  });
};
