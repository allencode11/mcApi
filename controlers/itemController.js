// dependencies
const Item = require('../models/itemModel');

/**
 * @api {post} /items create a new item
 * @apiName createItem
 * @apiGroup Item
 *
 * @apiSuccess {String} title Title of the User.
 * @apiSuccess {String} slug  Slug of the User.
 * @apiSuccess {Number} price  Price of the User.
 * @apiSuccess {String} description  Description of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "success",
    "message": "Created"
    }
 *
 * @apiError AccessDenied User does not have the permission for adding new items
 * @apiError alreadyExists An item with this parameters already exists in the database
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 accessDenied
 *     {
          "message": "access denied",
      }
 */
module.exports.createItem = async (req, res) => {
  const itemObj = req.body;

  const item = await Item.findOne({ title: itemObj.title });

  if (item) {
    return res.status(400).json({ message: 'item with this title already exists' });
  }
  item.owner = req.email;
  item.title = itemObj.title;
  item.slug = itemObj.slug;
  item.price = itemObj.price;
  item.description = itemObj.description;

  await item.save((err) => {
    if (err) {
      return res.status(400).json({ message: 'error while saving' });
    }
  });

  res.status(200).json({ status: 'success', message: 'Created' });
};

/**
 * @api {delete} /items/:id Remove an item from database.
 * @apiName deleteItem
 * @apiGroup Item
 *
 * @apiParam {Number} id items unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "success",
    "message": "deleted"
    }
 *
 * @apiError AccessDenied User does not have the permission for adding new items
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 accessDenied
 *     {
          "message": "access denied",
      }
 */
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
};

/**
   * @api {get} /items requesting all items from database.
   * @apiName getAllItems
   * @apiGroup Item
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *  {
    "status": "success",
    "results": 2,
    "data": {
        "items": [
            {
                "_id": "6110ebbeb030da6d0cdd9b1a",
                "title": "Item number ten",
                "slug": "slug number ten",
                "price": 1000,
                "description": "description for the tenth item",
                "__v": 0
            },
            {
                "_id": "61110e90fab753848776b398",
                "title": "Item number ten12",
                "slug": "slug number ten12",
                "price": 2000,
                "description": "description for the tenth12 item",
                "__v": 0
            }
        ]
    }
}
   *
   * @apiError isEmpty there are no records in the database
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 isEmpty
   *     {
          "message": "collection is empty",
      }
   */

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

/**
   * @api {get} /items/:id requesting an item from database.
   * @apiName getItem
   * @apiGroup Item
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *  {
    "status": "success"
    "data": {
                "_id": "6110ebbeb030da6d0cdd9b1a",
                "title": "Item number ten",
                "slug": "slug number ten",
                "price": 1000,
                "description": "description for the tenth item",
                "__v": 0
            }
    }

   *
   * @apiError notfound There are no records with this fields in the database
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 notFound
   *     {
          "message": "No such item",
      }
   */
module.exports.getItem = async (req, res) => {
  // eslint-disable-next-line no-shadow
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

/**
 * @api {patch} /items/:id update an item from database.
 * @apiName updateItem
 * @apiGroup Item
 *
 * @apiParam {Number} id Item unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
      "status": "success",
      "message": "updated",
    }
 *
 * @apiError notfound There are no records with this fields in the database
 * @apiError accessDenied User does not have the permission for this action
 * @apiError couldNotSave Item could not be saved in the database
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 notFound
 *     {
          "message": "No such item",
      }
 */
module.exports.updateItem = async (req, res) => {
  const itemToUpdate = Item.findOne({ _id: req.params.id });

  if (itemToUpdate.owner === req.user_id) {
    itemToUpdate.title = req.title;
    itemToUpdate.slug = req.slug;
    itemToUpdate.price = req.price;
    itemToUpdate.description = req.description;

    await itemToUpdate.save((err) => {
      if (err) {
        console.error(err);
        console.log('error while updating');
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
