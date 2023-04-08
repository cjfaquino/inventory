import async from 'async';
import Item from '../models/Item';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Category from '../models/Category';

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
export const item_create_post: RequestHandler = (req, res) => {
  res.send('item_create_post');
};

// display update item GET route
export const item_update_get: RequestHandler = (req, res) => {
  res.send('item_update_get');
};

// handle item update POST route
export const item_update_post: RequestHandler = (req, res) => {
  res.send('item_update_post');
};

// display item delete GET route
export const item_delete_get: RequestHandler = (req, res) => {
  res.send('item_delete_get');
};

// handle item delete POST route
export const item_delete_post: RequestHandler = (req, res) => {
  res.send('item_delete_post');
};
