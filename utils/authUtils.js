// dependencies
const jwt = require('jsonwebtoken');

// create an container for middlewares
const authUtils = () => {};

// function for verifying if the user use a valid token
// eslint-disable-next-line consistent-return
authUtils.isAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;

    if (token === 'undefined') {
      return res.status(400).json({
        message: 'you do not have the token',
      });
    }
    if (token.includes('Bearer')) {
      const jwtToken = token.split(' ')[1];

      // eslint-disable-next-line consistent-return
      jwt.verify(jwtToken, process.env.TOKEN_KEY, (err, parsedToken) => {
        req.role = parsedToken.role;
        req.email = parsedToken.email;
        req.user_id = parsedToken.id;
        next();
      });
    } else {
      return res.status(403).json({
        status: false,
        message: 'invalid format',
      });
    }
  }
};

authUtils.isVendor = (req, res, next) => {
  if (req.role === 'vendor') {
    return next();
  }

  return res.status(403).json('not a vendor');
};

authUtils.isAdmin = (req, res, next) => {
  if (req.role === 'admin') {
    return next();
  }

  return res.status(403).json({ message: 'not an admin' });
};

authUtils.isClient = (req, res, next) => {
  if (req.role === 'client') {
    return next();
  }

  return res.status(403).json('not an client');
};

authUtils.isNotClient = (req, res, next) => {
  if (req.role === 'client') {
    return res.status(403).json({ message: 'access denied' });
  }

  return next();
};

// export the module
module.exports = authUtils;
