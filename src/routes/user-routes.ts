import { Router } from 'express';

import createRoute from '../middleware/create-route';
import userDetailsHandler from '../feature/user/user-details-handler';

const userRoute = Router();

userRoute.get('/',  createRoute(userDetailsHandler));
userRoute.get('/:id', createRoute(userDetailsHandler));

export default userRoute;
