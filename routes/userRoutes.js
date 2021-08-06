// dependencies
const express = require('express');
const userController = require('../controlers/userController');
const authController = require('../controlers/authController');

const router = express.Router();

// router.post('/signup', authController.signup);
//
// // get an item and create a new one
// router.route('/users').get(userController.getAllUsers).post(userController.createUser);
//
// // update, delete, patch an item
// router
//   .route('/users/:id')
//   .delete(userController.deleteUser)
//   .patch(userController.updateUser)
//   .get(userController.getUser);

module.exports = router;
