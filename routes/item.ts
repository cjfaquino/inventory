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

itemRouter.get('/:item/', item_detail);

itemRouter.get('/:item/create', item_create_get);

itemRouter.post('/:item/create', item_create_post);

itemRouter.get('/:item/update', item_update_get);

itemRouter.post('/:item/update', item_update_post);

itemRouter.get('/:item/delete', item_delete_get);

itemRouter.post('/:item/delete', item_delete_post);

export default itemRouter;
