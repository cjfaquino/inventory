import createError, { HttpError } from 'http-errors';
import express, { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import createHttpError from 'http-errors';

// setup env variables
dotenv.config();

import indexRouter from './routes';
import categoryRouter from './routes/category';
import itemRouter from './routes/item';

const app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

app.use('/', indexRouter);
app.use('/product/', itemRouter);
app.use('/:category', categoryRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
};
app.use(errorHandler);

module.exports = app;

// setup mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URL;

const main = async () => {
  if (!mongoDB) {
    throw createHttpError(404, 'MongDB not found');
  }
  console.time('MongoDB connected');
  await mongoose.connect(mongoDB);
  console.timeEnd('MongoDB connected');
};
main().catch((err) => console.log(err));
