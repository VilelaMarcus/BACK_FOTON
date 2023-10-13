import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getDashboadInfo from '../feature/dashboard/get-dashboad-info';

const dashboadRouter = Router();

dashboadRouter.get('/',  createRoute(getDashboadInfo));

export default dashboadRouter;
