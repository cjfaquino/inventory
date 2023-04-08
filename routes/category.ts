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

categoryRouter.get('/create', category_create_get);

categoryRouter.post('/create', category_create_post);

categoryRouter.get('/:id/', category_detail);

categoryRouter.get('/:id/update', category_update_get);

categoryRouter.post('/:id/update', category_update_post);

categoryRouter.get('/:id/delete', category_delete_get);

categoryRouter.post('/:id/delete', category_delete_post);

export default categoryRouter;
