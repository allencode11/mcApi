const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// eslint-disable-next-line consistent-return
module.exports.register = async (req, res) => {
  try {
    // Get user input
    const { name, email, password, role, photo, passwordConfirm } = req.body;

    // Validate user input
    if (!(email && password && passwordConfirm && name)) {
      return res.status(400).send('All input is required');
    }

    if (password !== passwordConfirm) {
      return res.status(400).send('password does not match');
    }
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      photo,
      role,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      passwordConfirm: encryptedPassword,
    });

    // Create token
    // eslint-disable-next-line no-underscore-dangle,max-len
    const token = await jwt.sign({ user_id: user._id, email: user.email, role: user.role }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });

    // return new user
    return res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.signin = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    console.log(user, password);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email, role: user.role }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      });

      // save user token
      user.token = token;

      // user
      res.status(200).json({
        user,
        token,
      });
    } else {
      res.status(400).send('Invalid Credentials');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.logout = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
};
