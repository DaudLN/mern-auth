import status from 'statuses';
import { userUpdateSchema } from '../schemas/user-schema.js';
import userModel from '../models/user-model.js';
import expressAsyncHandler from 'express-async-handler';
import AppError from '../utils/app-error.js';

/**
 * @description GET user detail endpoint
 * @route GET /api/v1/users/me
 * @access private
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next function
 */

const getMe = (req, res, next) => {
  const { _id, name, email } = req.user;
  res.status(status('OK')).json({ _id, name, email });
};

/**
 * @description UPDATE User  endpoint
 * @route PUT /api/v1/users/me
 * @access private
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next function
 */

const updateMe = expressAsyncHandler(async (req, res, next) => {
  const validated = userUpdateSchema.safeParse(req.body);
  if (!validated.success)
    return next(new AppError(status('Bad Request'), 'Invalid request body'));
  const { name, email } = req.body;

  const updatedUser = await userModel
    .findByIdAndUpdate(
      req.user.id,
      { name, email },
      {
        new: true,
        runValidators: true,
      }
    )
    .select(['-__v']);
  res.status(status('OK')).json({
    message: 'success',
    data: updatedUser,
  });
});
/**
 * @description Delete user account endpoint
 * @route DELETE /api/v1/users/me
 * @access private
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next function
 */

const deleteMe = (req, res, next) => {
  res.status(status('OK')).json({
    message: 'Ok',
  });
};

export { getMe, updateMe, deleteMe };
