import async from 'async';
import Item from '../models/Item';
import { RequestHandler } from 'express';

// display all items
export const item_list: RequestHandler = (req, res) => {
  res.send('index GET');
};

// display detail GET route for item
export const item_detail: RequestHandler = (req, res) => {
  res.send('item_detail GET');
};

// display create item GET route
export const item_create_get: RequestHandler = (req, res) => {
  res.send('item_create_get');
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
