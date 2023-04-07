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

itemRouter.get('/', item_detail);

itemRouter.get('/create', item_create_get);

itemRouter.post('/create', item_create_post);

itemRouter.get('/update', item_update_get);

itemRouter.post('/update', item_update_post);

itemRouter.get('/delete', item_delete_get);

itemRouter.post('/delete', item_delete_post);

export default itemRouter;
