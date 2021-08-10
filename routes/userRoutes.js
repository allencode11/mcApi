// dependencies
const express = require('express');
const authUtil = require('../utils/authUtils');
const userController = require('../controlers/userController');
const authController = require('../controlers/authController');

// creating the router for users routes
const router = express.Router();

// only admins can creat new accounts
router.post('/register', authUtil.isAuthenticated, authUtil.isAdmin, authController.register);

// everyone can login
router.post('/login', authController.signIn);

/*
 this route is not necessary because the token expires after 2 hours

// only logged users can logout
router.post('/logout', authUtil.isAuthenticated, authController.logout);

 */

// Admin can get an user and create a new one
router.route('/').get(authUtil.isAuthenticated, authUtil.isAdmin, userController.getAllUsers);

// Admin can update, delete and get an user
router
  .route('/:id')
  .get(authUtil.isAuthenticated, authUtil.isAdmin, userController.getUser)
  .delete(authUtil.isAuthenticated, userController.deleteUser)
  .post(authUtil.isAuthenticated, userController.resetPass);

// export the route for module
module.exports = router;
