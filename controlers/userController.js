// dependencies
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * @api {get} /users Request User information
 * @apiName GetAllUsers
 * @apiGroup Users
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "success",
    "results": 2,
    "data": {
        "items": [
            {
                "_id": "6110ebbeb030da6d0cdd9b1a",
                "title": "Item number ten",
                "slug": "slug number ten",
                "price": 1000,
                "description": "description for the tenth item",
                "__v": 0
            },
            {
                "_id": "61110e90fab753848776b398",
                "title": "Item number ten12",
                "slug": "slug number ten12",
                "price": 2000,
                "description": "description for the tenth12 item",
                "__v": 0
            }
        ]
    }
}
 *
 * @apiError isEmpty The collection of the Users is empty.
 * @apiError AccessDenied Users does not have the permissions for this route.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 AccessDenied
 *     {
 *       "message": "access denied",
 *     }
 */

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  if (users) {
    return res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  }
  return res.status(400).json({ message: 'collection is empty' });
};

/**
 * @api {get} /users/:id Request the information about specific user
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} name name of the User.
 * @apiSuccess {String} email  email of the User.
 * @apiSuccess {String} password  password of the User.
 * @apiSuccess {String} role  role of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "success",
    "data": {
        {
            "_id": "6110ebbeb030da6d0cdd9b1a",
            "title": "Item number ten",
            "slug": "slug number ten",
            "price": 1000,
            "description": "description for the tenth item",
            "__v": 0
        }
    }
}
 *
 * @apiError notFound In the collection does not exist an user with this id.
 * @apiError AccessDenied Users does not have the permissions for this route.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 AccessDenied
 *     {
 *       "message": "access denied",
 *     }
 */

module.exports.getUser = async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne({ _id: req.params.id });

  return res.status(200).json({
    status: 'success',
    data: { user },
  });
};

/**
 * @api {delete} /users/:id Delete an account
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 * *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "success",
    "message": "deleted",
    }
}
 *
 * @apiError notFound The collection of the Users does not have a record with this idy.
 * @apiError AccessDenied Users does not have the permissions for this route.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 AccessDenied
 *     {
 *       "message": "access denied",
 *     }
 */

module.exports.deleteUser = async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne({ _id: req.body.id });

  if (user) {
    if (req.role === 'admin' || req.params.id === req.body.id) {
      await User.deleteOne({ _id: req.body.id });
      return res.status(200).json({ status: 'success', message: 'deleted' });
    }

    return res.status(403).json({
      message: 'access denied',
    });
  }
  return res.status(403).json({
    message: 'user could not be found',
  });
};

/**
 * @api {post} /users/:id Reset user password
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiParam {String} email Email of the account that you want to change password.
 * @apiParam {String} password new password.
 * @apiParam {String} passwordConfirm Confirm the password entered earlier.
 *
 * @apiSuccess {String} name name of the User.
 * @apiSuccess {String} email  email of the User.
 * @apiSuccess {String} password  password of the User.
 * @apiSuccess {String} role  role of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "success",
    "message": "updated",
    }
}
 *
 * @apiError notFound there are no records with this id.
 * @apiError AccessDenied Users does not have the permissions for this route.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "access denied",
 *     }
 */

module.exports.resetPass = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: 'this email is not valid' });
  }

  // eslint-disable-next-line no-underscore-dangle
  if (req.role === 'admin' || user._id == req.params.id) {
    if (req.body.password === req.body.passwordConfirm) {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = encryptedPassword;

      User.updateOne(
        { email: req.body.email },
        {
          $set: { password: encryptedPassword, passwordConfirm: encryptedPassword },
          $currentDate: { lastModified: true },
        },
      );

      // eslint-disable-next-line no-underscore-dangle,max-len
      const token = await jwt.sign({ user_id: user._id, email: user.email, role: user.role }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      });

      return res.status(201).json({ user, token });
    }
    return res.status(400).json({ message: 'passwords does not match' });
  }
  return res.status(403).json({ message: 'access denied' });
};
