const Item = require('../models/itemModel');

module.exports.createItem = async (req, res) => {
  const itemObj = req.body;

  const item = new Item({
    owner: req.email,
    title: itemObj.title,
    slug: itemObj.slug,
    price: itemObj.price,
    description: itemObj.description,
  });

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
};

module.exports.deleteItem = async (req, res) => {
  const item = Item.findOne({ _id: req.params.id });

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
};

module.exports.getAllItems = async (req, res) => {
  const items = await Item.find();

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
};

module.exports.getItem = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id });

  console.log(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { item },
  });
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
