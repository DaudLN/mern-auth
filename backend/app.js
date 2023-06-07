import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import status from 'statuses';
import errorMiddleware from './middlewares/error-middleware.js';
import userRouter from './routers/user-router.js';
import AppError from './utils/app-error.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(status('Not Found'), `Can't find ${req.url} on this server`)
  );
});
app.use(errorMiddleware);

export default app;
