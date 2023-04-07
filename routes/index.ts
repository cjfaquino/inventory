import express from 'express';
import { index } from '../controllers/categoryController';
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', index);

export default indexRouter;
