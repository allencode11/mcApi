// dependencies
const jwt = require('jsonwebtoken');

// create an container
const authUtils = () => {};

// function for verifying if the user use a valid token
// eslint-disable-next-line consistent-return
authUtils.isAuthenticated = function (req, res, next) {
  console.log(req);
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    console.log(token);
    if (token === 'undefined') {
      return res.status(400).json({
        status: 'error',
        message: 'you do not have the token',
      });
    }
    if (token.includes('Bearer')) {
      const jwtToken = token.split(' ')[1];

      // eslint-disable-next-line consistent-return
      jwt.verify(jwtToken, process.env.TOKEN_KEY, (err, parsedToken) => {
        console.log(parsedToken);
        if (Date.now() >= parsedToken.exp * 1000) {
          return res.status(400).json({ message: 'token has expired' });
        }
        req.role = parsedToken.role;
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

authUtils.isVendor = function (req, res, next) {
  if (req.role === 'vendor') {
    return next();
  }
  return res.status(403).json('not a vendor');
};

authUtils.isAdmin = function (req, res, next) {
  if (req.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'not an admin' });
};

authUtils.isClient = function (req, res, next) {
  if (req.role === 'client') {
    return next();
  }
  return res.status(403).json('not an client');
};

authUtils.isNotClient = function (req, res, next) {
  if (req.role === 'client') {
    return res.send(403);
  }
  return next();
};

// export the module
module.exports = authUtils;
