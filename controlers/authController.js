// dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

/**
 * @api {post} /users/register Register a new user
 * @apiName register
 * @apiGroup Users
 *
 * @apiSuccess {String} name name of the User.
 * @apiSuccess {String} email  email of the User.
 * @apiSuccess {String} password  password of the User.
 * @apiSuccess {String} role  role of the User.
 * @apiSuccess {String} token  token for new User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "success",
    "message": "created",
    }
 *
 * @apiError AccessDenied Users does not have the permissions for this route.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 AccessDenied
 *     {
            "message": "not an admin"
      }
 */

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

/**
 * @api {post} /users/login Authenticate an user
 * @apiName signin
 * @apiGroup Users
 *
 * @apiSuccess {String} name name of the User.
 * @apiSuccess {String} email  email of the User.
 * @apiSuccess {String} password  password of the User.
 * @apiSuccess {String} role  role of the User.
 * @apiSuccess {String} token  token for new User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "user": {
        "_id": "61110f70c0fd768585a3b2e9",
        "name": "vendor",
        "photo": "adds",
        "role": "vendor",
        "email": "alina.enache1@gmail.com",
        "password": "$2a$10$FMmhUf1lpQ7fREORyl/BueBmSdMR02RUpoMi76FoSvGaw5qc6b/CO",
        "passwordConfirm": "$2a$10$FMmhUf1lpQ7fREORyl/BueBmSdMR02RUpoMi76FoSvGaw5qc6b/CO",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjExMTBmNzBjMGZkNzY4NTg1YTNiMmU5IiwiZW1haWwiOiJhbGluYS5lbmFjaGUxQGdtYWlsLmNvbSIsInJvbGUiOiJ2ZW5kb3IiLCJpYXQiOjE2Mjg1MDg0MTAsImV4cCI6MTYyODUxNTYxMH0.pLqw4LB4VGQsCEI45vIdk77QLf87cQMIdibdml4vB2o"
}
 *
 * @apiError notFound Could not find a user with this credentials.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Not Found
 *     {
            "message": "not found"
      }
 */
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

/**
 * @api {get} /users/logout Logout an user
 * @apiName logout
 * @apiGroup Users
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "message": "Successfully lodged out",
    }
 *
 * @apiError couldNotDestroyToken Could not destroy jwt token.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 error
 *     {
            "message": "Could not destroy jwt token",
      }
 */

module.exports.logout = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
};
