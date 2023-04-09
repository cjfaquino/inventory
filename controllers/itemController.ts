import async from 'async';
import Item from '../models/Item';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Category from '../models/Category';
import { ValidationChain, body, validationResult } from 'express-validator';

// display all items
export const item_list: RequestHandler = (req, res) => {
  res.send('index GET');
};

// display detail GET route for item
export const item_detail: RequestHandler = async (req, res, next) => {
  // get item from id parameter
  const found = await Item.findOne({ _id: req.params.id });
  if (found === null) {
    // no results
    const err = createHttpError(404, 'Item not found');
    return next(err);
  }

  // success, so render
  res.render('item_detail', { title: found.name, item: found });
};

// display create item GET route
export const item_create_get: RequestHandler = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.render('item_form', { title: 'Create Item', categories });
  } catch (error) {
    return next(error);
  }
};

// handle item create POST route
export const item_create_post: [
  ValidationChain,
  ValidationChain,
  ValidationChain,
  ValidationChain,
  ValidationChain,
  RequestHandler
] = [
  // validate & sanitize fields
  body('name', 'Name is required.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description is required.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('stock')
    .isLength({ min: 1 })
    .withMessage('Quantity is required.')
    .isNumeric()
    .withMessage('Quantity be a number.')
    .escape(),
  body('price')
    .isLength({ min: 1 })
    .withMessage('Price is required.')
    .isNumeric()
    .withMessage('Price be a number.')
    .escape(),
  body('category.*').escape(),

  // process request after validation & sanitization
  async (req, res, next) => {
    // extract the validation errors from request
    const errors = validationResult(req);

    const categories = await Category.find().sort({ name: 1 });

    // create a Item object with escaped & trimmed data
    const item = new Item(req.body);

    if (!errors.isEmpty()) {
      // there are errors, render form again with sanitized values/ error messages
      res.render('item_form', {
        title: 'Create Item',
        categories,
        item,
        errors: errors.array(),
      });
      return;
    } else {
      // data from form is valid
      // check if item already exists
      const found = await Item.findOne({ name: req.body.name }).populate(
        'category'
      );
      if (found) {
        // item exists, redirect to its detail page
        res.redirect(found.url);
      } else {
        item
          .save()
          .then((saved) => {
            // successful save - redirect to item detail
            res.redirect(saved.url);
          })
          .catch((err) => next(err));
      }
    }
  },
];

// display update item GET route
export const item_update_get: RequestHandler = async (req, res, next) => {
  try {
    const categoriesPromise = Category.find().sort({ name: 1 });
    const itemPromise = Item.findById(req.params.id);

    const [categories, item] = await Promise.all([
      categoriesPromise,
      itemPromise,
    ]);

    if (item === null) {
      // no results
      res.redirect('/');
    }

    // success, so render
    res.render('item_form', { title: 'Update Item', categories, item });
  } catch (error) {}
};

// handle item update POST route
export const item_update_post: [
  ValidationChain,
  ValidationChain,
  ValidationChain,
  ValidationChain,
  ValidationChain,
  RequestHandler
] = [
  // validate & sanitize fields
  body('name', 'Name is required.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description is required.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('stock')
    .isLength({ min: 1 })
    .withMessage('Quantity is required.')
    .isNumeric()
    .withMessage('Quantity be a number.')
    .escape(),
  body('price')
    .isLength({ min: 1 })
    .withMessage('Price is required.')
    .isNumeric()
    .withMessage('Price be a number.')
    .escape(),
  body('category.*').escape(),

  // process request after validation & sanitization
  async (req, res, next) => {
    try {
      const categories = await Category.find().sort({ name: 1 });

      // create Item object with sanitized data & old id
      const item = new Item({ ...req.body, _id: req.params.id });

      // extract validation errors from request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // there are errors, render form again with sanitized values/ error messages
        res.render('item_form', {
          title: 'Update Item',
          categories,
          item,
          errors: errors.array(),
        });
        return;
      }
      // data from form is valid
      // check if item already exists
      const found = await Item.findOne({ name: req.body.name });
      if (found) {
        // exists - redirect
        res.redirect(found.url);
      } else {
        // success - update
        const theItem = await Item.findByIdAndUpdate(req.params.id, item, {});
        res.redirect(theItem!.url);
      }
    } catch (error) {
      next(error);
    }
  },
];

// display item delete GET route
export const item_delete_get: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item === null) {
      // no results
      res.redirect(`/`);
    }

    // success, so render
    res.render('item_delete', { title: 'Delete Item', item });
  } catch (error) {
    next(error);
  }
};

// handle item delete POST route
export const item_delete_post: RequestHandler = async (req, res, next) => {
  try {
    const item = Item.findById(req.body.id);

    if (req.params.id !== req.body.id)
      // mismatched data - re-render page
      return res.render('item_delete', { title: 'Delete Item', item });

    // delete item object
    await Item.findByIdAndRemove(req.body.id);

    // success - redirect
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};
