// dependencies
const express = require('express');
const userController = require('../controlers/userController');
const authController = require('../controlers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/logout', authController.logout);

// get an user and create a new one
router.route('/').get(userController.getAllUsers).post(userController.createUser);

// update, delete, patch an user
router.route('/:id').delete(userController.deleteUser).patch(userController.updateUser).get(userController.getUser);

module.exports = router;
