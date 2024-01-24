import { Router } from 'express';

import createRoute from '../middleware/create-route';
import loginUser from '../feature/authentication/login-handler';
import registerUser from '../feature/authentication/resgister-handler';

const authRouter = Router();

authRouter.post('/login',  createRoute(loginUser));
authRouter.post('/register',  createRoute(registerUser));

export default authRouter;
