import express from 'express';
import {
  item_detail,
  item_create_get,
  item_create_post,
  item_update_get,
  item_update_post,
  item_delete_get,
  item_delete_post,
} from '../controllers/itemController';
const itemRouter = express.Router();

itemRouter.get('/:id/', item_detail);

itemRouter.get('/:id/create', item_create_get);

itemRouter.post('/:id/create', item_create_post);

itemRouter.get('/:id/update', item_update_get);

itemRouter.post('/:id/update', item_update_post);

itemRouter.get('/:id/delete', item_delete_get);

itemRouter.post('/:id/delete', item_delete_post);

export default itemRouter;
