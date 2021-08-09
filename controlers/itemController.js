const Item = require('../models/itemModel');

module.exports.createItem = async (req, res) => {
  const itemObj = req.body;

  const item = await Item.findOne({ title: itemObj.title });

  if (item) {
    res.send({
      status: 'error',
      message: 'item with this title already exists',
    });
  } else {
    item.owner = req.email;
    item.title = itemObj.title;
    item.slug = itemObj.slug;
    item.price = itemObj.price;
    item.description = itemObj.description;

    await item.save((err) => {
      if (err) {
        console.error(err);
        console.log('error while saving');
      }
    });

    res.send({
      status: 'success',
      message: 'Created',
    });
  }
};

module.exports.deleteItem = async (req, res) => {
  const item = Item.findOne({ _id: req.params.id });

  if (item) {
    if (item.owner === req.user_id) {
      await Item.deleteOne({ _id: req.params.id });

      res.status(200).json({
        status: 'success',
        message: 'deleted',
      });
    } else {
      res.status(403).json({
        status: 'restricted',
        message: 'you can not delete this item, because you are not its owner',
      });
    }
} else {
  res.status(400).json({
    status: 'error',
    message: 'there are no items with this params',
  });
}

module.exports.getAllItems = async (req, res) => {
  const items = await Item.find();

  if (items) {
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items,
      },
    });
  } else {
    res.status(400).json({
      message: 'collection is empty',
    });
  }
};

module.exports.getItem = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id });

  if (item) {
    res.status(200).json({
      status: 'success',
      data: {
        item,
      },
    });
  } else {
    res.status(400).json({
      message: 'item does not exist',
    });
  }
};

module.exports.updateItem = async (req, res) => {
  const item = Item.findOne({ _id: req.params.id });

  if (item.owner === req.user_id) {
    item.title = req.title;
    item.slug = req.slug;
    item.price = req.price;
    item.description = req.description;

    await item.save((err) => {
      if (err) {
        console.error(err);
        console.log('error while saving');
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'item was saved successfully',
    });
  } else {
    res.status(403).json({
      status: 'restricted',
      message: 'you can not delete this item, because you are not its owner',
    });
  }
};
