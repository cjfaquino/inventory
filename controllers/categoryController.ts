import async from 'async';
import Category from '../models/Category';
import { RequestHandler } from 'express';
import Item from '../models/Item';
import createHttpError from 'http-errors';
import currencyFormat from '../utilities/currencyFormat';
import quantityFormat from '../utilities/quantityFormat';
import numberFormat from '../utilities/numberFormat';

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

    res.render('index', { title: 'Store', categories, stats });
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
    res.render('category_detail', { title: category.name, items: list, stats });
  } catch (error) {
    return next(error);
  }
};

// display create category GET route
export const category_create_get: RequestHandler = (req, res) => {
  res.send('category_create_get');
};

// handle category create POST route
export const category_create_post: RequestHandler = (req, res) => {
  res.send('category_create_post');
};

// display update category GET route
export const category_update_get: RequestHandler = (req, res) => {
  res.send('category_update_get');
};

// handle category update POST route
export const category_update_post: RequestHandler = (req, res) => {
  res.send('category_update_post');
};

// display category delete GET route
export const category_delete_get: RequestHandler = (req, res) => {
  res.send('category_delete_get');
};

// handle category delete POST route
export const category_delete_post: RequestHandler = (req, res) => {
  res.send('category_delete_post');
};
