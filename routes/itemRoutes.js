// dependencies
const express = require('express');
const itemController = require('../controlers/itemController');
const authUtils = require('../utils/authUtils');

const router = express.Router();

// get an item and create a new one
router
  .route('/')
  .get(authUtils.isAuthenticated, itemController.getAllItems) // clients, vendors, and admins
  .post(authUtils.isAuthenticated, authUtils.isNotClient, itemController.createItem);

// update, delete, patch an item
router
  .route('/:id')
  .delete(authUtils.isAuthenticated, authUtils.isNotClient, itemController.deleteItem)
  .patch(authUtils.isAuthenticated, authUtils.isNotClient, itemController.createItem)
  .get(authUtils.isAuthenticated, itemController.getItem);

module.exports = router;
