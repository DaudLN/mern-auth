import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import status from 'statuses';
import { fromZodError } from 'zod-validation-error';
import userModel from '../models/user-model.js';
import { userCreateSchema } from '../schemas/user-schema.js';
import AppError from '../utils/app-error.js';
import generateAuthToken from '../utils/generateAuthToken.js';

/**
 * @description Authentication class for handling user request
 * @route POST /api/v1/auth/signup
 * @route GET /api/v1/auth/signin
 * @route GET /api/v1/auth/signout
 * @access public || private
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next function
 */

class AuthController {
  signup = expressAsyncHandler(async (req, res, next) => {
    const validated = userCreateSchema.safeParse(req.body);
    if (!validated.success) {
      console.log(fromZodError(validated));
      return next(new AppError(status('Bad Request'), 'Invalid request body'));
    }
    const { name, email, password, passwordConfirm } = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists)
      return next(
        new AppError(status('Bad Request'), 'This email already taken')
      );
    const newUser = await userModel.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    if (newUser) {
      generateAuthToken(res, newUser._id);
      res.status(status('Created')).json({
        status: 'success',
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    }
  });

  signin = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(
        new AppError(status('Bad Request'), 'Please provide email and password')
      );
    const user = await userModel.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(
        new AppError(status('Unauthorized'), 'Invalid email or password')
      );
    }
    generateAuthToken(res, user._id);
    res.status(status('OK')).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  });

  signout = expressAsyncHandler(async (req, res, next) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
    });
    res.status(status('OK')).json({
      status: 'success',
      message: 'You have successfully logged out',
    });
  });

  protect = expressAsyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
      return next(new AppError(401, 'No authentication token provided'));
    }
    const decoded = jwt.decode(token, process.env.MERN_JWT_SECRETE);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return next(new AppError(401, 'Not authorized, invalid token'));
    }
    req.user = user;
    next();
  });
}

export default AuthController;
