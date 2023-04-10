import async from 'async';
import Category from '../models/Category';
import { RequestHandler } from 'express';
import Item from '../models/Item';
import createHttpError from 'http-errors';
import currencyFormat from '../utilities/currencyFormat';
import quantityFormat from '../utilities/quantityFormat';
import numberFormat from '../utilities/numberFormat';
import { ValidationChain, body, validationResult } from 'express-validator';
import { Query } from 'mongoose';

// display all categories
export const index: RequestHandler = async (req, res, next) => {
  try {
    // get all categories
    const categoryPromise = Category.find().sort({ name: 1 });

    // get all items
    const itemPromise = Item.find();

    const [categories, items] = await Promise.all([
      categoryPromise,
      itemPromise,
    ]);

    const totalQty = quantityFormat(items);
    const totalVal = currencyFormat(items, true);

    const stats = {
      categories: {
        name: 'Categories',
        number: numberFormat(categories.length),
      },
      items: { name: 'Items', number: numberFormat(items.length) },
      totalQty: { name: 'Total Quantity', number: totalQty },
      totalVal: { name: 'Total Value', number: totalVal },
    };

    res.render('index', { title: 'Inventory', categories, stats });
  } catch (error) {
    return next(error);
  }
};

// display detail GET route for category
export const category_detail: RequestHandler = async (req, res, next) => {
  try {
    // get category object
    const categoryPromise = Category.findById(req.params.id);

    // get all items with category
    const listPromise = Item.find({ category: req.params.id });

    const [category, list] = await Promise.all([categoryPromise, listPromise]);

    if (category === null) {
      // no results
      const err = createHttpError(404, 'Category not found');
      return next(err);
    }

    const totalQty = quantityFormat(list);
    const totalVal = currencyFormat(list, true);

    const stats = {
      items: { name: 'Items', number: numberFormat(list.length) },
      totalQty: { name: 'Total Quantity', number: totalQty },
      totalVal: { name: 'Total Value', number: totalVal },
    };

    // success, so render
    res.render('category_detail', {
      title: category.name,
      category,
      items: list,
      stats,
    });
  } catch (error) {
    return next(error);
  }
};

// display create category GET route
export const category_create_get: RequestHandler = (req, res, next) => {
  res.render('category_form', { title: 'Create Category' });
};

// handle category create POST route
export const category_create_post: [
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

  // process request after validation & sanitization
  async (req, res, next) => {
    // extract the validation errors from request
    const errors = validationResult(req);

    // create Category object with request
    const category = new Category(req.body);

    if (!errors.isEmpty()) {
      // there are errors, render form again with sanitized values/ error messages
      res.render('category_form', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
      return;
    } else {
      // data from form is valid
      // check if category already exists
      const found = await Category.findOne({ name: req.body.name });
      if (found) {
        // genre exists, redirect to its detail page
        res.redirect(found.url);
      } else {
        category
          .save()
          .then((saved) => {
            res.redirect(saved.url);
          })
          .catch((err) => next(err));
      }
    }
  },
];

// display update category GET route
export const category_update_get: RequestHandler = async (req, res, next) => {
  try {
    // get category obj
    const category = await Category.findById(req.params.id);

    if (category === null) {
      // no results
      res.redirect('/');
    }

    // success, so render
    res.render('category_form', {
      title: 'Update Category',
      category,
    });
  } catch (error) {
    next(error);
  }
};

// handle category update POST route
export const category_update_post: [
  ValidationChain,
  ValidationChain,
  RequestHandler
] = [
  // validate & sanitize fields
  body('name', 'Name is required.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // process request after validation & sanitization
  async (req, res, next) => {
    try {
      // create Category object with escaped & trimmed data
      const category = new Category({ ...req.body, _id: req.params.id });

      // extract validation errors from request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // there are errors, render form again with sanitized values/ error messages
        res.render('category_form', {
          title: 'Update Category',
          category,
          errors: errors.array(),
        });
        return;
      }
      // data from form is valid
      // check if category already exists
      const found = await Category.findOne({ name: req.body.name });
      if (found) {
        // exists - redirect to category page
        res.redirect(found.url);
      } else {
        // success
        const theCategory = await Category.findByIdAndUpdate(
          req.params.id,
          category,
          {}
        );
        res.redirect(theCategory!.url);
      }
    } catch (error) {
      next(error);
    }
  },
];

// display category delete GET route
export const category_delete_get: RequestHandler = async (req, res, next) => {
  try {
    const categoryPromise = Category.findById(req.params.id);
    const itemsPromise = Item.find({ category: req.params.id });
    const [category, items] = await Promise.all([
      categoryPromise,
      itemsPromise,
    ]);

    if (category === null) {
      // no results
      res.redirect('/');
    }

    // success, so render
    res.render('category_delete', {
      title: 'Delete Category',
      category,
      items,
    });
  } catch (error) {
    next(error);
  }
};

// handle category delete POST route
export const category_delete_post: RequestHandler = async (req, res, next) => {
  try {
    const categoryPromise = Category.findById(req.body.id);
    const itemsPromise = Item.find({ category: req.body.id });

    const [category, items] = await Promise.all([
      categoryPromise,
      itemsPromise,
    ]);

    if (req.body.id !== req.params.id || req.body.name !== category!.name)
      // mismatched data
      return res.render('category_delete', {
        title: 'Delete Category',
        category,
        items,
      });

    const promiseArr: Promise<any>[] = [];

    // delete category object & related items
    items.forEach((item) => {
      promiseArr.push(Item.findByIdAndRemove(item._id));
    });
    const removePromise = Category.findByIdAndRemove(req.body.id);
    await Promise.all([...promiseArr, removePromise]);

    // success - redirect to home
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};
