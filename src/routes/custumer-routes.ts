import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getCustumerHandler from '../feature/custumer/get-custumer-handler';

const customerRouter = Router();

customerRouter.get('/',  createRoute(getCustumerHandler));
customerRouter.get('/:id', createRoute(getCustumerHandler));

export default customerRouter;
