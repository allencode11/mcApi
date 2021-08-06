// Dependencies
const mongoose = require('mongoose');

// creating the schema for item model
const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An item must have a name'],
  },
  slug: {
    type: String,
    required: [true, 'this is an required field'],
  },
  price: {
    type: Number,
    required: [true, 'An item con not have no price! if it is free please fill the blank with 0'],
  },
  description: {
    type: String,
    unique: true,
  },
});

// creating the model
const Item = mongoose.model('Item', itemSchema);

// export the model from module
module.exports = Item;
