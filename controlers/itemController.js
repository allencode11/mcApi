const Item = require('../models/itemModel');

module.exports.createItem = async (req, res) => {
  const itemObj = req.body;

  const item = new Item({
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
  await Item.deleteOne({ _id: req.params.id });

  res.status(200).json({
    status: 'success',
    message: 'deleted',
  });
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
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        slug: req.body.slug,
        price: req.body.price,
        description: req.body.description,
      },
    },
  );

  res.status(200).json({
    status: 'success',
    results: item.length,
    data: { item },
  });
};
