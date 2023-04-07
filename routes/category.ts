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

categoryRouter.get('/:category/', category_detail);

categoryRouter.get('/:category/create', category_create_get);

categoryRouter.post('/:category/create', category_create_post);

categoryRouter.get('/:category/update', category_update_get);

categoryRouter.post('/:category/update', category_update_post);

categoryRouter.get('/:category/delete', category_delete_get);

categoryRouter.post('/:category/delete', category_delete_post);

export default categoryRouter;
