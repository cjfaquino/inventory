import express from 'express';
import {
  category_detail,
  category_create_get,
  category_create_post,
  category_update_get,
  category_update_post,
  category_delete_get,
  category_delete_post,
} from '../controllers/categoryController';
const categoryRouter = express.Router();

categoryRouter.get('/', category_detail);

categoryRouter.get('/create', category_create_get);

categoryRouter.post('/create', category_create_post);

categoryRouter.get('/update', category_update_get);

categoryRouter.post('/update', category_update_post);

categoryRouter.get('/delete', category_delete_get);

categoryRouter.post('/delete', category_delete_post);

export default categoryRouter;
