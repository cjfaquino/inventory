import async from 'async';
import Category from '../models/Category';
import { RequestHandler } from 'express';

// display all categories
export const index: RequestHandler = (req, res) => {
  res.render('index', {
    title: 'Store',
  });
};

// display detail GET route for category
export const category_detail: RequestHandler = (req, res) => {
  res.send('category_detail GET');
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
