import { Router } from 'express';

import userDetailsHandler from '../feature/user/user-details-handler';
import createRoute from '../middleware/create-route';

const userRoute = Router();

userRoute.get('/',  createRoute(userDetailsHandler));

userRoute.get('/:id', createRoute(userDetailsHandler));

export default userRoute;
