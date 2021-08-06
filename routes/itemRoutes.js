// dependencies
const express = require('express');
const itemController = require('../controlers/itemController');

const router = express.Router();

// get an item and create a new one
router.route('/').get(itemController.getAllItems).post(itemController.createItem);

// update, delete, patch an item
router.route('/:id').delete(itemController.deleteItem).patch(itemController.createItem).get(itemController.getItem);

module.exports = router;
