import { Router } from 'express';
import { getMe, updateMe, deleteMe } from '../controllers/user-controller.js';
import AuthController from '../controllers/auth-controller.js';

const auth = new AuthController();

const userRouter = Router();
userRouter.post('/signup', auth.signup);
userRouter.post('/signin', auth.signin);
userRouter.post('/signout', auth.signout);
userRouter.use(auth.protect);
userRouter.route('/me').get(getMe).put(updateMe).delete(deleteMe);

export default userRouter;
